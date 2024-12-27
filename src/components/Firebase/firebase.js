import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyAqk7GHrWCEXMvSMCoS4d5F_n8-uvBl9xM",
//     authDomain: "insta-99510.firebaseapp.com",
//     projectId: "insta-99510",
//     storageBucket: "insta-99510.firebasestorage.app",
//     messagingSenderId: "101621219077",
//     appId: "1:101621219077:web:4155b4318118ec95a7c16c",
//     measurementId: "G-6N3JX65YKM"
// };

const firebaseConfig = {
    apiKey: "AIzaSyDH6_i3RdLeROFSrMtKmjfZL4hjBPPBos0",
    authDomain: "adminpanel-48640.firebaseapp.com",
    projectId: "adminpanel-48640",
    storageBucket: "adminpanel-48640.appspot.com",
    messagingSenderId: "161641263870",
    appId: "1:161641263870:web:9b4026a1115d05de53abaf",
    measurementId: "G-ZMRMQ5JTK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, auth, firestore, storage };