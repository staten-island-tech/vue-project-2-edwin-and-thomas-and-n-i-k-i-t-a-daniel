<template>
  <main>
    <transition-group>
    <!-- lint says error but it's fine dw -->
    <div class="postContainer" v-if="user">
    <PostPreview  v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" :imageLink="post.imageLink" />  
    </div>
    <div v-if="!user">
      <h2 class="message">Please sign in to view posts</h2>
    </div>
    </transition-group>
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
}

.message{
  padding-top: 15rem;
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>