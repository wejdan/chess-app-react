// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOFNxCsyZNxvA6jd4XhkuVC93rj6kb1Yo",
  authDomain: "chess-app-d61f0.firebaseapp.com",
  projectId: "chess-app-d61f0",
  storageBucket: "chess-app-d61f0.appspot.com",
  messagingSenderId: "631056331207",
  appId: "1:631056331207:web:2fbc6ab32470a216dd29e2",
  measurementId: "G-5WLG8VWCSF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const database = getDatabase(app);
