import React, { createContext, useState, useEffect, useContext } from "react";
import db, { auth } from "@/utils/firebase/firebase.config";
import {
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { UserProfile } from "@/types/UserProfile";
import { synchQuestionVault } from "@/utils/firebase/firestore.utils";

type Data = Record<string, any>;
type UserContextProps = {
  userProfile: UserProfile | null;
  updateUserProfile: (userProfile: Partial<UserProfile>) => Promise<void>;
  synchUserContext: (userId: string) => Promise<void>;
  updateUserDataProcess: (
    documentId: string,
    userProfile: Partial<UserProfile>
  ) => Promise<void>;
};

const UserContext = createContext<UserContextProps>({
  userProfile: null,
  updateUserProfile: async () => {},
  synchUserContext: async () => {},
  updateUserDataProcess: async () => {},
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // 📝 HYDRATE USER-CONTEXT + SYNCH QUESTION-VAULT ON AUTH CHANGE
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await synchUserContext(user.uid); //- Fetch and set User Data
          await synchQuestionVault(); //- Synchronize question vault in local storage
        } catch (error) {
          console.log("✖ Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = async (newData: Partial<UserProfile>) => {
    try {
      if (!userProfile) {
        console.log("✖ Error:  cannot access user context.");
        return;
      }
      const updatedProfile = { ...userProfile, ...newData };
      setUserProfile(updatedProfile);
    } catch (error) {
      console.log("✖ Error:  Error updating userProfile", error);
    }
  };

  const updateUserDataProcess = async (
    documentId: string,
    newData: Partial<UserProfile>
  ) => {
    const data: Data = { ...newData };
    const firestore: Firestore = db;
    const collectionName: string = "users";
    const collectionRef = collection(firestore, collectionName);
    const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

    try {
      const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);
      // - check if user doc exists and
      if (docSnapshot.exists()) {
        //- update the doc
        await updateDoc(docRef, data);

        // - Update the state
        setUserProfile((prevUserProfile) => {
          // 👇 If userProfile doesn't exist, return newData as the new state
          if (!prevUserProfile) {
            return newData as UserProfile;
          }
          // 👇 If userProfile exists, merge changes with existing data
          return { ...prevUserProfile, ...newData } as UserProfile;
        });
      }
    } catch (error: any) {
      console.error(`✖ Error updating/creating user doc`, error);
    }
  };

  const synchUserContext = async (userId: string) => {
    try {
      const userDocRef = doc(collection(db, "users"), userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as UserProfile;
        setUserProfile(userData);
      }
    } catch (error) {
      console.log("✖ Error: UserContext failed to load data");
    }
  };

  const userContextValue: UserContextProps = {
    userProfile,
    updateUserProfile,
    updateUserDataProcess,
    synchUserContext,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
