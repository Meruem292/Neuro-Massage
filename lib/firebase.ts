import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Safe access to environment variables
const getEnv = () => {
  try {
    return (import.meta as any).env || {};
  } catch {
    return {};
  }
};

const env = getEnv();

// Default config that might be invalid if keys are restricted/deleted
const firebaseConfig = {
  apiKey: "AIzaSyAEDvHfoKTJWBWy3a1izSUekv-pzjtUcOM",
  authDomain: "pillowease-32001.firebaseapp.com",
  databaseURL: "https://pillowease-32001-default-rtdb.firebaseio.com",
  projectId: "pillowease-32001",
  storageBucket: "pillowease-32001.firebasestorage.app",
  messagingSenderId: "396099994176",
  appId: "1:396099994176:web:5a77904991a93626a415a5",
  measurementId: "G-QVDC43EHX7"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  // Initialize Firebase only if it hasn't been initialized yet
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Fallback mock objects to prevent app crash
  app = {} as FirebaseApp;
  auth = {
    currentUser: null,
  } as unknown as Auth;
  db = {} as Firestore;
}

export { auth, db };