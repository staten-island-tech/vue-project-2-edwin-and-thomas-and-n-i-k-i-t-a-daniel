<template>
  <main>
    <div v-for="post in store.state.posts" :key="post.name">
      <h2>{{ post.title }}</h2>
      <router-link :to="`/user/${post.author.uid}`">by {{ post.author.dname }}</router-link>
      <p>{{ post.content }}</p>
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