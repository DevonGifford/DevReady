import React, { createContext, useState, useEffect, useContext } from "react";
import db, { auth } from "@/utils/firebase/firebaseConfig";
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

type Data = Record<string, any>;

type UserContextProps = {
  userProfile: UserProfile | null;
  fetchUserDataProcess: (userId: string) => Promise<void>;
  updateUserDataProcess: (
    documentId: string,
    userProfile: Partial<UserProfile>
  ) => Promise<void>;
};

// 👇 USER CONTEXT => exposing following...
const UserContext = createContext<UserContextProps>({
  userProfile: null,
  fetchUserDataProcess: async () => {},
  updateUserDataProcess: async () => {},
});

// - Explicit Return:
// - allows for additional code/logic to be added inside function before returning context
export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // ✅ UPDATING USER-STATE ON AUTH CHANGE
  //    🎯 to-do-list:  update sessionStorage? (encrypted?)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(
          "🎯event_log:  🎭UserContext/onAuthStateChanged👀:  auth changed and fetch triggered ⚡"
        );
        try {
          // Fetch user data after a slight delay to allow Firestore to create the document
          setTimeout(async () => {
            await fetchUserDataProcess(user.uid);
          }, 2000); // Adjust the delay time as needed
        } catch (error) {
          console.log(
            "🎯event_log:  🎭UserContext/onAuthStateChanged:   Error fetching user profile from firebase:",
            error
          );
        }
      } else {
        setUserProfile(null);
        console.log(
          "🎯event_log:  🎭UserContext/onAuthStateChanged:  The context has been set to null "
        );
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅  HANDLES UPDATING USERS DOC - checks if doc exists, updates the doc & updates state
  //     🎯 to-do-list:  update sessionStorage? (encrypted?)
  const updateUserDataProcess = async (
    documentId: string,
    newData: Partial<UserProfile>
  ) => {
    console.log(
      "🎯event_log:  🎭UserContext/updateUserDataProcess : Triggered"
    );

    const data: Data = { ...newData };

    const firestore: Firestore = db;
    const collectionName: string = "users";
    const collectionRef = collection(firestore, collectionName);
    const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

    try {
      const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

      // - check if user doc exists and update the doc
      if (docSnapshot.exists()) {
        await updateDoc(docRef, data);
        console.log(
          `🎯event_log:  🎭UserContext/updateUserDataProcess : Document ${documentId} updated successfully in collection ${collectionName}!`
        );

        // - Update the state
        // - Merge changes with existing userProfile (if it exists) or create a new object
        setUserProfile((prevUserProfile) => {
          // - If userProfile doesn't exist, return newData as the new state
          if (!prevUserProfile) {
            return newData as UserProfile;
          }
          // - If userProfile exists, merge changes with existing data
          return { ...prevUserProfile, ...newData } as UserProfile;
        });
      } else {
        console.log(
          `🎯event_log:  🎭UserContext/updateUserDataProcess ❌ ERROR:  Could not find the Document ${documentId} in collection ${collectionName}!`
        );
      }
    } catch (error: any) {
      console.error(
        `🎯event_log:  🎭UserContext/updateUserDataProcess ❌ ERROR: updating/creating document ${documentId} in collection ${collectionName}: `,
        error
      );
    }
  };

  // ✅  HANDLES FETCHING USER FIRESTORE DOC - checks if doc exists, sets to state
  //     🎯 to-do-list:  update sessionStorage? (encrypted?)
  const fetchUserDataProcess = async (userId: string) => {
    console.log("🎯event_log:  🎭UserContext/fetchUserDataProcess : Triggered");
    try {
      const userDocRef = doc(collection(db, "users"), userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as UserProfile;
        setUserProfile(userData);
        console.log(
          "🎯event_log:  🎭UserContext/fetchUserDataProcess:   Success:  UserContext successfully loaded data - User document found in firestore!"
        );
      } else {
        console.log(
          "🎯event_log:  🎭UserContext/fetchUserDataProcess:   Warning:  UserContext failed to load data - User document does not exist.  current userID: ",
          userId
        );
      }
    } catch (error) {
      console.log(
        "🎯event_log:  🎭UserContext/fetchUserDataProcess:   Error:  UserContext failed to load data - Error fetching user profile:"
      );
      console.error("Error fetching user profile:", error);
    }
  };

  const userContextValue: UserContextProps = {
    userProfile,
    updateUserDataProcess,
    fetchUserDataProcess,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
