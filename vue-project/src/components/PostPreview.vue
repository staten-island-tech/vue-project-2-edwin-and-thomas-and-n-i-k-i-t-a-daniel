<template>
    <div class="post">
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="headerEnter"
      > 
        <h2 @click="postClick(id)" class="clickable">{{ title }}</h2> 
      </transition>
      <img v-bind:src="imageLink" alt="postImage" class="image" onerror="this.onerror=null;this.src='/src/assets/imageNotFound.svg';">
      <transition-group
        appear
        @before-enter="beforeEnter"
        @enter="bodyEnter"
      > 
        <div class="votes">
          <svg @click="upvote" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ selected: vote === 1 }">
            <path d="M5 19V8H1L8 1L15 8H11V19H5Z" stroke="#E08B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <svg @click="downvote" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ selected: vote === -1 }">
            <path d="M5 1H11V12H15L8 19L1 12H5V1Z" stroke="#E08B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </transition-group>
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="subtextEnter"
      > 
        <h4 @click="userClick(author.uid)" class="clickable">by {{ author.dname }}</h4>
      </transition>

    </div>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import gsap from 'gsap'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const router = useRouter()
const user = computed(() => store.state.user)
const upvotes = computed(() => store.state.upvotes)
const downvotes = computed(() => store.state.downvotes)

const vote = ref(0)

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

const upvote = async () => {
  console.log("upvote")
  if (vote.value == 0) {
    await store.dispatch('vote', { targetID: props.id, type: "posts", value: 1 })
    vote.value = 1
  } else if (vote.value == 1) {
    await store.dispatch('unvote', { targetID: props.id, type: "posts", value: 1 })
    vote.value = 0
  } else if (vote.value == -1) {
    await store.dispatch('unvote', { targetID: props.id, type: "posts", value: -1 })
    await store.dispatch('vote', { targetID: props.id, type: "posts", value: 1 })
    vote.value = 1
  }
}

const downvote = async () => {
  console.log("downvote")
  if (vote.value == 0) {
    await store.dispatch('vote', { targetID: props.id, type: "posts", value: -1 })
    vote.value = -1
  } else if (vote.value == -1) {
    await store.dispatch('unvote', { targetID: props.id, type: "posts", value: -1 })
    vote.value = 0
  } else if (vote.value == 1) {
    await store.dispatch('unvote', { targetID: props.id, type: "posts", value: 1 })
    await store.dispatch('vote', { targetID: props.id, type: "posts", value: -1 })
    vote.value = -1
  }
}

const getVotes = async () => {
  await store.dispatch('getVotes')
  if (upvotes.value.includes(props.id)) {
    vote.value = 1
  } else if (downvotes.value.includes(props.id)) {
    vote.value = -1
  }
}

getVotes()
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
  width: fit-content
}
h2 {
  height: fit-content
}
.selected {
  fill: #E08B8B
}
.votes svg{
  transform: scale(2);
  margin-right: 2rem;
  cursor: pointer;
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
.image{
  max-height: 20vh;
  border-radius: 1rem;
}
</style>