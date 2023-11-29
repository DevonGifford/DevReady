import db from "../firebase/firebaseConfig";
import {
  Firestore,
  collection,
  doc,
  getFirestore,
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

// ✅ ONE TIME FUNCTION: creates/updates a specified document in a specified collection
export const updateDocument = async (
  collectionName: CollectionName,
  documentId: DocumentId,
  data: Data
) => {
  const collectionRef = collection(firestore, collectionName);
  const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

  try {
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    if (docSnapshot.exists()) {
      await updateDoc(docRef, data);
      console.log(
        `Document ${documentId} updated successfully in collection ${collectionName}!`
      );
    } else {
      await setDoc(docRef, data);
      console.log(
        `Document ${documentId} created successfully in collection ${collectionName}!`
      );
    }
    return true;
  } catch (error: any) {
    console.error(
      `Error updating/creating document ${documentId} in collection ${collectionName}: `,
      error
    );
    return false;
  }
};

// ✅ ONE TIME FUNCTION:  creates a new collection based on passed TypeScript type
export const createCollection = async <T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<boolean> => {
  try {
    const dataCollection = collection(firestore, collectionName);
    await addDoc(dataCollection, data);
    console.log(`Added ${collectionName} collection with data.`);
    return true;
  } catch (error) {
    console.error(`Error adding document: ${error}`);
    return false;
  }
};
