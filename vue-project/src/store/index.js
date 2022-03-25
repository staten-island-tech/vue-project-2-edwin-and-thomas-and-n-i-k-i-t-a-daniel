import { createStore } from "vuex";

// firebase imports
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    posts: [],
    viewingProfile: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log("user state changed:", state.user);
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    addPost(state, payload) {
      state.posts.push(payload);
    },
    clearPosts(state) {
      state.posts = [];
    },
    setViewing(state, payload) {
      state.viewingProfile = payload;
      console.log("viewing user:", payload);
    },
  },
  actions: {
    async signup(context, { email, password, dname }) {
      console.log("signup action");
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.dname === dname) {
          throw new Error("Display name already taken");
        }
      });
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        updateProfile(res.user, { displayName: dname });
        context.commit("setUser", res.user);
        // creates an entry in firestore under users/{user's uid} // later use setDoc with merge to add other stuff
        await setDoc(doc(db, "users", res.user.uid), {
          dname: dname,
        });
      } else {
        throw new Error("could not complete signup");
      }
    },
    async login(context, { email, password }) {
      console.log("login action");

      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("could not complete login");
      }
    },
    async logout(context) {
      console.log("logout action");
      await signOut(auth);
      context.commit("setUser", null);
    },
    async getPosts(context) {
      console.log("get posts action");
      context.commit("clearPosts");
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        context.commit("addPost", doc.data());
      });
    },
    async getViewingProfile(context, uid) {
      context.commit("setViewing", null);
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      context.commit("setViewing", docSnap.data());
      context.dispatch("getProfilePosts");
    },
    async createPost(context, { title, description, content }) {
      console.log("create post action");
      const docData = {
        author: {
          uid: this.state.user.uid,
          dname: this.state.user.displayName,
        },
        content: content,
        description: description,
        title: title,
      };
      const docRef = await addDoc(collection(db, "posts"), docData);
      await setDoc(
        doc(db, "posts", docRef.id),
        { id: docRef.id },
        { merge: true }
      );
      const postRef = doc(db, "users", this.state.user.uid);
      await updateDoc(postRef, {
        posts: arrayUnion(docRef.id),
      });
    },
    async getProfilePosts(context) {
      context.commit("clearPosts");
      const postIds = this.state.viewingProfile.posts;
      postIds.forEach(async (postId) => {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);
        context.commit("addPost", docSnap.data());
        console.log("docRef", docRef);
      });
    },
    async getSinglePost(context, id) {
      context.commit("clearPosts");
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      context.commit("addPost", docSnap.data());
    },
    async postComment(context, { content, id }) {
      const docData = {
        author: {
          uid: this.state.user.uid,
          dname: this.state.user.displayName,
        },
        content: content,
        post: id,
      };
      const docRef = await addDoc(collection(db, "comments"), docData);
      await setDoc(
        doc(db, "comments", docRef.id),
        { id: docRef.id },
        { merge: true }
      );
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        comments: arrayUnion(docRef.id),
      });
      const userRef = doc(db, "users", this.state.user.uid);
      await updateDoc(userRef, {
        comments: arrayUnion(docRef.id),
      });
    },
    async searchPosts(context, search) {
      context.commit("clearPosts");
      const titleSearch = await getDocs(query(collection(db, "posts"), where(`title`, "==", `${search.search}`)))//https://cloud.google.com/firestore/docs/query-data/queries#query_operators desperatly needs .toLowerCase and .includes type things
      const contentSearch = await getDocs(query(collection(db, "posts"), where(`content`, "==", `${search.search}`))) // content has paragraph tags so it doesnt work for now
      const descriptionSearch = await getDocs (query(collection(db, "posts"), where(`description`, "==", `${search.search}`)))
      if (descriptionSearch === titleSearch || contentSearch === titleSearch) {
        titleSearch.forEach((doc) => {
          context.commit("addPost", doc.data());
        }); 
      }
      else if (descriptionSearch === contentSearch) {
        descriptionSearch.forEach((doc) => {
          context.commit("addPost", doc.data());
        });
      }
      else {
        contentSearch.forEach((doc) => {
          context.commit("addPost", doc.data());
        });
      }
    }
  },
});

// wait until auth is ready
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setUser", user);
  unsub();
});

// export the store
export default store;
