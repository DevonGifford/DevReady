import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

// Function to sign in with email and password
export default async function login(email: string, password: string) {
  let result = null, // Variable to store the sign-in result
    error = null; // Variable to store any error that occurs

  try {
    result = await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-in
  }

  return { result, error }; // Return the sign-in result and error (if any)
}