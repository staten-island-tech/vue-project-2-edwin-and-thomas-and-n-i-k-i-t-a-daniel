import { createStore } from "vuex";

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
  increment,
} from "firebase/firestore";

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    posts: [],
    comments: [],
    viewingProfile: null,
    upvotes: [],
    downvotes: [],
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
    addUpvote(state, payload) {
      state.upvotes.push(payload);
    },
    addDownvote(state, payload) {
      state.downvotes.push(payload);
    },
    removeUpvote(state, payload) {
      const index = state.upvotes.findIndex((element) => element === payload);
      state.upvotes.splice(index, 1);
    },
    removeDownvote(state, payload) {
      const index = state.downvotes.findIndex((element) => element === payload);
      state.downvotes.splice(index, 1);
    },
    clearVotes(state) {
      state.upvotes = [];
      state.downvotes = [];
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
        context.commit("setUser", res.user);
        // creates an entry in firestore under users/{user's uid} // later use setDoc with merge to add other stuff
        await setDoc(doc(db, "users", res.user.uid), {
          dname: dname,
          posts: [],
          comments: [],
          picture: `https://avatars.dicebear.com/api/personas/:${res.user.uid}.svg`,
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
    async createPost(context, { title, content, imageLink, tags }) {
      console.log("create post action");
      const docData = {
        author: {
          uid: this.state.user.uid,
          dname: this.state.user.displayName,
        },
        content: content,
        title: title,
        imageLink: imageLink,
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
    async deleteComment(context, { commentID, postID }) {
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
    async changePicture(context, pictureLink) {
      const userRef = doc(db, "users", this.state.user.uid);
      console.log(pictureLink);
      await updateDoc(userRef, {
        picture: `${pictureLink.picture}`,
      });
    },
    async vote(context, { targetID, type, value }) {
      const docRef = doc(db, type, targetID);
      const userRef = doc(db, "users", this.state.user.uid);
      await updateDoc(docRef, {
        // increments post/comment's score
        score: increment(value),
      });
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      const authorRef = doc(db, "users", docData.author.uid);

      await updateDoc(authorRef, {
        // increments author's karma
        karma: increment(value),
      });

      if (value == 1) {
        updateDoc(doc(db, "users", this.state.user.uid), {
          upvotes: arrayUnion(docRef.id),
        });
        context.commit("addUpvote", docRef.id);
      } else if (value == -1) {
        updateDoc(doc(db, "users", this.state.user.uid), {
          downvotes: arrayUnion(docRef.id),
        });
        context.commit("addDownvote", docRef.id);
      }
    },
    async unvote(context, { targetID, type, value }) {
      const docRef = doc(db, type, targetID);
      const userRef = doc(db, "users", this.state.user.uid);
      await updateDoc(docRef, {
        // increments post/comment's score
        score: increment(-value),
      });
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      const authorRef = doc(db, "users", docData.author.uid);

      await updateDoc(authorRef, {
        // increments author's karma
        karma: increment(-value),
      });

      if (value === 1) {
        await updateDoc(userRef, {
          // removes post from user's list of upvotes
          upvotes: arrayRemove(targetID),
        });
        context.commit("removeUpvote", targetID);
      } else if (value === -1) {
        // removes post from user's list of downvotes
        await updateDoc(userRef, {
          downvotes: arrayRemove(targetID),
        });
        context.commit("removeDownvote", targetID);
      }
    },
    async getVotes(context) {
      context.commit("clearVotes");

      const userRef = doc(db, "users", this.state.user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      userData.upvotes.forEach((upvote) => {
        if (!this.state.upvotes.includes(upvote))
          context.commit("addUpvote", upvote);
      });
      userData.downvotes.forEach((downvote) => {
        if (!this.state.downvotes.includes(downvote))
          context.commit("addDownvote", downvote);
      });
    },
    async sortPosts(context, order) {
      let posts = this.state.posts;
      if (order === "ascending")
        posts.sort(function (post1, post2) {
          return post2.score - post1.score;
        });
      if (order === "descending")
        posts.sort(function (post1, post2) {
          return post1.score - post2.score;
        });
      console.log(posts);
      context.commit("clearPosts");
      posts.forEach((post) => {
        context.commit("addPost", post);
      });
      console.log(this.state.posts);
    },
    async editPost(context, { title, content, imageLink, tags }) {},
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
