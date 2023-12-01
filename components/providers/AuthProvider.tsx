import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/utils/firebase/firebaseConfig";
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
} from "@/utils/firestore/userCollectionUtils";

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

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<Boolean>(true);

  // ✅ UPDATING AUTH-STATE ON AUTH CHANGE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  // ✅ HANDLE REGISTER NEW USER
  const register = async (email: string, password: string) => {
    console.log(
      "🎯event_log:  🔑authProvider/register:  Registration process triggered ⚡ "
    );

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
          console.log(
            "🎯event_log:  🔑authProvider/register: Document data - ",
            "  user.uid: ",
            user.uid,
            "  email:  ",
            email
          );

          // - Create a new user document in firebase
          createUserDataProcess(user.uid, {
            uuid: user.uid,
            email: email,
          });
        } catch (creationError) {
          console.error(
            "🎯event_log:  🔑authProvider/register:  Error creating user document:",
            creationError
          );
          // Handle creation error here (retry or handle it as needed)
        }
      }

      // - Return user on successful registration
      return { result: user };
    } catch (registrationError) {
      console.error(
        "🎯event_log:  🔑authProvider/register:  Error registering user:",
        registrationError
      );

      // - Return error if registration fails
      return { error: registrationError };
    }
  };

  // ✅ HANDLE USER LOGIN
  const logIn = async (email: string, password: string) => {
    console.log(
      "🎯event_log:  🔑authProvider/login:   Login process triggered "
    );
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        console.log(
          "🎯event_log:  🔑authProvider/login:   Updating user login time"
        );
        const lastLogin = new Date().toISOString();

        try {
          updateUserLoginTime(user.uid);
          return { result: user };
        } catch (updateError: any) {
          console.error(
            "🚫 Error occurred during lastLogin update:",
            updateError.message
          );
          // 🎯to-do-list: Return specific error message for update error 🤔
          // return { error: updateError.message };
        }
      } else {
        console.log(
          "🎯event_log:  🔑authProvider/login:  User not found during login"
        );
        // 🎯to-do-list: Return error message if user object is null 🤔
        // return { error: "User not found" };
      }
    } catch (loginError: any) {
      console.error("🚫 Error occurred during login:", loginError.message);
      // 🎯to-do-list: Return specific error message for login error 🤔
      // return { error: loginError.message };
    }
  };

  // ✅ HANLDE USER LOGOUT
  const logOut = async () => {
    console.log(
      "🎯event_log:  🔑authProvider/logout:  Logout process triggered "
    );
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
