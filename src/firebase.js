// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAmWgEnZys4WmogJ5uKPH_QLKIKXcXAhQ8",
    authDomain: "blinkit-65963.firebaseapp.com",
    projectId: "blinkit-65963",
    storageBucket: "blinkit-65963.appspot.com",
    messagingSenderId: "277618776217",
    appId: "1:277618776217:web:53eac6c23a88428b5e8008",
    measurementId: "G-J51HH7RB1R"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAmWgEnZys4WmogJ5uKPH_QLKIKXcXAhQ8",
//   authDomain: "blinkit-65963.firebaseapp.com",
//   projectId: "blinkit-65963",
//   storageBucket: "blinkit-65963.appspot.com",
//   messagingSenderId: "277618776217",
//   appId: "1:277618776217:web:53eac6c23a88428b5e8008",
//   measurementId: "G-J51HH7RB1R"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// npm install firebase

// npm install -g firebase-tools

// firebase login
// firebase init
// firebase deploy