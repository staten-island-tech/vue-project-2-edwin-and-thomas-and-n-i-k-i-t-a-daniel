<template>
  <main>  
    <div v-for="post in store.state.posts" :key="post.name" class="post">
      <transition
      appear
      @before-enter="beforeEnter"
      @enter="headerEnter"
      > 
      <h2>{{ post.title }}</h2> 
      </transition>
        <transition
      appear
      @before-enter="beforeEnter"
      @enter="subtextEnter"
      > 
      <h4>by <router-link :to="`/user/${post.author.uid}`">{{ post.author.dname }}</router-link></h4> 
        </transition>
       <transition
      appear
      @before-enter="beforeEnter"
      @enter="bodyEnter"
      > 
      <p>{{ post.content }}</p>
       </transition>
    </div>
  </main>
</template>

<script setup>
  import { useStore } from 'vuex' 
  import gsap from 'gsap'
  const store = useStore();  
  store.dispatch("getPosts");
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
       setTimeout(
        function() {gsap.to(el,{
          duration: 2,
          opacity: 1,
        })}, 1000)
      }  
      const subtextEnter = (el) => {
       setTimeout(
        function() {gsap.to(el,{
          duration: 2,
          opacity: 1,
        })}, 750)
      }  
</script>


<style scoped>

</style>