// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyE5433H97x0Zac9o0iNqGYrUhV2E9S0g",
  authDomain: "node-api-rest-166ce.firebaseapp.com",
  projectId: "node-api-rest-166ce",
  storageBucket: "node-api-rest-166ce.firebasestorage.app",
  messagingSenderId: "689685588836",
  appId: "1:689685588836:web:af088dc03f814a7fac6871"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };