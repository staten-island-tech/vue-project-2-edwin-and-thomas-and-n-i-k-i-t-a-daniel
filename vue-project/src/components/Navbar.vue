<template>
    <div class="navBar">
      <nav v-if="authIsReady">
        <transition 
        name="rotate">
        <img src="../assets/logo.svg" id="logo" alt="Dropdown logo" @click="toggleDropdown()" :key="showDropdown">
        </transition>
        <router-link class="router clickable" id="Home" to="/" @click="close()">HOME</router-link>
        
        <router-link class="router right clickable" to="/signup" v-if="!user">SIGN UP</router-link>
        <router-link class="router right clickable" to="/login" v-if="!user">LOGIN</router-link>
        <router-link class="router right clickable" :to="`/user/${user.uid}`" v-if="user">PROFILE</router-link>
        <router-link v-if="user" class="router right clickable" @click="handleClick()" to="/">SIGN OUT</router-link>

      </nav>
      <transition-group> 
        <div v-if="showDropdown" class="dropdown">
          <input id=searchBar v-if="user" type="search" name="search" v-model="search" class="dropdown-item search top-item" @keypress.enter="searchBar(), close()"/>
          <router-link v-if="user" :to="`/user/${user.uid}/`" class="dropdown-item">Your Posts</router-link>
          <router-link v-if="!user" to="/login" class="dropdown-item" :class="{ 'top-item': !user }">Login</router-link>
          <router-link v-if="user" to="/create" class="dropdown-item">Create</router-link>
          <button v-if="viewClassic === true && $route.name==='home'" @click="toggleViewCard" class="dropdown-item">Card View</button>
          <button v-if="viewClassic === false && $route.name==='home'" @click="toggleViewClassic" class="dropdown-item">Classic View</button>
          <router-link v-if="user" to="/" class="dropdown-item" @click="handleClick()">Sign Out</router-link>
        </div>
        <div id="overlay" v-if="showDropdown" @click="close"></div>
      </transition-group>
      <transition name="moveRight">
      <img src="../assets/BackmostVector.svg" id="backWave" class="wave" alt="backgroundDetailWave">
      </transition>
      <!-- <img src="../assets/BackmostVector2.svg" id="midWave" class="wave" alt="backgroundDetailWave" :key="keyvalue"> -->
      <transition name="moveLeft">
      <img src="../assets/FrontVector.svg" id="frontWave" class="wave" alt="backgroundDetailWave">
      </transition>
      </div>
</template>


<script>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  data() {
    return {
      showDropdown: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    close() {
      this.showDropdown = false
    }
  },
  watch: {
    $route (to, from) {
      this.showDropdown = false
    }
  },
  setup() {
    const search = ref('')
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const user = computed(() => store.state.user)
    const authIsReady = computed(() => store.state.authIsReady)
    const viewClassic = computed(()=> store.state.viewClassic)
    const handleClick = () => {
      store.dispatch('logout')
      router.push("/")
    }
    const searchBar = () => {
      store.dispatch('searchPosts', {search: search.value})
      router.push(`/search/${search.value}`)
      search.value = ''
    }
    const toggleViewCard = () => {
      store.dispatch('setViewMode', false)
    }
    const toggleViewClassic = () => {
      store.dispatch('setViewMode', true)
    }
    return { search, router, route, store, handleClick, user, authIsReady, searchBar, toggleViewCard, toggleViewClassic, viewClassic, }
  },
}
</script>

<style scoped>
nav {
  position: fixed;
  top:0;
  background-color:var(--color-primary);
  height: 9rem;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0px 17.7238px 12.6977px rgba(0, 0, 0, 0.131624), 0px 10.7582px 7.7074px rgba(0, 0, 0, 0.113389);
  z-index: 5;
}
a {
  color: var(--color-light-text);
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
#logo {
  height: 85%;
  margin-left: 1rem;
  cursor: pointer;
  transition: transform 1s ease-in-out;
}
.wave{
  z-index: 0;
  width: 200%;
    /* animation: hueShift 15s infinite; */
}
#frontWave{
  position: fixed;
  bottom: 0;
  left: 0;
  animation: moveLeft 30s infinite ease-in-out;
}
#backWave{
  position: fixed;
  bottom: 0;
  right: 0;
  animation: moveRight 30s infinite ease-in-out;
}
.dropdown {
  position: fixed;
  background-color: var(--color-secondary);
  z-index: 4;
  height: 100%;
  width: 30rem;
  color: var(--color-light-text);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

#overlay {
  background-color: rgba(0,0,0,0.2);
  position:fixed;
  left:0;
  top: 0;
  width:100%;
  height:100%;
  z-index: 3;
}

.search {
  margin-bottom: 2rem;
  background-color: var(--color-dark-primary);
  background-image: url('../assets/search.svg');
  background-repeat: no-repeat;
  background-position: left center;
  background-position-x: 5%;
  text-align: left !important;
  border: none;
  border-radius: 2rem;
  width: 85%;
  height: 5rem;
  padding: .6rem 1.6rem;
  font-size: 2rem;
  text-align: left;
  margin-top: 3rem;
  color: var(--color-light-text);
  text-indent: 3rem;
  z-index: 3;
}
.top-item {
  margin-top: 3rem;
}
.dropdown-item {
  background-color: var(--color-dark-primary);
  border: none;
  border-radius: 2rem;
  width: 85%;
  height: 5rem;
  padding: .6rem 1.6rem;
  font-size: 2.4rem;
  margin-bottom: 2rem;
  color: var(--color-light-text);
  text-align: center;
  text-decoration-line: none;
  cursor: pointer;
}
button{
  cursor: pointer;
}
.background{
  z-index: -10;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
@keyframes rotate {
    0% { transform: rotate(0deg) scale(100%);}
    50% { transform: rotate(135deg) scale(55%);}
    75% { transform: rotate(-20deg) scale(110%); }
    100% { transform: rotate(0deg) scale(100%); }
}
@keyframes moveRight {
  0% {transform: translateX(0%);}
  50% {transform: translateX(25%);}
  100% {transform: translateX(0%);}
}
@keyframes moveLeft {
  0% {transform: translateX(0%);}
  50% {transform: translateX(-25%);}
  100% {transform: translateX(0%);}
}
@keyframes hueShift {
  0% {filter: hue-rotate(0deg);}
  100% {filter: hue-rotate(360deg);}
}
.rotate-enter-active {
    animation:  rotate 1s;
}
.rotate-leave-active{
  display: none;
}
/* .moveRight-enter-active{
  animation: moveRight 2.5s ease-in-out;
}
.moveLeft-enter-active{
  animation: moveLeft 2.5s ease-in-out;

} */
/* @media (prefers-color-scheme: dark){
  nav{
    background-color: #001F54;
  }
  .background{
    background-color: #34344A;
  }
} */

/* Phones */
@media (max-width: 660px) {
  .router:not(#Home) {
    display: none;
  }
  .wave {
    width: 600%;
  }
}
label {
  font-size: 2.4rem;
  color: white;
  text-align: center;
  text-decoration-line: none;
}
</style>
