// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb5oa-MXNsnz__QIJMS474tFxIgVMVEaY",
  authDomain: "chat-app-hackprinceton.firebaseapp.com",
  projectId: "chat-app-hackprinceton",
  storageBucket: "chat-app-hackprinceton.appspot.com",
  messagingSenderId: "910971248708",
  appId: "1:910971248708:web:9db83d504cbc41894d1c11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)