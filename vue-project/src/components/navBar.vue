<template>
    <div class="navBar">
      <nav v-if="authIsReady">
        <transition 
        name="rotate">
        <img src="../assets/logo.svg" id="logo" alt="Dropdown logo" @click="toggleDropdown()" :key="showDropdown">
        </transition>
        <!-- <transition name="rotate" appear>
          <div v-if="showDropdown">
            <img src="../assets/logo.svg" id="logo" alt="Dropdown logo" @click="toggleDropdown()">
          </div>
          <div v-else>
            <img src="../assets/logo.svg" id="logo" alt="Dropdown logo" @click="toggleDropdown()" >
          </div>
        </transition> -->
        <router-link class="router" id="Home" to="/">HOME</router-link>

        <router-link class="router right" to="/signup" @click="keyChange()" v-if="!user">SIGN UP</router-link>
        <router-link class="router right" to="/login" @click="keyChange()" v-if="!user">LOGIN</router-link>
        <router-link class="router right" :to="`/user/${user.uid}`" @click="keyChange()" v-if="user">PROFILE</router-link>
        <router-link v-if="user" class="router right" @click="handleClick(); keyChange()" to="/">SIGN OUT</router-link>
      </nav>
      <transition-group> 
        <div v-if="showDropdown" class="dropdown">
          <input type="search" name="search" v-model="search" class="top-item" />
          <router-link v-if="user" :to="`/user/${user.uid}/`" class="dropdown-item">Your Posts</router-link>
          <router-link v-if="!user" to="/login" class="dropdown-item">Login</router-link>
          <router-link v-if="user" to="/create" class="dropdown-item">Create</router-link>
        </div>
        <div id="overlay" v-if="showDropdown" @click="close"></div>
      </transition-group>
      <transition name="moveRight">
      <img src="../assets/BackmostVector.svg" id="backWave" class="wave" alt="backgroundDetailWave" :key="keyvalue">
      </transition>
      <transition name="moveLeft">
      <img src="../assets/FrontVector.svg" id="frontWave" class="wave" alt="backgroundDetailWave" :key="keyvalue">
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
      keyvalue: true,
      showDropdown: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
      this.keyvalue = !this.keyvalue
    },
    keyChange(){
      this.keyvalue = !this.keyvalue
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
    const handleClick = () => {
      store.dispatch('logout')
      router.push("/")
    }

    return { search, router, route, store, handleClick, user, authIsReady}
  }
}
</script>

<style scoped>
nav {
  position: fixed;
  top:0;
  background-color:#724949;
  height: 9rem;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0px 17.7238px 12.6977px rgba(0, 0, 0, 0.131624), 0px 10.7582px 7.7074px rgba(0, 0, 0, 0.113389);
  z-index: 3;
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
#logo {
  height: 85%;
  margin-left: 1rem;
  cursor: help;
  transition: transform 1s ease-in-out;
}
.wave{
  z-index: -1;
  width: 200%;
}
#frontWave{
    position: fixed;
  bottom: 0;
  left: 0;
}
#backWave{
    position: fixed;
  bottom: 0;
  right: 0;
}
.dropdown {
  position: fixed;
  background-color: #975F5F;
  z-index: 2;
  height: 100%;
  width: 30rem;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  border-bottom-right-radius: 2rem;
}

#overlay {
  background-color: rgba(0,0,0,0.2);
  position:fixed;
  left:0;
  top: 0;
  width:100%;
  height:100%;
  z-index: 1;}

.top-item {
  margin-bottom: 2rem;
  background-color: #e08b8b43;
  background-image: url('../assets/search.svg');
  background-repeat: no-repeat;
  background-position: left center;
  background-position-x: 5%;
  border: none;
  border-radius: 2rem;
  width: 85%;
  height: 5rem;
  padding: .6rem 1.6rem;
  font-size: 2rem;
  text-align: left;
  margin-top: 12rem;
  color: white;
  text-indent: 3rem
}
.dropdown-item {
  background-color: #e08b8b43;
  border: none;
  border-radius: 2rem;
  width: 85%;
  height: 5rem;
  padding: .6rem 1.6rem;
  font-size: 2.4rem;
  margin-bottom: 2rem;
  color: white;
  text-align: center;
  text-decoration-line: none;
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
.rotate-enter-active {
    animation:  rotate 1s;
}
.rotate-leave-active{
  display: none;
}
.moveRight-enter-active{
  animation: moveRight 5s ease-in-out;
}
.moveLeft-enter-active{
  animation: moveLeft 5s ease-in-out;
}
</style>