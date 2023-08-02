import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// - Firebase Typing System
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

// - Initialize Firebase
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

//- Auth exports
auth = getAuth(app);
const provider = new EmailAuthProvider();

//- Firestore exports
db = getFirestore(app);

//- Storage exports
storage = getStorage(app);

export { provider, auth, storage };
export default db;
