<template>
  <main>
    <div v-for="post in store.state.posts" :key="post.name" class="post">
      <h2 ref="post-title">{{ post.title }}</h2>
      <h4>by <router-link :to="`/user/${post.author.uid}`">{{ post.author.dname }}</router-link></h4> 
      <p ref="post-content">{{ post.content }}</p>
    </div>
  </main>
</template>

<script setup>
  import { useStore } from 'vuex'
  const store = useStore()
  store.dispatch("getPosts")
</script>
<script>
 import { gsap } from "gsap"
 const tl = gsap.timeline({ delay: 0.2 });
  tl.from(this.$refs.post-title, { opacity: 0, duration: 1.5 });
  tl.from(this.$refs.post-content, { opacity: 0, duration: 1.25 });
</script>
<style scoped>

</style>