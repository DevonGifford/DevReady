import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase.config";
import { updateUserImage } from "./firestore.utils";

/**
 * ✅ UPLOAD IMAGE + UPDATE USER DOCUMENT
 * This will upload userimage to firebase and create a reference to image in users doc
 * @param fileName Name for the uploaded file.
 * @param file Blob or ArrayBuffer to upload.
 * @param userDocId The users uuid.
 * @returns Promise with the public URL of the uploaded file.
 */
export const uploadImageProcess = async (
  fileName: string,
  file: Blob | ArrayBuffer,
  userDocId: string
) => {
  console.log(
    "🎯event_log:  🔥utils/firestore/storage/uploadImageProcess:  💢 Triggered"
  );
  try {
    //👇 HANDLE UPLOADING IMAGE:
    console.log(
      "🎯event_log:  🔥utils/firestore/storage/uploadImageProcess:  Uploading Image..."
    );
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

        //👇 HANDLE UPDATING THE USER-DOCUMENT WITH IMAGE REFERENCE:
        try {
          //- Get the image URL.
          publicImageUrl = await getDownloadURL(imageRef);
          console.log(
            "🎯event_log:  🔥utils/firestore/storage/uploadImageProcess:  ✔  Successfully uploaded image to storage - publicImageUrl: ",
            publicImageUrl
          );
          //- Update user document
          console.log(
            "🎯event_log:  🔥utils/firestore/storage/uploadImageProcess:  Updating user document..."
          );

          await updateUserImage(userDocId, publicImageUrl);
        } catch (getUrlError) {
          console.error(
            "🎯event_log:  🔥utils/firestore/storage/uploadImageProcess:  ❌ Error - Failed to get image URL.",
            getUrlError
          );
          throw getUrlError;
        }
      } catch (updateMetaError) {
        console.error(
          "🎯event_log:  🔥utils/firestore/storage/uploadImageProcess:  ❌ Error - Failed to update image metadata.",
          updateMetaError
        );
        throw updateMetaError;
      }
    } catch (uploadError) {
      console.error(
        "🎯event_log:  🔥utils/firestore/storage/uploadImageProcess:  ❌ Error - Image upload failed.",
        uploadError
      );
      throw uploadError;
    }

    return publicImageUrl;
  } catch (error) {
    console.error(
      "🎯event_log:  🔥utils/firestore/storage/uploadImageProcess:  ❌ Error - Image upload process failed.",
      error
    );
    throw error;
  }
};

/**
 * ✅ UPLOAD AN IMAGE
 * - used in development
 * Soley uploads the file to Firebase Storage.
 * @param file Blob or ArrayBuffer to upload.
 * @param fileName Name for the uploaded file.
 * @returns Promise with the public URL of the uploaded file.
 */
export const onlyUploadImage = async (
  fileName: string,
  file: Blob | ArrayBuffer
) => {
  try {
    console.log(
      "🎯event_log:  🔥utils/firestore/storage/onlyUploadImage:  💢 Triggered"
    );

    const imageRef = ref(storage, `images/${fileName}`);
    const uploadImage = await uploadBytes(imageRef, file);

    const newMetadata = {
      cacheControl: "public,max-age=2629800000", // 1 month
      contentType: uploadImage.metadata.contentType,
    };
    await updateMetadata(imageRef, newMetadata);

    const publicImageUrl = await getDownloadURL(imageRef);
    console.log(
      "🎯event_log:  🔥utils/firestore/storage/onlyUploadImage:  ✔ Success - Image uploaded. Public URL:",
      publicImageUrl
    );

    return publicImageUrl;
  } catch (error) {
    console.error(
      "🎯event_log:  🔥utils/firestore/storage/onlyUploadImage:  ❌ Error - Image upload failed.",
      error
    );
    throw error;
  }
};
