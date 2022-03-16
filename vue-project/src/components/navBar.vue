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
      <div v-if="showDropdown" class="dropdown">
        <input type="search" name="search" v-model="search" />
        <router-link :to="`/user/${user.uid}/`" class="dropdown-item">Your Posts</router-link>
        <router-link to="/login" class="dropdown-item">Following</router-link>
        <router-link to="/create" class="dropdown-item">Create</router-link>
      </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';

export default {
  data() {
    return { showDropdown: false }
  },
  methods: {
    toggleDropdown() { this.showDropdown = !this.showDropdown }
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
  background-color:#724949;
  height: 9rem;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
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
  cursor: help;
}
.dropdown {
  position: absolute;
  background-color: #975F5F;
  z-index: 3;
  height: 50rem;
  width: 30rem;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  border-bottom-right-radius: 2rem;
}
input {
  background-color: #e08b8b43;
  background-image: url('search.svg');
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
  margin-top: 2rem;
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
  margin-top: 2rem;
  color: white;
  text-align: center;
  text-decoration-line: none;
}

</style>