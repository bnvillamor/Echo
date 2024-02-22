// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7NjV-paeigm7f2Zfuop4lpcn5gjg6bgQ",
  authDomain: "echo-afcec.firebaseapp.com",
  projectId: "echo-afcec",
  storageBucket: "echo-afcec.appspot.com",
  messagingSenderId: "982372416851",
  appId: "1:982372416851:web:cd3b1c9d3db696a09cb5a6",
  measurementId: "G-03BJGSWYXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth};