import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRiAMBOelYqzWQL-OnBW_8aWAgDrIOrKs",
  authDomain: "blogs-web-acfc4.firebaseapp.com",
  projectId: "blogs-web-acfc4",
  storageBucket: "blogs-web-acfc4.firebasestorage.app",
  messagingSenderId: "98924252528",
  appId: "1:98924252528:web:a331b655f2b28638b793b5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);