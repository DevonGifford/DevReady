import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  Firestore,
  DocumentReference,
  doc,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";

import db, { storage } from "../firebase/firebaseConfig";
import { UserProfile } from "@/types/UserProfile";

type Data = Record<string, any>;

/**
 * Uploads the file to Firebase Storage.
 * @param file Blob or ArrayBuffer to upload.
 * @param fileName Name for the uploaded file.
 * @returns Promise with the public URL of the uploaded file.
 */
export const uploadRaw = async (file: Blob | ArrayBuffer, fileName: string) => {
  try {
    console.log("uploadRaw  💢 Triggered");

    //- Upload image.
    const imageRef = ref(storage, `images/${fileName}`);
    const uploadImage = await uploadBytes(imageRef, file);

    //- Create + upload file metadata.
    const newMetadata = {
      cacheControl: "public,max-age=2629800000", // 1 month
      contentType: uploadImage.metadata.contentType,
    };
    await updateMetadata(imageRef, newMetadata);

    //- Get the image URL.
    const publicImageUrl = await getDownloadURL(imageRef);

    //- Success
    console.log("uploadRaw  ✔  Success");
    return publicImageUrl;
  } catch (error) {
    //- Error
    console.log("uploadRaw  ❌  Error", error);
    // 🎯to-do-list: Return something useful
    throw error;
  }
};
