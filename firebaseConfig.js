// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfJbNQwlKmU3KiPRWmULioZqUMK9mLLVI",
  authDomain: "legasync-b31c2.firebaseapp.com",
  projectId: "legasync-b31c2",
  storageBucket: "legasync-b31c2.appspot.com",
  messagingSenderId: "483040694064",
  appId: "1:483040694064:web:c58bee05492210067542f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };