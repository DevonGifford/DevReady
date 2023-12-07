import { UserProfile, defaultUserProfile } from "@/types/UserProfile";
import db from "./firebase.config";
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

/**
 * ✅ HELPER FUNCTION:
 * -UserImage process
 * Updates the user image field in a specified document.
 * @param {string} documentId - The ID of the document to be updated.
 * @param {string} newImageUrl - The URL of the new user image.
 * @returns {Promise<boolean>} - A promise indicating whether the update was successful.
 */
export const updateUserImage = async (
  documentId: DocumentId,
  newImageUrl: string
): Promise<boolean> => {
  console.log("🎯event_log:  🔥utils/firestore/updateUserImage:  💢 Triggered");

  const collectionName: CollectionName = "users";
  const collectionRef = collection(firestore, collectionName);
  const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

  try {
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    //- Check if user doc exists
    if (docSnapshot.exists()) {
      //- Get the existing data
      const existingData = docSnapshot.data();
      console.log(
        "🎯event_log:  🔥utils/firestore/updateUserImage:  THIS IS THE OG DATA FROM DOC",
        existingData
      );

      //- Update data with new imageURL
      const updatedData = {
        ...existingData,
        account: {
          ...existingData.account,
          userimage: newImageUrl,
        },
      };

      console.log(
        "🎯event_log:  🔥utils/firestore/updateUserImage:  THIS IS THE UPDATED DATA TO BE SET IN DOC",
        updatedData
      );

      //- Update doc
      await updateDoc(docRef, updatedData);
      console.log(
        `🎯event_log:  🔥utils/firestore/updateUserImage:  ✔ User image updated successfully for document ${documentId}`
      );
      return true;
    } else {
      //- Document not found
      console.error(
        `🎯event_log:  🔥utils/firestore/updateUserImage:  ❌ Error: Document ${documentId} not found`
      );
      return false;
    }
  } catch (error: any) {
    //- Error case
    console.error(
      `🎯event_log:  🔥utils/firestore/updateUserImage:  ❌ Error updating user image for document ${documentId}:`,
      error
    );
    return false;
  }
};

/**
 * ✅ HELPER FUNCTION:
 * Updates a specified document in a specified collection or creates a new document if not found.
 * @param {string} collectionName - The name of the collection.
 * @param {string} documentId - The ID of the document to be updated.
 * @param {object} data - The data to be updated or created.
 */
export const updateDocument = async (
  collectionName: CollectionName,
  documentId: DocumentId,
  data: Data
) => {
  console.log("🎯event_log:  🔥utils/firestore/updateDocument:  💢 Triggered");
  const collectionRef = collection(firestore, collectionName);
  const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

  try {
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    // - check if user doc exists and update or else create new
    if (docSnapshot.exists()) {
      await updateDoc(docRef, data);
    } else {
      // -notfound case
      console.error(
        `🎯event_log:  🔥utils/firestore/updateDocument:  ❌ Error:  Document ${documentId} not found in collection ${collectionName}!`
      );
      return false;
    }
    // -success case
    console.log(
      `🎯event_log:  🔥utils/firestore/updateDocument:  ✔ Success:  Document ${documentId} updated successfully in collection ${collectionName}!`
    );
    return true;
  } catch (error: any) {
    // -error case
    console.error(
      `🎯event_log:  🔥utils/firestore/updateDocument:  ❌ Error:  Error updating/creating document ${documentId} in collection ${collectionName}: `,
      error
    );
    return false;
  }
};

//
/**
 * ✅ AUTH HELPER FUNCTION:
 * -register process
 * Merges provided user data with default user profile data.
 * @param {Partial<UserProfile>} userData - Partial user data to merge.
 * @returns {UserProfile} - Merged user profile data.
 */
export const mergeUserDataWithDefaults = (
  userData: Partial<UserProfile>
): UserProfile => {
  return {
    ...defaultUserProfile, //-default user
    ...userData, //-provided data with defaults
  };
};

