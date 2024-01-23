import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase.config";
import { updateUserImage } from "./firestore.utils";

//⏳ uploads userimage and create a ref in users doc - 
//🎯 to-do-list: needs clean up - procedural programming req.
export const uploadImageProcess = async (
  fileName: string,
  file: Blob | ArrayBuffer,
  userDocId: string
) => {
  let publicImageUrl = "";
  const imageRef = ref(storage, `images/${fileName}`);

  try {
    const uploadImage = await uploadBytes(imageRef, file);

    //- Create + upload file metadata.
    try {
      const newMetadata = {
        cacheControl: "public,max-age=2629800000", // 1 month
        contentType: uploadImage.metadata.contentType,
      };
      await updateMetadata(imageRef, newMetadata);

      try {
        //- Get the image URL.
        publicImageUrl = await getDownloadURL(imageRef);

        //- Update user document
        await updateUserImage(userDocId, publicImageUrl);
      } catch (getUrlError) {
        console.error("❌ Error - Failed to get image URL.", getUrlError);
        throw getUrlError;
      }
    } catch (updateMetaError) {
      console.error("❌ Error - Failed to update metadata.", updateMetaError);
      throw updateMetaError;
    }
  } catch (uploadError) {
    console.error("❌ Error - Image upload failed.", uploadError);
    throw uploadError;
  }

  return publicImageUrl;
};

export const onlyUploadImage = async (
  fileName: string,
  file: Blob | ArrayBuffer
) => {
  try {
    const imageRef = ref(storage, `images/${fileName}`);
    const uploadImage = await uploadBytes(imageRef, file);

    const newMetadata = {
      cacheControl: "public,max-age=2629800000", // 1 month
      contentType: uploadImage.metadata.contentType,
    };
    await updateMetadata(imageRef, newMetadata);

    const publicImageUrl = await getDownloadURL(imageRef);

    return publicImageUrl;
  } catch (error) {
    console.error("❌ Error - Image upload failed.", error);
    throw error;
  }
};
