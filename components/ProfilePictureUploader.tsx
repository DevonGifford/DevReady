import { useState, ChangeEvent, useRef, useEffect } from "react";
import { uploadImageProcess } from "@/utils/firebase/storage.utils";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";
import { useUserContext } from "./providers/UserProvider";
import { UserProfile } from "@/types/UserProfile";
import FileInputArea from "./ui/fileinputarea";

type PPUploaderProps = {
  userDocId: string;
};

export const ProfilePictureUploader: React.FC<PPUploaderProps> = ({
  userDocId,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { updateUserProfile, userProfile } = useUserContext();
  const [isUploading, setIsUploading] = useState(false); //-handles spinner loading state
  const [showAvatar, setShowAvatar] = useState(false); //-handles contional rendering for UPLOAD vs. UPLOADED
  const [newAvatar, setNewAvatar] = useState(""); //-handles storing the uploaded image url
  const [errorMessage, setErrorMessage] = useState<string | null>(null); //-handles state for error message

  useEffect(() => {
    setShowAvatar(!!userProfile?.account.userimage);
  }, [userProfile?.account.userimage]);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageData = e.target.files;

    if (!imageData) {
      console.log("✖ Error: No image data found");
      return;
    }

    try {
      setIsUploading(true);
      //-Check if the selected file is an image
      if (!imageData[0].type.startsWith("image/")) {
        setIsUploading(false);
        console.log("✖ Error: Selected file is not an image");
        return;
      }
      //-Upload the image
      const response = await uploadImageProcess(
        userDocId,
        imageData[0],
        userDocId
      );
      //-Update the state
      if (response) {
        setNewAvatar(response);
        if (userProfile) {
          const newData: UserProfile = {
            ...userProfile,
            account: {
              ...userProfile.account,
              userimage: response,
            },
          };
          updateUserProfile(newData);
        }
        e.target.value = ""; //-Clear the file upload value.
        setShowAvatar(true); //-Show custom avatar
      }
    } catch (error: any) {
      if (error === "storage/canceled") {
        setErrorMessage("Error: User canceled the upload");
      } else if (error.code === "storage/unauthenticated") {
        setErrorMessage("Error: User is unauthenticated");
      } else {
        setErrorMessage(`Error: ${error.message}`);
      }
    } finally {
      setIsUploading(false);
    }
  };

  // 🎯 to-do-list: temporary way of handeling - requires improvement
  const handleChangeAgain = () => {
    setShowAvatar(false); //- reset upload
    setIsUploading(false); //-reset loading state
    setErrorMessage(null); //-reset error message
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center scale-75 lg:scale-100">
        <div className="flex flex-col items-center justify-center text-center aspect-square ">
          {isUploading ? (
            <Spinner size={"icon"} />
          ) : !showAvatar ? (
            <>
              <FileInputArea
                fileRef={fileRef}
                isUploading={isUploading}
                handleFileUpload={handleFileUpload}
              />
              {errorMessage && (
                <div className="text-red-500">{errorMessage}</div>
              )}
            </>
          ) : (
            <div className="relative flex flex-col w-full h-full items-center justify-center text-center aspect-square">
              {/* Render user avatar */}
              <Avatar style={{ width: "200px", height: "200px" }}>
                <AvatarImage
                  className="flex rounded-full w-full h-full "
                  src={userProfile?.account.userimage || newAvatar}
                ></AvatarImage>
              </Avatar>
              <Button
                onClick={handleChangeAgain}
                variant={"devfill"}
                size={"mini"}
                className="text-base md:text-base lg:text-base mt-4 p-4"
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