/**
 * ✅ AUTH HELPER FUNCTION:
 * -register process
 * Creates a new user document in the registration process.
 * @param {string} documentId - The ID of the document to be created.
 * @param {Partial<UserProfile>} userData - Partial user data for document creation.
 */
export const createUserDataProcess = async (
  documentId: string,
  userData: Partial<UserProfile>
) => {
  console.log(
    "🎯 event_log:  🔥utils/firestore/createUserDataProcess:  💢 Triggered"
  );

  try {
    const collectionRef = collection(firestore, "users");
    const docRef: DocumentReference<Data> = doc(collectionRef, documentId);
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    //-Ensure user doc does NOT exist
    if (docSnapshot.exists()) {
      console.log(
        `🎯 event_log:  🔥utils/firestore/createUserDataProcess:  ⚠ Warning -  Document ${documentId} already exists in collection "users"`
      );
    } else {
      //-manipulate the data
      const defaultUserData: Partial<UserProfile> = {
        ...userData,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };
      const mergedUserData = mergeUserDataWithDefaults(defaultUserData);
      console.log(
        "🎯 event_log:  🔥utils/firestore/createUserDataProcess:  🖇 Merge complete - creating the following document",
        "Document ID: ",
        documentId,
        "Document Data: ",
        mergedUserData
      );

      // - Create a new document with provided user data
      await setDoc(docRef, mergedUserData);

      // -Update the state with the newly created user data
      // 🎯 to-do-list:  logic will be added in updating user-profile-form update ()

      console.log(
        `🎯 event_log:  🔥utils/firestore/createUserDataProcess:  ✔ Success - Document ${documentId} created successfully in collection "users"!`
      );
    }
  } catch (error: any) {
    console.error(
      `🎯 event_log:  🔥utils/firestore/createUserDataProcess Error creating document ${documentId} in collection `,
      error
    );
  }
};

/**
 * ✅ AUTH HELPER FUNCTION:
 * -login process
 * Updates the user's login time during the login process.
 * @param {string} documentId - The ID of the document to be updated.
 */
export const updateUserLoginTime = async (documentId: string) => {
  console.log(
    "🎯 event_log:  🔥utils/firestore/updateUserLoginTime:  💢 Triggered"
  );

  try {
    const collectionRef = collection(firestore, "users");
    const docRef: DocumentReference<Data> = doc(collectionRef, documentId);
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    //-Ensure user doc does NOT exist
    if (docSnapshot.exists()) {
      // - Update users document with new login data
      const lastLogin = new Date().toISOString();
      await updateDoc(docRef, { lastLogin });

      console.log(
        `🎯 event_log:  🔥utils/firestore/updateUserLoginTime: ✔ Success -  Updated Document ${documentId} with new login time:  ${lastLogin}!`
      );
    } else {
      console.log(
        `🎯 event_log:  🔥utils/firestore/updateUserLoginTime:  ⚠ Warning -  Document ${documentId} does not exist in "users"`
      );
    }
  } catch (updateError: any) {
    console.error(
      "🎯 event_log:  🔥utils/firestore/updateUserLoginTime:  ❌ Error - An error occurred during updating user document:",
      updateError.message
    );
  }
};

// 
/**
 * ⌛✅ SPEACIAL ONE-TIME FUNCTION:
 * -used for development
 * Creates a new collection based on input TypeScript type.
 * @param {string} collectionName - The name of the collection to be created.
 * @param {DocumentData} data - Data to be added to the collection.
 * @returns {Promise<boolean>} - A promise indicating whether the collection creation was successful.
 */
export const createCollection = async <T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<boolean> => {
  console.log(
    `🎯 event_log:  🔥utils/firestore/createCollection:  💢 Triggered`
  );
  try {
    const dataCollection = collection(firestore, collectionName);
    await addDoc(dataCollection, data);
    console.log(
      `🎯 event_log:  🔥utils/firestore/createCollection:  ✔ Success:  Added ${collectionName} collection with data.`
    );
    return true;
  } catch (error) {
    console.error(
      `🎯 event_log:  🔥utils/firestore/createCollection:  ❌ Error adding document: ${error}`
    );
    return false;
  }
};
