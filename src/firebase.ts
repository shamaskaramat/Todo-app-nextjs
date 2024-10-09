// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyDCHykK2TjHq7vHPGoQLeC8YgVhpkFqBag",
//     authDomain: "todo-managment.firebaseapp.com",
//     projectId: "todo-managment",
//     storageBucket: "todo-managment.appspot.com",
//     messagingSenderId: "841310949147",
//     appId: "1:841310949147:web:823197f3863b43e4084dbe",
//     measurementId: "G-C0J7LT4LSE"
// };
// const firebaseConfig = {
//     apiKey: "AIzaSyDg_CT8m9tOXvdm4rC6DGhgVWbgltBYY-Y",
//     authDomain: "todo-app-2d00b.firebaseapp.com",
//     projectId: "todo-app-2d00b",
//     storageBucket: "todo-app-2d00b.appspot.com",
//     messagingSenderId: "460699361391",
//     appId: "1:460699361391:web:80effea64d270e121fed9a",
//     measurementId: "G-XL3PZJKXHJ"
// };
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const logout = () => signOut(auth);

export { auth, db };
