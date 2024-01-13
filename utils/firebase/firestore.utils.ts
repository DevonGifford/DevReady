import {
  Firestore,
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  getDocs,
} from "firebase/firestore";
import { DatabaseSchema } from "@/types/databaseSchema";
import { UserProfile, defaultUserProfile } from "@/types/UserProfile";

import db from "./firebase.config";
import { User } from "firebase/auth";
const firestore: Firestore = db; // 👈 Ensure the db object typing is Firestore

type CollectionName = string;
type DocumentId = string;
type Data = Record<string, any>;

//✅ SYNCHRONIZE LOCAL STORAGE & QUESTION VAULT
export const synchQuestionVault = async () => {
  try {
    const localStorageKey = "ztmready-database";
    const existingData = localStorage.getItem(localStorageKey);
    const currentTimeStamp = new Date().getTime();

    if (!existingData || isDataOld(existingData, currentTimeStamp)) {
      await fetchDataAndStore();
    }
  } catch (error) {
    console.error("✖ Error: Failed to load or sync data.", error);
  }
};

const isDataOld = (existingData: string, currentTimeStamp: number): boolean => {
  try {
    const staleLocalStorage = JSON.parse(existingData);
    const storedTimeStamp = staleLocalStorage.timestamp;
    return currentTimeStamp - storedTimeStamp > 24 * 60 * 60 * 1000;
  } catch (error) {
    console.error("✖ Error: Failed to parse existing data.", error);
    return true; // Treat as old data in case of an error
  }
};

const fetchDataAndStore = async () => {
  try {
    const data = await fetchQuestionVault();
    const dataWithTimestamp = {
      timestamp: new Date().getTime(),
      data: data,
    };
    if (data) {
      localStorage.setItem(
        "ztmready-database",
        JSON.stringify(dataWithTimestamp)
      );
    } else {
      console.error("⚠ Warning: User document does not exist");
    }
  } catch (error) {
    console.error(
      "✖ Error: DatabaseContext failed to load or store data.",
      error
    );
  }
};

const fetchQuestionVault = async (): Promise<DatabaseSchema[] | null> => {
  const collectionRef = collection(db, "questionVault");

  try {
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => doc.data());
    return documents as DatabaseSchema[];
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
};

//✅ GENERAL HELPER FUNCTIONS
export const updateUserImage = async (
  documentId: DocumentId,
  newImageUrl: string
): Promise<boolean> => {
  const collectionName: CollectionName = "users";
  const collectionRef = collection(firestore, collectionName);
  const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

  try {
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);
    if (docSnapshot.exists()) {
      //- Get the existing data
      const existingData = docSnapshot.data();
      //- Update data with new imageURL
      const updatedData = {
        ...existingData,
        account: {
          ...existingData.account,
          userimage: newImageUrl,
        },
      };
      //- Update doc
      await updateDoc(docRef, updatedData);
      return true;
    } else {
      console.error(`✖ Error: Document ${documentId} not found`);
      return false;
    }
  } catch (error: any) {
    console.error("✖ Error updating user image", error);
    return false;
  }
};

export const updateDocument = async (
  collectionName: CollectionName,
  documentId: DocumentId,
  data: Data
) => {
  const collectionRef = collection(firestore, collectionName);
  const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

  try {
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    // - check if user doc exists and update or else create new
    if (docSnapshot.exists()) {
      await updateDoc(docRef, data);
      return true;
    } else {
      console.error(
        `✖ Error:  Document ${documentId} not found in collection ${collectionName}!`
      );
      return false;
    }
  } catch (error: any) {
    // -error case
    console.error(
      `✖ Error:  Error updating/creating document ${documentId} in collection ${collectionName}: `,
      error
    );
    return false;
  }
};

//✅ AUTH HELPER FUNCTIONS
export const updateUserLoginTime = async (documentId: string) => {
  const collectionRef = collection(firestore, "users");
  const docRef: DocumentReference<Data> = doc(collectionRef, documentId);
  try {
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const lastLogin = new Date().toISOString();
      await updateDoc(docRef, { lastLogin });
    }
  } catch (updateError: any) {
    console.error(
      "✖ Error - An error occurred during updating user document:",
      updateError.message
    );
  }
};

export const initializeUserDocument = async (
  documentId: string,
  userData: Partial<UserProfile>
) => {
  const collectionRef = collection(firestore, "users");
  const docRef: DocumentReference<Data> = doc(collectionRef, documentId);
  try {
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    //-Ensure user doc does NOT exist
    if (docSnapshot.exists()) {
      console.log(
        `⚠ Warning -  Document ${documentId} already exists in collection "users"`
      );
    } else {
      //-manipulate the data
      const defaultUserData: Partial<UserProfile> = {
        ...userData,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };
      const mergedUserData = mergeUserDataWithDefaults(defaultUserData);

      // - Create a new document with provided user data
      await setDoc(docRef, mergedUserData);

      // -Update the state with the newly created user data
      // 🎯 to-do-list:  logic will be added in updating user-profile-form update ()
    }
  } catch (error: any) {
    console.error(`✖ Error creating doc ${documentId}`, error);
  }
};

export const mergeUserDataWithDefaults = (
  userData: Partial<UserProfile>
): UserProfile => {
  return {
    ...defaultUserProfile,
    ...userData,
  };
};

//✅ SPECIAL ONE-TIME FUNCTION:
export const seedNewCollection = async (
  collectionName: string,
  data: DocumentData[]
): Promise<boolean> => {
  console.log(
    `🎯 event_log:  🔥utils/firestore/seedNewCollection:  💢 Triggered`
  );
  try {
    const dataCollection = collection(db, collectionName);

    for (const documentData of data) {
      await addDoc(dataCollection, documentData);
    }

    console.log(
      `🎯 event_log:  🔥utils/firestore/seedNewCollection:  ✔ Success:  Added ${data.length} documents to ${collectionName} collection.`
    );
    return true;
  } catch (error) {
    console.error(
      `🎯 event_log:  🔥utils/firestore/seedNewCollection:  ✖ Error adding documents: ${error}`
    );
    return false;
  }
};
