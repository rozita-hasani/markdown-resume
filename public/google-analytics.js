// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCq4qU5enY-0IPC2n2zh8qq6gzaQF5OW2U",
    authDomain: "resume-markdown.firebaseapp.com",
    projectId: "resume-markdown",
    storageBucket: "resume-markdown.firebasestorage.app",
    messagingSenderId: "890301825557",
    appId: "1:890301825557:web:3df05b9b8d720e4824841c",
    measurementId: "G-H4CNWM6V5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);