<template>
  <main>    
    <!-- <div class="viewButtons">
      <button @click="!viewClassic" class="button">Change View</button>
    </div> -->
    <transition-group>
    <DropdownSort v-if="user" />
    <div class="postContainer" v-if="user">
      <div class="postClassicContainer" v-if="viewClassic === true">
    <PostClassic   v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" :imageLink="post.imageLink" />  
    </div>
      <div class="postCardContainer" v-if="viewClassic !== true">
    <PostPreview   v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" :imageLink="post.imageLink" />  </div>
    </div>
    <div v-if="!user">
      <h2 class="message">Please sign in to view posts</h2>
    </div>
    </transition-group>
  </main>
</template>

<script setup>
import PostPreview from '../components/PostPreview.vue'
import PostClassic from '../components/PostClassic.vue'
import DropdownSort from '../components/DropdownSort.vue'
import { useStore } from 'vuex' 
import { computed } from '@vue/runtime-core';
const store = useStore();  
store.dispatch("getPosts");
const posts = computed(() => store.state.posts)
const user = computed(() => store.state.user)
const viewClassic = computed(()=> store.state.viewClassic)
</script>


<style scoped>
main {
  display: flex;
  justify-content: center;
  flex-flow: wrap;
}
.message{
  padding-top: 15rem;
  color: var(--color-contrast-text);
}
.viewButtons{
  padding-top: 15rem;
}
.button{
  width: 10rem;
  height: 4rem;
  font-size: 3rem;
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