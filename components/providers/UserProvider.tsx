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

type Data = Record<string, any>;
type UserContextProps = {
  userProfile: UserProfile | null;
  updateUserProfile: (userProfile: Partial<UserProfile>) => Promise<void>;
  fetchUserDataProcess: (userId: string) => Promise<void>;
  updateUserDataProcess: (
    documentId: string,
    userProfile: Partial<UserProfile>
  ) => Promise<void>;
};
// 👇 USER CONTEXT => exposing following...
const UserContext = createContext<UserContextProps>({
  userProfile: null,
  updateUserProfile: async () => {},
  fetchUserDataProcess: async () => {},
  updateUserDataProcess: async () => {},
});
// 📌 Explicit Return:
// 📌 allows for additional code/logic to be added inside function before returning context
export const useUserContext = () => {
  return useContext(UserContext);
};

// 🎯🔮 to-do-list:  update sessionStorage? (encrypted?)

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
            "🎯event_log:  🎭UserContext/onAuthStateChanged:   ❌ Error:  Fetching user profile from firebase:",
            error
          );
        }
      } else {
        setUserProfile(null);
        console.log(
          "🎯event_log:  🎭UserContext/onAuthStateChanged:  ⚠ Warning:  The user context has been set to null "
        );
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * ✅ HANDLES UPDATING CONTEXT:
   * Updates the user profile in the context with new data.
   * @param {Partial<UserProfile>} newData - The new data to update in the user profile.
   * @returns {Promise<void>} A Promise that resolves once the update process completes.
   */
  const updateUserProfile = async (newData: Partial<UserProfile>) => {
    console.log("🎯event_log:  🎭UserContext/updateUserProfile: 💢 Triggered");
    try {
      if (!userProfile) {
        console.error(
          `🎯event_log:  🎭UserContext/updateUserProfile:  ❌ Error:  cannot access user context.`
        );
        return;
      }

      console.log(
        "🦺event_log:  🎭UserContext/updateUserProfile:  Current userProfile",
        userProfile
      );
      console.log(
        "🦺event_log:  🎭UserContext/updateUserProfile:  New data to be updated",
        newData
      );

      //👇 Merge the existing profile with the new data
      const updatedProfile = { ...userProfile, ...newData };
      console.log(
        "🦺event_log:  🎭UserContext/updateUserProfile:  Updated profile after merge",
        updatedProfile
      );

      //👇 Update the userProfile state with the merged profile
      setUserProfile(updatedProfile);
      console.log(
        "🎯event_log:  🎭UserContext/updateUserProfile:  ✔  Success:  Successfully updated userProfile - new data:",
        updatedProfile
      );
    } catch (error) {
      console.error(
        "🎯event_log:  🎭UserContext/updateUserProfile:  ❌ Error:  Error updating userProfile",
        error
      );
    }
  };

  /**
   * ✅ HANDLES UPDATING USER-DOC:
   * Handles updating user document by checking if the document exists, updating it, and updating the state accordingly.
   * @param {string} documentId - The ID of the document to update.
   * @param {Partial<UserProfile>} newData - The new data to update in the user profile.
   * @returns {Promise<void>} A Promise that resolves once the update process completes.
   */
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
          `🎯event_log:  🎭UserContext/updateUserDataProcess:  ✔ Success:  Document ${documentId} updated successfully in collection ${collectionName}!`
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
          `🎯event_log:  🎭UserContext/updateUserDataProcess ❌ Error:  Could not find the Document ${documentId} in collection ${collectionName}!`
        );
      }
    } catch (error: any) {
      console.error(
        `🎯event_log:  🎭UserContext/updateUserDataProcess ❌ Error:  Updating/creating document ${documentId} in collection ${collectionName}: `,
        error
      );
    }
  };

  /**
   * ✅ HANDLES FETCHING USER-DOC
   * Handles fetching user firestore document by checking if the document exists and sets it to state.
   * @param {string} userId - The ID of the user whose data is being fetched.
   * @returns {Promise<void>} A Promise that resolves once the fetch process completes.
   */
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
    updateUserProfile,
    updateUserDataProcess,
    fetchUserDataProcess,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
