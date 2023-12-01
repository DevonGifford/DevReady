"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useUserContext } from "@/components/providers/UserProvider";
import { Button } from "@/components/ui/button";
import { useCustomToast } from "@/lib/useCustomToast";
import React from "react";

function MainPage() {
  const customToast = useCustomToast();
  const { user } = useAuth();
  const { userProfile, fetchUserDataProcess, updateUserDataProcess } =
    useUserContext();

  // ⌛ TEMPORARY FUNCTION:
  const handleFetchUserDataProcess = () => {
    if (user) {
      fetchUserDataProcess(user.uid)
        .then(() => {
          console.log("User data fetched and context updated successfully!");
          customToast("🎯 fetched data & updated user context ✅");
          // window.location.reload(); // Refresh the page after updating the context
        })
        .catch((error) => {
          console.error("Error updating user context:", error);
          customToast("🎯 error in fetch/update ❌");
        });
    } else {
      console.error("User is not authenticated!");
    }
  };

  // ⌛ TEMPORARY FUNCTION:
  const handleUpdateUserDataProcess = () => {
    if (user) {
      updateUserDataProcess(user.uid, {
        account: {
          username: "Test Update - Devon hello",
          userimage: "Devon facee",
          age: 29,
          home_lang: "Afrikaanse",
          location: "South Africa",
          urls: {
            github: "gitlink",
            linkedin: "linkedinlink",
            website: "portfo",
          },
          ztm_student: true,
          star_mentor: false,
        },
      })
        .then(() => {
          console.log("User context and firestore updated successfully!");
          customToast("🎯 updated user context ✅");
          // window.location.reload(); // Refresh the page after updating the context
        })
        .catch((error) => {
          console.error("Error updating user context:", error);
          customToast("🎯 error  ❌");
        });
    } else {
      console.error("Something went wrong");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-lg font-medium">Welcome to your ZTM Portfolio</h2>

      {/* 🎯 to-do-list:  everything below is just for development purposes */}
      <h2 className="text-lg font-medium text-blue-500 text center">
        The following is for development testing purposes:
      </h2>

      {/* CONTEXT INFO */}
      <>
        <div className="text-center">
          <h3 className="font-semibold text-lg text-orange-600">
            CHECK CONTEXT STATUS
          </h3>
          <hr />
          <h6 className="font-semibold text-sm text-orange-600">
            is data available?
          </h6>
        </div>

        {/* CONTEXT CHECKS */}
        <div className="flex flex-row w-full justify-evenly items-center">
          <div className=" flex flex-col text-center items-center p-5 border-2 rounded-lg ">
            <p className="font-bold pb-2">AUTH CONTEXT </p>
            {user ? "✅" : "❌"} {/* Check if user exists */}
          </div>
          <div className=" flex flex-col text-center items-center p-5 border-2 rounded-lg">
            <p className="font-bold pb-2">USER CONTEXT </p>
            <span>{userProfile ? "✅" : "❌"} </span>{" "}
            {/* Check if userProfile exists */}
          </div>
        </div>

        <div className="text-center pt-6">
          <h3 className="font-semibold text-lg text-orange-600">
            CHECK USER DATA
          </h3>
          <hr />
          <h6 className="font-semibold text-sm text-orange-600">
            currents user data
          </h6>
        </div>
        {/* USER DATA */}
        <div>
          <h3 className="text-lg font-bold">
            {/* Welcome, {userProfile?.account.username} */}
          </h3>
          <p>
            email: {"  "}
            <span className="font-bold text-devready-green">
              {userProfile?.email}
            </span>
          </p>
          <p>
            created at: {"  "}
            <span className="font-bold text-devready-green">
              {userProfile?.createdAt}
            </span>
          </p>
          <p>
            uuid: {"  "}
            <span className="font-bold text-devready-green">
              {userProfile?.uuid}
            </span>
          </p>
          <p>
            username: {"  "}
            <span className="font-bold text-devready-green">
              {userProfile?.account.username}
            </span>
          </p>
        </div>
      </>

      {/* BUTTONS */}
      <div className="flex flex-col gap-10 pt-10 p-5 border-2 justify-center items-center text-center">
        <div className="flex flex-col justify-center items-center text-center  ">
          <Button onClick={handleFetchUserDataProcess}>
            {" "}
            fetchUserDataProcess
          </Button>
          <p className="text-sm">
            <em>
              This triggers the usercontext fetch process based on current user{" "}
            </em>
          </p>
        </div>

        <div className="flex flex-col justify-center items-center text-center  ">
          <Button onClick={handleUpdateUserDataProcess}>
            {" "}
            updateUserDataProcess
          </Button>
          <p className="text-sm">
            <em>
              This updates the userContext and firestores user.account
              information with mock data
            </em>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
