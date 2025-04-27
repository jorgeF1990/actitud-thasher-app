// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDatwrPC01nVF2ruUVrcyxcZG2b5mzSfEc",
    authDomain: "ecomerce-c0f9d.firebaseapp.com",
    projectId: "ecomerce-c0f9d",
    storageBucket: "ecomerce-c0f9d.firebasestorage.app",
    messagingSenderId: "527922290496",
    appId: "1:527922290496:web:42928030ee70fbd587a4a5",
    measurementId: "G-HXJ9PR4DK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);