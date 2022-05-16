<template>
    <div class="post">
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="headerEnter"
      > 
    
      </transition>    
      <h2 @click="postClick(id)" class="clickable">{{ title }}</h2> 
      <img v-bind:src="imageLink" alt="postImage" class="postImage centered" v-if="imageLink != null" onerror="this.onerror=null;this.src='/src/assets/imageNotFound.svg';">
      <img v-else src="/src/assets/imageNotFound.svg" class="nullImage centered">
      <transition-group
        appear
        @before-enter="beforeEnter"
        @enter="bodyEnter"
      >
        <p class="description clickable" @click="postClick(id)">{{ description }}</p>
        <h4 @click="userClick(author.uid)" class="clickable centered">by {{ author.dname }}</h4>
   
</transition-group> 
</div> 
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import gsap from 'gsap'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const user = computed(() => store.state.user)

const props = defineProps({
    title: String,
    author: Object,
    description: String,
    id: String,
    imageLink: String,
})

const postClick = (postID) => {
  router.push(`/post/${postID}`)
}
const userClick = (userID) => {
  router.push(`/user/${userID}`)
}
const beforeEnter = (el) => {
  el.style.opacity = 0
}
const bodyEnter = (el) => {
 gsap.to(el,{
    duration:1.75,
    opacity:1,
  })
}  

</script>

<style scoped>
.post{
  display: grid;
  grid-template-columns: 3fr 1fr;
  background-color: #724949;
  width: 73vw;
  max-height: 45vh;
  margin: 3rem;
  color: white;
  border-radius: 1rem;
  padding: 3rem;
}
.post h2,h4,p{
  margin: .5rem
}
.post p{
  font-size: 2rem;
}
.clickable {
  cursor: pointer;
  width: fit-content;
}
.centered{
  margin: auto;
}
.postImage{
  max-height: 20vh;
  border-radius: 1.5rem;
  margin: 1rem auto;
}
.nullImage{
  margin: 1rem auto;
}
/* Phones */
@media (max-width: 400px) {
  h2 {
    font-size: 3rem;
  }
  p {
    display: none;
  }
  .post {
    height: fit-content;
  }

}
</style>