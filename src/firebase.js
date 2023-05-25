// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC84JdUv2_iBQwl-jh3Q-KB3sLeHYkltFA",
  authDomain: "hospital-management-6b160.firebaseapp.com",
  projectId: "hospital-management-6b160",
  storageBucket: "hospital-management-6b160.appspot.com",
  messagingSenderId: "848386388012",
  appId: "1:848386388012:web:e313eb3287c922d3656189"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
export {auth, db}

