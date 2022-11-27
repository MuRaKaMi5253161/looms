// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBA-r1r6qmc9ZUGjjF37ddkcVSEiuVlVyY",
  authDomain: "looms-831f0.firebaseapp.com",
  projectId: "looms-831f0",
  storageBucket: "looms-831f0.appspot.com",
  messagingSenderId: "108535822700",
  appId: "1:108535822700:web:8f9b9a047ca59a0d5ddb49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
export const auth = getAuth(app);