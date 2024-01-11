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

import { DatabaseSchema } from "@/types/databaseSchema";

import mockDB from "@/constants/mockDB.json";

type Data = Record<string, any>;
type DatabaseContextProps = {
  database: DatabaseSchema[] | null;
  updateDatabaseLocally: (database: Partial<DatabaseSchema[]>) => Promise<void>;
  syncDatabase: (userId: string) => Promise<void>;
  updateDatabaseProcess: (
    documentId: string,
    database: Partial<DatabaseSchema[]>
  ) => Promise<void>;
  setMockDatabase: (database: Partial<DatabaseSchema[]>) => Promise<void>;
};
// 👇 USER CONTEXT => exposing following...
const DatabaseContext = createContext<DatabaseContextProps>({
  database: null,
  updateDatabaseLocally: async () => {},
  syncDatabase: async () => {},
  updateDatabaseProcess: async () => {},
  setMockDatabase: async () => {},
});
// 📌 Explicit Return:
// 📌 allows for additional code/logic to be added inside function before returning context
export const useDatabaseContext = () => {
  return useContext(DatabaseContext);
};

// 🎯🔮 to-do-list:  update sessionStorage? (encrypted?)

export const DatabaseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [database, setDatabase] = useState<DatabaseSchema[] | null>(null);

  // ✅ SYNCH WITH DATABASE IF TRIGGERED
  useEffect(() => {
    const triggerFetch = async () => {
      console.log("🎯event_log: 🎭DatabaseContext/triggerFetch: 💢 Triggered");

      // 🎯 Insert a check if data exists in local storage and is not stale...
      // -🤔 Consider improving this logic by checking local storage for data freshness.

      // -⏲ Fetch user data after a slight delay for lazy/suspense-like behavior:
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay

        // ⌛ TEMPORARY WAY OF HANDLING FOR DEVELOPMENT
        setMockDatabase();
        //   await syncDatabase("user.uid");
      } catch (error) {
        console.log(
          "🎯event_log: 🎭DatabaseContext/triggerFetch: ❌ Error: Fetching user profile from firebase:",
          error
        );
        setDatabase(null);
        console.log(
          "🎯event_log: 🎭DatabaseContext/triggerFetch: ⚠ Warning: The user context has been set to null"
        );
      }
    };

    //- Calling the async function
    triggerFetch();

    //- Cleanup function
    return () => {
      // Cleanup logic here
    };
  }, []);

  /**
   * ⌛✅ HANDLES SETTING MOCK DATA INTO THE DATABASE
   * 🔮 Need to also add funcitonality to update local storage
   * Handles fetching user firestore collection by checking if it exists and then sets it to the state & local-storage.
   * @returns {Promise<void>} A Promise that resolves once the fetch process completes.
   */
  const setMockDatabase = async () => {
    console.log(
      "🎯event_log:  🎭DatabaseContext/setMockDatabase:  💢 Triggered"
    );
    try {
      const theMockData: DatabaseSchema[] = mockDB; //- Assuming mockDB is an array of DatabaseSchema[]

      const localStorageKey = "ztmready-database";
      const existingMockData = localStorage.getItem(localStorageKey);
      const currentTimeStamp = new Date().getTime(); //- Current timestamp in milliseconds

      if (!existingMockData) {
        const dataWithTimestamp = {
          timestamp: currentTimeStamp,
          data: theMockData,
        };
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(dataWithTimestamp)
        );
        setDatabase(theMockData); //- Set the entire array into the state
        console.log(
          "🎯event_log:  🎭DatabaseContext/setMockDatabase:  ✔ Success: Mock data set in database context and local storage."
        );
      } else {
        const parsedMockData = JSON.parse(existingMockData);
        const storedTimeStamp = parsedMockData.timestamp;

        //- Check if stored data is older than 24 hours
        const isDataOld =
          currentTimeStamp - storedTimeStamp > 24 * 60 * 60 * 1000;

        if (isDataOld) {
          const dataWithTimestamp = {
            timestamp: currentTimeStamp,
            data: theMockData,
          };
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(dataWithTimestamp)
          );
          setDatabase(theMockData); //- Set the entire array into the state
          console.log(
            "🎯event_log:  🎭DatabaseContext/setMockDatabase:  ⚠ Warning: Mock data set due to old data in local storage."
          );
        } else {
          //- Use the existing data from local storage
          setDatabase(parsedMockData.data);
          console.log(
            "🎯event_log:  🎭DatabaseContext/setMockDatabase:  ✔ Success: Using existing data from local storage."
          );
        }
      }
    } catch (error) {
      console.error(
        "🎯event_log:  🎭DatabaseContext/setMockDatabase:  ❌ Error: Failed to load mock data or set it into database context and local storage.",
        error
      );
    }
  };

  /**
   * ✅ HANDLES UPDATING DATABASE CONTEXT LOCALLY:
   * 🔮 Need to also add funcitonality to update local storage
   * - Updates the database context in the context as well as within the local storage...
   * @param {Partial<DatabaseSchema[]>} newData - The new data to update in the user profile.
   * @returns {Promise<void>} A Promise that resolves once the update process completes.
   */
  const updateDatabaseLocally = async (newData: Partial<DatabaseSchema[]>) => {
    //🎯🔮 Need to also add funcitonality tpo update current local storage
    console.log(
      "🎯event_log:  🎭DatabaseContext/updateDatabaseLocally: 💢 Triggered"
    );
    try {
      if (!database) {
        console.error(
          `🎯event_log:  🎭DatabaseContext/updateDatabaseLocally:  ❌ Error:  cannot access current database.`
        );
        return;
      }

      console.log(
        "🦺event_log:  🎭DatabaseContext/updateDatabaseLocally:  Current database",
        database
      );
      console.log(
        "🦺event_log:  🎭DatabaseContext/updateDatabaseLocally:  New data to be updated into the database",
        newData
      );

      //👇 Merge the existing profile with the new data
      const updatedProfile = { ...database, ...newData };
      console.log(
        "🦺event_log:  🎭DatabaseContext/updateDatabaseLocally:  Updated profile after merge",
        updatedProfile
      );

      //👇 Update the database state with the merged profile
      //   setDatabase(updatedProfile);
      console.log(
        "🎯event_log:  🎭DatabaseContext/updateDatabaseLocally:  ✔  Success:  Successfully updated database - new data:",
        updatedProfile
      );
    } catch (error) {
      console.error(
        "🎯event_log:  🎭DatabaseContext/updateDatabaseLocally:  ❌ Error:  Error updating database",
        error
      );
    }
  };

  /**
   * ✅ HANDLES UPDATING FIREBASE DATABASE:
   * - Handles updating user document by checking if the document exists, updating it, and updating the state accordingly.
   * @param {string} documentId - The ID of the document to update.
   * @param {Partial<DatabaseSchema[]>} newData - The new data to update in the user profile.
   * @returns {Promise<void>} A Promise that resolves once the update process completes.
   */
  const updateDatabaseProcess = async (
    documentId: string,
    newData: Partial<DatabaseSchema[]>
  ) => {
    console.log(
      "🎯event_log:  🎭DatabaseContext/updateDatabaseProcess : 💢 Triggered"
    );

    const data: Data = { ...newData };

    const firestore: Firestore = db;
    const collectionName: string = "database";
    const collectionRef = collection(firestore, collectionName);
    const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

    try {
      const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

      // - check if user doc exists and
      if (docSnapshot.exists()) {
        //- update the doc
        await updateDoc(docRef, data);
        console.log(
          `🎯event_log:  🎭DatabaseContext/updateDatabaseProcess:  ✔ Success:  Document ${documentId} updated successfully in collection ${collectionName}!`
        );

        // - Update the state
        setDatabase((prevUserProfile) => {
          // 👇 If database doesn't exist, return newData as the new state
          if (!prevUserProfile) {
            return newData as DatabaseSchema[];
          }
          // 👇 If database exists, merge changes with existing data
          return { ...prevUserProfile, ...newData } as DatabaseSchema[];
        });
      } else {
        console.log(
          `🎯event_log:  🎭DatabaseContext/updateDatabaseProcess ❌ Error:  Could not find the Document ${documentId} in collection ${collectionName}!`
        );
      }
    } catch (error: any) {
      console.error(
        `🎯event_log:  🎭DatabaseContext/updateDatabaseProcess ❌ Error:  Updating/creating document ${documentId} in collection ${collectionName}: `,
        error
      );
    }
  };

  /**
   * ✅ HANDLES FETCHING/SYNCHING WITH FIREBASE DATABASE
   * 🔮 Need to also add funcitonality to update local storage
   * - Handles fetching user firestore collection by checking if it exists and then sets it to the state & local-storage.
   * @param {string} userId - The ID of the user whose data is being fetched.
   * @returns {Promise<void>} A Promise that resolves once the fetch process completes.
   */
  const syncDatabase = async (userId: string) => {
    console.log("🎯event_log:  🎭DatabaseContext/syncDatabase :  💢 Triggered");
    try {
      const userDocRef = doc(collection(db, "database"), userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as DatabaseSchema[];
        setDatabase(userData);
        console.log(
          "🎯event_log:  🎭DatabaseContext/syncDatabase:  ✔ Success:  DatabaseContext successfully loaded data - User document found in firestore!"
        );
      } else {
        console.log(
          "🎯event_log:  🎭DatabaseContext/syncDatabase:  ⚠ Warning:  DatabaseContext failed to load data - User document does not exist.  current userID: ",
          userId
        );
      }
    } catch (error) {
      console.error(
        "🎯event_log:  🎭DatabaseContext/syncDatabase:  ❌ Error:  DatabaseContext failed to load data - Error fetching user profile:"
      );
    }
  };

  const databaseContextValue: DatabaseContextProps = {
    database,
    updateDatabaseLocally,
    updateDatabaseProcess,
    syncDatabase,
    setMockDatabase,
  };

  return (
    <DatabaseContext.Provider value={databaseContextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};
