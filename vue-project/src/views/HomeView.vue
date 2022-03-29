<template>
  <main>  
    <div class="posts">
    <div v-for="post in store.state.posts" :key="post.name" class="post">
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="headerEnter"
      > 
        <h2 @click="postClick(post.id)" class="clickable">{{ post.title }}</h2> 
      </transition>
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="subtextEnter"
      > 
        <h4 @click="userClick(post.author.uid)" class="clickable">by {{ post.author.dname }}</h4>
      </transition>
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="bodyEnter"
      > 
        <p v-html="post.description"></p>
      </transition>
    </div>
    </div>
  </main>
</template>

<script setup>
import { useStore } from 'vuex' 
import gsap from 'gsap'
import { useRouter } from 'vue-router';
const store = useStore();  
const router = useRouter()
store.dispatch("getPosts");
const postClick = (postID) => {
  router.push(`/post/${postID}`)
}
const userClick = (userID) => {
  router.push(`/user/${userID}`)
}
</script>


<style scoped>
main{
  display: flex;
  justify-content: center;
  flex-flow: wrap;
}
.post{
  background-color: #724949;
  width: 83vw;
  height: 25vh;
  margin: 3rem;
  color: white;
}
.post h2,h4,p{
  margin: .5rem
}
.post p{
  font-size: 2rem;
}
.posts{
  margin-top: 8rem;
  width: inherit;
  height: inherit;
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
.clickable {
  cursor: pointer;
  width: fit-content
}
</style>