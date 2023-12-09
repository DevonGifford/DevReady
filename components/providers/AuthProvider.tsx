import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/utils/firebase/firebase.config";
import { Spinner } from "../Spinner";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  createUserDataProcess,
  updateUserLoginTime,
} from "@/utils/firebase/firestore.utils";

interface UserType {
  email: string | null;
  uid: string | null;
}

type AuthContextProps = {
  user: UserType | null;
  register: (email: string, password: string) => {};
  logIn: (email: string, password: string) => {};
  logOut: () => {};
};

// 👇 AUTH CONTEXT => exposing following...
const AuthContext = createContext<AuthContextProps>({
  user: null,
  register: async () => {},
  logIn: async () => {},
  logOut: async () => {},
});

// - Arrow Function Shorthand:
// - directly returns result of useContext explicitly defining any type.
export const useAuth = () => useContext<any>(AuthContext);

// 🎯to-do-list:  update sessionStorage? (encrypted?)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<Boolean>(true);

  /**
   * ✅ UPDATING AUTH-STATE - Handles the auth state change event.
   * @returns {void}
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(
        "🎯event_log:  🔑authProvider/onAuthStateChanged:  💢 Triggered"
      );
      if (user) {
        try {
          setUser({
            email: user.email,
            uid: user.uid,
          });
        } catch (error) {
          console.log(
            "🎯event_log:  🔑authProvider/onAuthStateChanged:   ❌ Error fetching user profile from firestore:",
            error
          );
        }
      } else {
        setUser({ email: null, uid: null });
        console.log(
          "🎯event_log:  🔑authProvider/onAuthStateChanged:   ⚠ The user context has been set to null"
        );
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * ✅ HANDLE REGISTER NEW USER - Registers a new user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<{ result?: any, error?: any }>} A Promise with the registration result or error.
   */
  const register = async (email: string, password: string) => {
    console.log("🎯event_log:  🔑authProvider/register:  💢 Triggered");

    try {
      console.log(
        "🎯event_log:  🔑authProvider/register:  Creating new user account in firebase/auth"
      );
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user) {
        console.log(
          "🎯event_log:  🔑authProvider/register:  Creating new user document in firestore/users"
        );

        try {
          // - Create a new user document in firebase
          createUserDataProcess(user.uid, {
            uuid: user.uid,
            email: email,
          });
        } catch (creationError) {
          console.error(
            "🎯event_log:  🔑authProvider/register:  ❌ Error creating user document:",
            creationError
          );
          // Handle creation error here (retry or handle it as needed)
        }
      }
      // - Return user on successful registration
      console.log(
        "🎯event_log:  🔑authProvider/register:  ✔ successfully registered user "
      );
      return { result: user };
    } catch (registrationError) {
      // - Return error if registration fails
      console.error(
        "🎯event_log:  🔑authProvider/register:  ❌ error registering user:",
        registrationError
      );

      return { error: registrationError };
    }
  };

  /**
   * ✅ HANDLE USER LOGIN - Logs in a user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} A Promise that resolves once the login process completes.
   */
  const logIn = async (email: string, password: string) => {
    console.log("🎯event_log:  🔑authProvider/login:  💢 Triggered ");
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        console.log(
          "🎯event_log:  🔑authProvider/login:   Updating user login time"
        );

        try {
          updateUserLoginTime(user.uid);
          return { result: user };
        } catch (updateError: any) {
          console.error(
            "🎯event_log:  🔑authProvider/login:  ❌ Error occurred during lastLogin update:",
            updateError.message
          );
        }
      } else {
        console.log(
          "🎯event_log:  🔑authProvider/login:  ❌ User not found during login"
        );
      }
    } catch (loginError: any) {
      console.error(
        "🎯event_log:  🔑authProvider/login:  ❌ Error occurred during login:",
        loginError.message
      );
    }
  };

  /**
   * ✅ HANLDE USER LOGOUT - Logs out the current user.
   * @returns {Promise<void>} A Promise that resolves once the logout process completes.
   */
  const logOut = async () => {
    console.log("🎯event_log:  🔑authProvider/logout:    💢 Triggered ");
    setUser({ email: null, uid: null });
    return await signOut(auth);
  };

  const authContextValue: AuthContextProps = {
    user,
    register,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? (
        <div className="h-screen w-screen bg-primary flex items-center justify-center space-y-4">
          <Spinner size="screen" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
