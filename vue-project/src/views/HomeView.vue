<template>
  <main>
    <div v-for="post in store.state.posts" :key="post.name">
      <h2>{{ post.title }}</h2>
      <h4>by <router-link class="profile-link" :to="`/user/${post.author.uid}`">{{ post.author.dname }}</router-link></h4> 
      <p v-html="post.description"></p>
    </div>
  </main>
</template>

<script setup>
  import { useStore } from 'vuex'
  const store = useStore()
  store.dispatch("getPosts")
</script>

<style scoped>
body {
  display: flex;
  padding: 0;
  position: relative;
  box-sizing: border-box;
}
div {
  background: #724949;
  margin-top: 9.5rem;
  color: white;
  width: 120rem;
  height: 15rem;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0rem 1.5rem 7rem -3rem black;
}
a {
  color:white;
  font-size: 1.8rem;
}
h2 {
  font-size: 4.8rem;
  margin-left: 1rem;
}
h4 {
  font-size: 1.8rem;
  margin-left: 1rem;
}
p{
  font-size: 1.4rem;
  margin-left: 1rem;
}
</style>