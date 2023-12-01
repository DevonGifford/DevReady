import { UserProfile, defaultUserProfile } from "@/types/UserProfile";
import db from "../firebase/firebaseConfig";
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
} from "firebase/firestore";

type CollectionName = string;
type DocumentId = string;
type Data = Record<string, any>;

// 👇 Ensure the db object typing is Firestore
const firestore: Firestore = db;

// ⌛✅ TEMPORARY FUNCTION: creates/updates a specified document in a specified collection
export const updateDocument = async (
  collectionName: CollectionName,
  documentId: DocumentId,
  data: Data
) => {
  console.log(
    "🎯event_log:  🔥utils/firestore:  Check to see if a user document exitst for the user"
  );
  const collectionRef = collection(firestore, collectionName);
  const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

  try {
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    // - check if user doc exists and update or else create new
    if (docSnapshot.exists()) {
      await updateDoc(docRef, data);
      console.log(
        `🎯event_log:  🔥utils/firestore:  Document ${documentId} updated successfully in collection ${collectionName}!`
      );
    } else {
      await setDoc(docRef, data);
      console.log(
        `🎯event_log:  🔥utils/firestore:  Document ${documentId} created successfully in collection ${collectionName}!`
      );
    }
    return true;
  } catch (error: any) {
    console.error(
      `🎯event_log:  🔥utils/firestore:  Error updating/creating document ${documentId} in collection ${collectionName}: `,
      error
    );
    return false;
  }
};

// ⌛✅ TEMPORARY FUNCTION:  creates a new collection based on passed TypeScript type
export const createCollection = async <T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<boolean> => {
  try {
    const dataCollection = collection(firestore, collectionName);
    await addDoc(dataCollection, data);
    console.log(
      `🎯 event_log:  🔥utils/firestore:  Added ${collectionName} collection with data.`
    );
    return true;
  } catch (error) {
    console.log(
      `🎯 event_log:  🔥utils/firestore:  Error adding document: ${error}.`
    );
    console.error(`Error adding document: ${error}`);
    return false;
  }
};

// ✅ AUTH/REGISTER HELPER FUNCTION : helps create default data in registration process.
export const mergeUserDataWithDefaults = (
  userData: Partial<UserProfile>
): UserProfile => {
  return {
    ...defaultUserProfile,
    ...userData, // Merge provided data with defaults
  };
};

// ✅ AUTH/REGISTER HELPER FUNCTION : creates a new user doc in registration
export const createUserDataProcess = async (
  documentId: string,
  userData: Partial<UserProfile>
) => {
  console.log(
    "🎯 event_log:  🔥utils/firestore/createUserDataProcess Triggered⭐"
  );
  console.log(
    "🎯 event_log:  🔥utils/firestore/createUserDataProcess Document ID:",
    documentId
  );
  console.log(
    "🎯 event_log:  🔥utils/firestore/createUserDataProcess User Data:",
    userData
  );

  try {
    const collectionRef = collection(firestore, "users");
    const docRef: DocumentReference<Data> = doc(collectionRef, documentId);
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    //-Ensure user doc does NOT exist
    if (docSnapshot.exists()) {
      console.log(
        `🎯 event_log:  🔥utils/firestore/createUserDataProcess Document ${documentId} already exists in collection "users"!`
      );
    } else {
      //-manipulate the data
      const defaultUserData: Partial<UserProfile> = {
        ...userData,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      const mergedUserData = mergeUserDataWithDefaults(defaultUserData);
      console.log(
        "🎯 event_log:  🔥utils/firestore/createUserDataProcess Creating new user document with following data: ",
        mergedUserData
      );
      // - Create a new document with provided user data
      await setDoc(docRef, mergedUserData);
      console.log(
        `🎯 event_log:  🔥utils/firestore/createUserDataProcess Document ${documentId} created successfully in collection "users"!`
      );

      // -Update the state with the newly created user data
      // ???
    }
  } catch (error: any) {
    console.error(
      `🎯 event_log:  🔥utils/firestore/createUserDataProcess Error creating document ${documentId} in collection `,
      error
    );
  }
};

// ✅ AUTH/LOGIN HELPER FUNCTION :  updates the login time in the user's document
export const updateUserLoginTime = async (documentId: string) => {
  console.log(
    "🎯 event_log:  🔥utils/firestore/updateUserLoginTime : Triggered ⭐"
  );

  try {
    const lastLogin = new Date().toISOString();
    const collectionRef = collection(firestore, "users");
    const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

    await updateDoc(docRef, { lastLogin });
    console.log(
      `🎯 event_log:  🔥utils/firestore/updateUserLoginTime Updated Document ${documentId} with new login time:  ${lastLogin}!`
    );
    // await updateDocument("users", documentId, { lastLogin });
  } catch (updateError: any) {
    console.error(
      "🎯 event_log:  🔥utils/firestore/updateUserLoginTime Error occurred during lastLogin update:",
      updateError.message
    );
  }
};
