import { createContext, useContext, useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { auth } from "@/utils/firebase/firebase.config";
import { Spinner } from "../Spinner";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  initializeUserDocument,
  updateUserLoginTime,
} from "@/utils/firebase/firestore.utils";

type UserType = {
  email: string | null;
  uid: string | null;
};

type RegistrationResult =
  | { success: true }
  | { success: false; error: FirebaseError | { message: string } };

type LoginResult =
  | { success: true; user: User }
  | { success: false; error: FirebaseError | { message: string } };

type AuthContextProps = {
  user: UserType | null;
  register: (email: string, password: string) => Promise<RegistrationResult>;
  logIn: (email: string, password: string) => Promise<LoginResult>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  register: async () => ({
    success: false,
    error: { message: "Not implemented" },
  }),
  logIn: async () => ({
    success: false,
    error: { message: "Not implemented" },
  }),
  logOut: async () => {},
});

export const useAuth = () => useContext<AuthContextProps>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setUser({
            email: user.email,
            uid: user.uid,
          });
        } else {
          setUser({ email: null, uid: null });
        }
      } catch (error) {
        console.error("✖ Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const register = async (
    email: string,
    password: string
  ): Promise<RegistrationResult> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // - Create a new user document in firebase
      initializeUserDocument(userCredential.user.uid, {
        uuid: userCredential.user.uid,
        email: email,
      });
      return { success: true };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return { success: false, error };
      } else {
        const unknownError = {
          message: "Unknown error during user registration",
        };
        return { success: false, error: unknownError };
      }
    }
  };

  const logIn = async (
    email: string,
    password: string
  ): Promise<LoginResult> => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (!user) {
        console.error("✖ User not found after login.");
        return {
          success: false,
          error: { message: "User not found after login." },
        };
      }

      updateUserLoginTime(user.uid);
      return { success: true, user };
    } catch (loginError: any) {
      console.error("✖ Error occurred during login:", loginError.message);
      return { success: false, error: loginError };
    }
  };

  const logOut = async () => {
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
