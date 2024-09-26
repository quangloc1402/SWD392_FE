// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// just change config below to start
const firebaseConfig = {
  apiKey: "AIzaSyBYmYaayYgHH0IUY_F9C1ho1aX7naMlcg4",
  authDomain: "fedutoy.firebaseapp.com",
  projectId: "fedutoy",
  storageBucket: "fedutoy.appspot.com",
  messagingSenderId: "993544393754",
  appId: "1:993544393754:web:1144b8ed1c8a867f952da3",
  measurementId: "G-K6JZQHSTJC"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

export const ggProvider = new GoogleAuthProvider()