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

</style>