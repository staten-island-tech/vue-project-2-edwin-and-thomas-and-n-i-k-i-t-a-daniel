<template>
    <div>
      <nav v-if="authIsReady">
        <img src="logo.svg" alt="Dropdown logo" @click="toggleDropdown">
        <router-link class="router" id="Home" to="/">HOME</router-link>

        <router-link class="router right" to="/signup" v-if="!user">SIGN UP</router-link>
        <router-link class="router right" to="/login" v-if="!user">LOGIN</router-link>
        <router-link class="router right" :to="`/user/${user.uid}`" v-if="user">PROFILE</router-link>
        <router-link v-if="user" class="router right" @click="handleClick" to="/">SIGN OUT</router-link>
      </nav>
      <transition-group
      appear
      @before-enter="beforeEnter"
      @enter="bodyEnter"
      @before-leave="beforeLeave"
      @leave="bodyLeave"
      > 
      <div v-if="showDropdown" class="dropdown" >
        <h2>Dropdown</h2>
        <h3>Options</h3>
      </div>
      <div id="overlay" v-if="showDropdown"></div>
      </transition-group>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import gsap from 'gsap';

const router = useRouter()
const store = useStore()
const handleClick = () => {
  store.dispatch('logout')
  router.push("/")
}
const user = computed(() => store.state.user)
const authIsReady = computed(() => store.state.authIsReady)
  const beforeEnter = (el) => {
        el.style.transform = 'translateX(-100%)'
      }
const bodyEnter = (el) => {
       {gsap.to(el,{
          duration: 1,
          opacity: 1,
          x: 0,
          ease: 'power2'
        })}
      }  
const beforeLeave = (el) => {
        el.style.transform = 'translateX(0)'
      }
const bodyLeave = (el) => {
       {gsap.to(el,{
          duration: 1,
          opacity: 1,
          x: -100,
          ease: 'power2'
        })}
      } 
</script>

<script> // this is just for the dropdown
export default {
  data() {
    return { showDropdown: false }
  },
  methods: {
    toggleDropdown() { this.showDropdown = !this.showDropdown }
  }
}
</script>

<style scoped>
nav {
  background-color:#724949;
  height: 9rem;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0px 17.7238px 12.6977px rgba(0, 0, 0, 0.131624), 0px 10.7582px 7.7074px rgba(0, 0, 0, 0.113389);
  z-index: 2;
}
a {
  color: white;
  text-decoration: underline;
}
.router {
  font-size: 3.6rem;
  width: fit-content;
  margin-right: 3rem
}
#Home {
  font-size: 4.8rem;
  margin-right: auto;
  margin-left: 3rem
}
img {
  height: 85%;
  margin-left: 1rem
}
.dropdown {
  position: absolute;
  background-color: #724949;
  z-index: 3;
  height: 100vh
}
#overlay {
  background-color: rgba(0,0,0,0.2);
  position:fixed;
  left:0;
  top: 0;
  width:100%;
  height:100%;
  z-index: 1;}
</style>