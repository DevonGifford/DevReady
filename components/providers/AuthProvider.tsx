import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/utils/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { Spinner } from "../Spinner";

interface UserType {
  email: string | null;
  uid: string | null;
}

// 👇 Create auth context and make available accross the app
const AuthContext = createContext({});
export const useAuth = () => useContext<any>(AuthContext);


// 👇 Create the auth context provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //- Define the constants for the user and loading state
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<Boolean>(true);

  //👇 Update the state depending on auth
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

  //- Register new user
  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //- Login the user
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //- Logout the user
  const logOut = async () => {
    setUser({ email: null, uid: null });
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, register, logIn, logOut }}>
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
