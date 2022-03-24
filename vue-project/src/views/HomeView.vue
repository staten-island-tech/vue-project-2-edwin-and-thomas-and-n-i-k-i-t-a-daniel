<template>
  <main>  
    
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
  </main>
</template>

<script setup>
// import showDropdown from '../components/navBar'
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

const beforeEnter = (el) => {
  console.log("test1");
  el.style.opacity = 0
}
const headerEnter = (el) => {
  console.log("test2");
  gsap.to(el,{
    duration:1.5,
    opacity:1,
  })
}
const bodyEnter = (el) => {
 gsap.to(el,{
    duration:1.75,
    opacity:1,
  })
}  
const subtextEnter = (el) => {
 gsap.to(el,{
    duration:2,
    opacity:1,
  })
}  
</script>


<style scoped>
main{
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  margin-top: 8rem;
}
.post{
  background-color: #724949;
  width: 83%;
  height: 25%;
  margin: 3rem;
  color: white;
}
.post h2,h4,p{
  margin: .5rem
}
.post p{
  font-size: 2rem;
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