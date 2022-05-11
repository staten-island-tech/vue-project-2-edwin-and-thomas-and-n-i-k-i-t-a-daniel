<template>
    <div class="post">
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="headerEnter"
      > 
        <h2 @click="postClick(id)" class="clickable">{{ title }}</h2> 
      </transition>
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="subtextEnter"
      > 
        <h4 @click="userClick(author.uid)" class="clickable">by {{ author.dname }}</h4>
      </transition>
      <img v-bind:src="imageLink" alt="postImage" class="postImage" v-if="imageLink != null" onerror="this.onerror=null;this.src='/src/assets/imageNotFound.svg';">
      <img v-else src="/src/assets/imageNotFound.svg" class="nullImage">
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
const headerEnter = (el) => {
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
.post{
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  grid-template-rows: 3fr 1fr;
  border-style:  solid none none none;
  border-color: #724949;
  width: 75vw;
  max-height: 15vh;
  margin: 5rem;
  color: black;
  padding: 3rem;
}
.post h2,h4{
  margin: .5rem
}
.post h2{
  font-size: 3.9rem;
}
.clickable {
  cursor: pointer;
  width: fit-content;
  margin: auto;
}
.postImage{
  max-height: 7vh;
  border-radius: .5rem;
  margin: 1rem auto;
}
.nullImage{
  margin: 1rem auto;
  max-height: 7vh;
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