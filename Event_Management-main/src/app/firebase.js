// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Only import if using Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAVNsbGRYg1IELkpUeHC4yzC7dO9sWKbKw",
  authDomain: "event-4a554.firebaseapp.com",
  projectId: "event-4a554",
  storageBucket: "event-4a554.firebasestorage.app",
  messagingSenderId: "658984663094",
  appId: "1:658984663094:web:f1fe9cca4b73349a39c097"
};

// Initialize Firebase app (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services
const auth = getAuth(app);
const db = getFirestore(app); // Comment out if not using Realtime Database

export { app, auth, db }; // Remove firestore and database if not using them
