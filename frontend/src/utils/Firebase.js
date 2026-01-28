import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginonecart-64986.firebaseapp.com",
  projectId: "loginonecart-64986",
  storageBucket: "loginonecart-64986.firebasestorage.app",
  messagingSenderId: "128273090103",
  appId: "1:128273090103:web:f50d903999a5323719e1b2"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}