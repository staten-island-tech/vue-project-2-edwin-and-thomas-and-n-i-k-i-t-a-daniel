<template>
  <main>
    <!-- <TheWelcome/> -->
    <div v-for="post in store.state.posts" :key="post.name">
      <h2>{{  }}</h2>
    </div>
  </main>
</template>

<script setup>
  import TheWelcome from '../components/TheWelcome.vue';
  import { useStore } from 'vuex'
  const store = useStore()
  store.dispatch("getPosts")
</script>

<style scoped>

</style>