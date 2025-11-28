import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Safe access to environment variables
const getEnv = () => {
  try {
    return (import.meta as any).env || {};
  } catch {
    return {};
  }
};

const env = getEnv();

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

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase initialized successfully");

export { auth, db };