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
<<<<<<< HEAD
      > 
        <Votes :key="id" :id="id" :type="'posts'"/>
      </transition-group>
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="subtextEnter"
      > 
        <h4 @click="userClick(author.uid)" class="clickable">by {{ author.dname }}</h4>
      </transition>

    </div>
=======
      >
        <p class="description clickable" @click="postClick(id)">{{ description }}</p>
        <h4 @click="userClick(author.uid)" class="clickable centered">by {{ author.dname }}</h4>
   
</transition-group> 
</div> 
>>>>>>> Wanderbranch
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import gsap from 'gsap'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Votes from '../components/Votes.vue'

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
<<<<<<< HEAD
  background-color: #764a4a;
=======
  background-color: var(--color-primary);
>>>>>>> Wanderbranch
  width: 73vw;
  max-height: 45vh;
  margin: 3rem;
  color: var( --color-light-text);
  border-radius: 1rem;
  padding: 3rem;
}
.post h2,h4,p{
  margin: .5rem
}
.post h2{
  height: fit-content;
}
.post p{
  font-size: 2rem;
}
.clickable {
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
  width: fit-content
}
h2 {
  height: fit-content
}
>>>>>>> 7b4cc29405a294a24474edad923b3eea2379907a
=======
.clickable:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--color-light-text);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.clickable:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
>>>>>>> Wanderbranch
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
  .image {
    display: none
  }

}
</style>