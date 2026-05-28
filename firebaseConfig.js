import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Paste your specific keys from the Firebase Console here:
const firebaseConfig = {
  apiKey: "AIzaSyCfmq-o0WmoToHmyN3GX-j3ZNFYDTo3e5g",
  authDomain: "spendwise-87795.firebaseapp.com",
  projectId: "spendwise-87795",
  storageBucket: "spendwise-87795.firebasestorage.app",
  messagingSenderId: "541877774535",
  appId: "1:541877774535:web:ba54bd1dd7f2b635ecf6e2"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);