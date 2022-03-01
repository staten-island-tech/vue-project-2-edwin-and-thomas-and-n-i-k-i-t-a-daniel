<template>
  <main>
    <!-- <TheWelcome/> -->
    <div v-for="post in store.state.posts" :key="post.name">
      <h2>{{ post.title }}</h2>
      <h3>by {{ resolvePromise(getAuthor(post.author)) }}</h3>
      <p>{{ post.content }}</p>
    </div>
  </main>
</template>

<script setup>
  import { doc, getDoc } from "firebase/firestore";
  import { auth, db } from '../firebase/config'
  import { useStore } from 'vuex'
  const store = useStore()
  store.dispatch("getPosts")

  const getAuthor = async(uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    let author = docSnap.data().dname
    return author
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

</script>

<style scoped>

</style>