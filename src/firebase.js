// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL5AlOCiOfePHkxCGY8hIXj7cFd6XjE_s",
  authDomain: "reactapp-7bd29.firebaseapp.com",
  databaseURL: "https://reactapp-7bd29-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reactapp-7bd29",
  storageBucket: "reactapp-7bd29.firebasestorage.app",
  messagingSenderId: "715175720580",
  appId: "1:715175720580:web:87fa5518e6dacadd58f4d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);