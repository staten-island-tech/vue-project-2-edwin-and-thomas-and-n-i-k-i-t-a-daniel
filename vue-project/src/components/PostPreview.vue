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
        <h4 >by <span @click="userClick(author.uid)" class="clickable">{{ author.dname }}</span></h4>
      </transition>
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="bodyEnter"
      > 
        <p>{{ description }}</p>
      </transition>
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
    id: String
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
.clickable {
  cursor: pointer;
  width: fit-content
}
</style>