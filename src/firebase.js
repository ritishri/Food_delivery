// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrcWQaYd961VFnU-TZHBlju9jIG71kuWI",
  authDomain: "fooddelivery-ritika.firebaseapp.com",
  projectId: "fooddelivery-ritika",
  storageBucket: "fooddelivery-ritika.firebasestorage.app",
  messagingSenderId: "796587627419",
  appId: "1:796587627419:web:b069bc36f4d8fb2d57073e",
  measurementId: "G-3BH5WPXEWF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication


// Export auth to be used in other files
export { auth };