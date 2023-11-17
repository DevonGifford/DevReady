import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const logoutUser = async (): Promise<void> => await signOut(auth);