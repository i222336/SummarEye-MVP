// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9PtpbBcTf2arfkZkLmSk2VJL72_VY3HU",
  authDomain: "summareye-mvp.firebaseapp.com",
  projectId: "summareye-mvp",
  storageBucket: "summareye-mvp.firebasestorage.app",
  messagingSenderId: "575424864207",
  appId: "1:575424864207:web:adadc2af35f1d659a23cba",
  measurementId: "G-331QPBGLRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);