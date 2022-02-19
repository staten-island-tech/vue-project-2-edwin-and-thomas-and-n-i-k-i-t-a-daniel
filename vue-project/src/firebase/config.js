import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgk-Qx8FBYTH0PduOhJys3a18rwCiipG8",
  authDomain: "review-site-db.firebaseapp.com",
  projectId: "review-site-db",
  storageBucket: "review-site-db.appspot.com",
  messagingSenderId: "434204855536",
  appId: "1:434204855536:web:55926a22561711817c0635",
  measurementId: "G-KXBQWCCHSK",
};

// init firebase
initializeApp(firebaseConfig);

// init firebase auth
const auth = getAuth();

export { auth };
