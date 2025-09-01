// client.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8aACiuYGf-Y4WSSUH0iu9QeVZUVQrLCo",
  authDomain: "mediamind-ml-360.firebaseapp.com",
  projectId: "mediamind-ml-360",
  storageBucket: "mediamind-ml-360.firebasestorage.app",
  messagingSenderId: "911344003007",
  appId: "1:911344003007:web:9b998aaa318d55df84630a",
  measurementId: "G-ZRWXG0XZQR"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
