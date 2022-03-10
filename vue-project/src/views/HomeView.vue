<template>
  <main>
    <div v-for="post in store.state.posts" :key="post.name">
      <h2>{{ post.title }}</h2>
      <h4>by <router-link :to="`/user/${post.author.uid}`">{{ post.author.dname }}</router-link></h4> 
      <p v-html="post.content"></p>
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
  box-sizing: border-box;
}
div {
  background: #724949;
  margin-top: 9.5rem;
  color: white;
  width: 120rem;
  height: 15rem;

}
a {
  color:white;
  font-size: 1.8rem
}
h2 {
  font-size: 4.8rem;
}
h4 {
  font-size: 1.8rem
}
p{
  font-size: 1.4rem;
}
</style>