// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_L4SI-Jbov-mWkfmMomDRKy5pyuM9t_M",
  authDomain: "tiimz-13e19.firebaseapp.com",
  databaseURL: "https://tiimz-13e19-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tiimz-13e19",
  storageBucket: "tiimz-13e19.appspot.com",
  messagingSenderId: "840661187475",
  appId: "1:840661187475:web:4c8f7f18858581d03d0666"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
const database = getDatabase(app);