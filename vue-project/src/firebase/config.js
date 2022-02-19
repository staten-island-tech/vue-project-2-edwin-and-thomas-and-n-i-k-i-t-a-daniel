import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ref, onUnmounted } from "vue";

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

// init firestore
const db = getFirestore();

const usersCollection = collection(db, "users");

// helpful functions
export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user);
};

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete();
};

export const useLoadUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return users;
};

export { auth, db };
