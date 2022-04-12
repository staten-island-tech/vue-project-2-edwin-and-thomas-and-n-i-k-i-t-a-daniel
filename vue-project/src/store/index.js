import { createStore } from "vuex";
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/personas';

// firebase imports
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
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
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    posts: [],
    comments: [],
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
    clearComments(state) {
      state.comments = [];
    },
    addComment(state, payload) {
      state.comments.push(payload);
    },
  },
  actions: {
    async signup(context, { email, password, confirm, dname }) {
      console.log("signup action");
      if (confirm != password) {
        throw new Error("Passwords do not match");
      }
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
        let svg = createAvatar(style, {
          seed: '',
          // ... and other options
        });
        context.commit("setUser", res.user);
        // creates an entry in firestore under users/{user's uid} // later use setDoc with merge to add other stuff
        await setDoc(doc(db, "users", res.user.uid), {
          dname: dname,
          posts: [],
          comments: [],
          svgSource: svg
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
      context.dispatch("getProfileComments");
    },
    async createPost(context, { title, description, content, tags }) {
      console.log("create post action");
      const docData = {
        author: {
          uid: this.state.user.uid,
          dname: this.state.user.displayName,
        },
        content: content,
        description: description,
        title: title,
        comments: [],
        tags: tags,
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
      context.dispatch("getComments");
    },
    async postComment(context, { content, id }) {
      content = content.trim();
      if (content === "") {
        throw new Error("Comments cannot be empty");
      }
      const docData = {
        author: {
          uid: this.state.user.uid,
          dname: this.state.user.displayName,
        },
        content: content,
        post: id,
      };
      const docRef = await addDoc(collection(db, "comments"), docData);
      console.log("comment action firebase");
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
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        context.commit("addPost", doc.data());
      });
      const searchedPosts = this.state.posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(search.search.toLowerCase()) ||
          post.description
            .toLowerCase()
            .includes(search.search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.search.toLowerCase())
        );
      });
      const postsWithTags = this.state.posts.filter(
        (post) => post.tags && post.tags.length > 0
      );
      
      context.commit("clearPosts");
      console.log(this.state.posts);
      searchedPosts.forEach((post) => {
        context.commit("addPost", post);
        console.log(post);
      });
      postsWithTags.forEach((post) => {
        post.tags.forEach((tag) => {
          if (
            tag.toLowerCase().includes(search.search.toLowerCase()) &&
            !this.state.posts.includes(post)
          ) {
            context.commit("addPost", post);
            console.log("this post passes the filter:", post);
          } else {
            console.log("this post does not pass the filter", post);
          }
        });
      });
      console.log(searchedPosts);
      console.log(this.state.posts);
      console.log(postsWithTags);
    },
    async getProfileComments(context) {
      context.commit("clearComments");
      const commentIds = this.state.viewingProfile.comments;
      commentIds.forEach(async (commentId) => {
        const docRef = doc(db, "comments", commentId);
        const docSnap = await getDoc(docRef);
        context.commit("addComment", docSnap.data());
      });
    },
    async getComments(context) {
      context.commit("clearComments");
      const commentIds = this.state.posts[0].comments;
      commentIds.forEach(async (commentId) => {
        const docRef = doc(db, "comments", commentId);
        const docSnap = await getDoc(docRef);
        context.commit("addComment", docSnap.data());
      });
    },
    async deletePost(context, postID) {
      if (this.state.user.uid != this.state.posts[0].author.uid) {
        throw new Error("This is not your post to delete");
      } else if (this.state.posts[0].id != postID) {
        throw new Error("Trying to delete a post that you do not have open");
      } else {
        await deleteDoc(doc(db, "posts", postID)); // make it also delete the id references
        const userRef = doc(db, "users", this.state.user.uid);
        await updateDoc(userRef, {
          posts: arrayRemove(postID),
        });
      }
    },
    async deleteComment(context, {commentID, postID}) {
        await deleteDoc(doc(db, "comments", commentID));
        const postRef = doc(db, "posts", postID);
        await updateDoc(postRef, {
          comments: arrayRemove(commentID),
        });
        const userRef = doc(db, "users", this.state.user.uid);
        await updateDoc(userRef, {
          comments: arrayRemove(commentID),
        });
      },
    async passwordReset(context, email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("email sent to:", email);
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
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
