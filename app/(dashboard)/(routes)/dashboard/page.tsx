"use client"; 

import { ProfilePictureUploader } from "@/components/ProfilePictureUploader";
import { useUserContext } from "@/components/providers/UserProvider";
import React from "react";

function MainPage() {
  const { userProfile } = useUserContext();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      {/* <h2 className="text-lg font-medium">
        Welcome to your ZTM Portfolio 
      </h2>
    <h3 className="text-devready-green">Coming Soon</h3> */}

      <h2 className="text-lg font-medium">Testing User Image Upload</h2>
      <ProfilePictureUploader userDocId={userProfile?.uuid!} />
      <p>name: {userProfile?.account.username}</p>
      <p>image: {userProfile?.account.userimage}</p>
      <p>uuid:  {userProfile?.uuid}</p>
    </div>

  );
}

export default MainPage;
