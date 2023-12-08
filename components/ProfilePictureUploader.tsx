import { useState, ChangeEvent, useRef } from "react";
import { uploadImageProcess } from "@/utils/firebase/storage.utils";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";

interface PPProps {
  userDocId: string;
}

export const ProfilePictureUploader: React.FC<PPProps> = ({ userDocId }) => {
  const fileRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false); //-handles spinner state
  const [showAvatar, setShowAvatar] = useState(false); //-handles contional rendering for UPLOAD vs. UPLOADED
  const [newAvatar, setNewAvatar] = useState(""); //-handles storing the uploaded image url

  // ✅ HANDLE UPLOADING FILE :  uploads selected image, creates reference in users doc and sets state to flip card
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(
      "🎯 event_log:  🔥ProfilePictureUploader/handleFileUplaod:  💢 Triggered"
    );

    const imageData = e.target.files;

    if (imageData && imageData.length > 0) {
      try {
        setIsUploading(true);

        //-Check if the selected file is an image // 🎯 to do list improve this
        if (!imageData[0].type.startsWith("image/")) {
          console.log("Invalid file format. Please select an image.");
          setIsUploading(false);
          return;
        }

        const response = await uploadImageProcess(
          userDocId,
          imageData[0],
          userDocId
        );

        if (response) {
          setNewAvatar(response);
          e.target.value = ""; // Clear the file upload value.
          setShowAvatar(true); // Flip the toggle
          setIsUploading(false);
        } else {
          console.log(
            "🎯 event_log:  🔥ProfilePictureUploader/handleFileUplaod:  ❌ Error:  Something went wrong with the upload"
          );
        }
      } catch (error: any) {
        console.error("Error occurred during upload:", error.message);
        //- Handle specific error cases:
        if (error === "storage/canceled") {
          console.log(
            "🎯 event_log:  🔥ProfilePictureUploader/handleFileUplaod:  ❌ Error:  User canceled the upload",
            error
          );
        } else if (error.code === "storage/unauthenticated") {
          console.log(
            "🎯 event_log:  🔥ProfilePictureUploader/handleFileUplaod:  ❌ Error:  User is unauthenticated",
            error
          );
        } else {
          console.log(
            "🎯 event_log:  🔥ProfilePictureUploader/handleFileUplaod:  ❌ Error:  Unknown error:",
            error
          );
        }
        setIsUploading(false);
      }
    } else {
      console.log(
        "🎯 event_log:  🔥ProfilePictureUploader/handleFileUplaod:  ❌ Error:  No image data found"
      );
    }
  };

  const handleChangeAgain = () => {
    setShowAvatar(false); // Flip the toggle state
    setIsUploading(false); //reset the uplaod state
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center scale-75 lg:scale-100">
        {/* <h3 className="text-lg font-semibold">Upload Profile Picture</h3> */}

        <div className="flex flex-col items-center justify-center text-center aspect-square p-5">
          {isUploading ? (
            <Spinner size={"icon"} />
          ) : !showAvatar ? (
            <div className="flex items-center justify-center w-full h-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center aspect-square justify-center h-64 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-1 pb-6">
                  <svg
                    className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  disabled={isUploading} //? isDisabled
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          ) : (
            <div className="relative flex flex-col w-full h-full items-center justify-center text-center aspect-square">
              {/* Render user avatar */}
              <Avatar style={{ width: "150px", height: "150px" }}>
                <AvatarImage
                  className="flex rounded-full w-full h-full "
                  src={newAvatar}
                ></AvatarImage>
              </Avatar>
              <Button
                onClick={handleChangeAgain}
                variant={"devfill"}
                size={"mini"}
                className="text-base md:text-base lg:text-base mt-4 p-4"
              >
                Change again
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
