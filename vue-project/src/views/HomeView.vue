<template>
  <main>
    <!-- lint says error but it's fine dw -->
    <PostPreview v-if="user" v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" />  
    <div v-if="!user">
      <h2>Please sign in to view posts</h2>
    </div>
  </main>
</template>

<script setup>
import PostPreview from '../components/PostPreview.vue'
import { useStore } from 'vuex' 
import { computed } from '@vue/runtime-core';
const store = useStore();  
store.dispatch("getPosts");
const posts = computed(() => store.state.posts)
const user = computed(() => store.state.user)
</script>


<style scoped>
main {
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  margin-top: 8rem;
}
#overlay {
  background-color: rgba(0,0,0,0.5);
  position:fixed;
  left:0;
  top: 0;
  width:100%;
  height:100%;
  z-index: 1;
}
</style>