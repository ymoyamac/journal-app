// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA53MusA6W7-2RM-CVHgoeeXhSCYVrfR6U",
  authDomain: "journal-app-react-92c11.firebaseapp.com",
  projectId: "journal-app-react-92c11",
  storageBucket: "journal-app-react-92c11.appspot.com",
  messagingSenderId: "101210090328",
  appId: "1:101210090328:web:0990be758efb9b6ec2132d",
  measurementId: "G-KK1F659SPF"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);