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

// 🎯to-do-list:  update sessionStorage? (encrypted?)

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // ✅ UPDATING USER-STATE ON AUTH CHANGE
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log(
        "🎯event_log:  🎭UserContext/onAuthStateChanged:  💢 Triggered"
      );
      if (user) {
        try {
          // ⌛ TEMPORARY WAY OF HANDELING
          // -⏲ Fetch user data after a slight delay to allow Firestore to create the document on register:
          // -🤔 create registration flag?  No, this code will be impacted/updated with onboarding process.
          setTimeout(async () => {
            await fetchUserDataProcess(user.uid);
          }, 2000);
        } catch (error) {
          console.log(
            "🎯event_log:  🎭UserContext/onAuthStateChanged:   ❌ Error fetching user profile from firebase:",
            error
          );
        }
      } else {
        setUserProfile(null);
        console.log(
          "🎯event_log:  🎭UserContext/onAuthStateChanged:  ⚠ The user context has been set to null "
        );
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅  HANDLES UPDATING USERS DOC - checks if doc exists, updates the doc & updates state
  const updateUserDataProcess = async (
    documentId: string,
    newData: Partial<UserProfile>
  ) => {
    console.log(
      "🎯event_log:  🎭UserContext/updateUserDataProcess : 💢 Triggered"
    );

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
        console.log(
          `🎯event_log:  🎭UserContext/updateUserDataProcess : Document ${documentId} updated successfully in collection ${collectionName}!`
        );

        // - Update the state
        setUserProfile((prevUserProfile) => {
          // 👇 If userProfile doesn't exist, return newData as the new state
          if (!prevUserProfile) {
            return newData as UserProfile;
          }
          // 👇 If userProfile exists, merge changes with existing data
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
  const fetchUserDataProcess = async (userId: string) => {
    console.log(
      "🎯event_log:  🎭UserContext/fetchUserDataProcess :  💢 Triggered"
    );
    try {
      const userDocRef = doc(collection(db, "users"), userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as UserProfile;
        setUserProfile(userData);
        console.log(
          "🎯event_log:  🎭UserContext/fetchUserDataProcess:  ✔ Success:  UserContext successfully loaded data - User document found in firestore!"
        );
      } else {
        console.log(
          "🎯event_log:  🎭UserContext/fetchUserDataProcess:  ⚠ Warning:  UserContext failed to load data - User document does not exist.  current userID: ",
          userId
        );
      }
    } catch (error) {
      console.error(
        "🎯event_log:  🎭UserContext/fetchUserDataProcess:  ❌ Error:  UserContext failed to load data - Error fetching user profile:"
      );
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
