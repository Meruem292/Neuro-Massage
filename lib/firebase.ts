import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase, Database } from "firebase/database";

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
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyAEDvHfoKTJWBWy3a1izSUekv-pzjtUcOM", 
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "pillowease-32001.firebaseapp.com",
  databaseURL: env.VITE_FIREBASE_DATABASE_URL || "https://pillowease-32001-default-rtdb.firebaseio.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "pillowease-32001",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "pillowease-32001.appspot.com",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "396099994176",
  appId: env.VITE_FIREBASE_APP_ID || "1:396099994176:web:5a77904991a93626a415a5"
};

let app: FirebaseApp;
let auth: Auth;
let database: Database;

try {
  // We check if the config is valid (has at least an API key)
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase Config missing. Using mock services for UI testing.");
    throw new Error("Missing API Key");
  }

  // Initialize Firebase only if it hasn't been initialized yet
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  database = getDatabase(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.log("Running in offline/demo mode (Firebase not connected).");
  
  // Fallback mock objects to prevent app crash so you can see the UI
  app = {} as FirebaseApp;
  
  // Mock Auth
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: any) => {
        // Automatically sign out in mock mode to prevent confusion
        callback(null); 
        return () => {}; 
    },
    signOut: async () => console.log("Mock Sign Out"),
  } as unknown as Auth;

  // Mock Database
  database = {} as Database;
}

export { auth, database };