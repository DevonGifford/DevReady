'use client'; 

import React from "react";
import { UserProfile } from "@/types/UserProfile";
import { defaultUserProfile } from "@/types/UserProfile";
import { createCollection, updateDocument } from "@/utils/firestore/FireStore-Collection";
import toast from "react-hot-toast";

function UserDashboard() {
  const handleCreateCollection = async () => {
    const success = await createCollection('users', defaultUserProfile);

    if (success) {
      console.log('Collection created successfully!');
      toast.success("It worked");
    } else {
      console.error('Error creating Collection');
      toast.error("Something went wrong");
    }
  };
  
  const handleCreateUpdateDocument = async () => {
    const success = await updateDocument('users', "Mw0iO84m2wflAbQwJkB8", defaultUserProfile);

    if (success) {
      console.log('Collection created successfully!');
      toast.success("It worked");
    } else {
      console.error('Error creating Collection');
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-lg font-medium">
        Welcome to the User Dashboard Page
      </h2>
      
      <button onClick={handleCreateCollection} className="hover:text-green-600">Create Document</button>

      <button onClick={handleCreateUpdateDocument} className="hover:text-green-600">Create Document</button>
    </div>
  );
}

export default UserDashboard;
