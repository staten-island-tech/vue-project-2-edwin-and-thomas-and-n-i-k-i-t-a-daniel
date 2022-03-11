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
    <div class=dropdown v-if="showDropdown">
    <input type=search class=dropdownItem>
    <h3 class=dropdownItem>Your Posts</h3>
    <h3 class=dropdownItem>Following</h3>
    </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore()
const handleClick = () => {
  store.dispatch('logout')
  router.push("/")
}
const user = computed(() => store.state.user)
const authIsReady = computed(() => store.state.authIsReady)
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0rem -2.5rem 6rem black;
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
  margin-left: 1rem;
}
.dropdown {
  text-align: center;
  align-items: center;
  width: 30rem;
  background: #975F5F;
  height: 100vh;
  z-index:1;
  position: relative;
}
.dropdownItem {
  background-color: #E08B8B;
  margin-left: auto;
  margin-right: auto;
  margin-top:2rem;
  max-width: 16rem;
  max-height: 4rem;
  border-radius: 2.5rem;
  font-size: 2.4rem;
}
</style>