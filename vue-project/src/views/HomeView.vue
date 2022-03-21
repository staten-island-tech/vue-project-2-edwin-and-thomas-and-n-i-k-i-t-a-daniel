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
      <p v-html="post.content"></p>
       </transition>
    </div>
  </main>
</template>

<script setup>
// import showDropdown from '../components/navBar'
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
</style>