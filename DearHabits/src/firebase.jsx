// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtzQtMwHUVZEASwAN7-hpMhjYY7mqeyjg",
  authDomain: "dearhabit-9f415.firebaseapp.com",
  projectId: "dearhabit-9f415",
  storageBucket: "dearhabit-9f415.appspot.com",
  messagingSenderId: "878749587559",
  appId: "1:878749587559:web:604f28c8ba52b1ec9c9cc2",
  measurementId: "G-X0YC2C1XLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);