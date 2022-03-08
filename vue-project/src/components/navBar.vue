<template>
    <div>
    <nav v-if="authIsReady">
      <router-link class=router id=Home to="/">Home</router-link>
<!--       <router-link class=router to="/about">About</router-link> -->
      <router-link class=router to="/signup" v-if="!user">Sign Up</router-link>
      <router-link class=router to="/login" v-if="!user">Login</router-link>
      <router-link class=router :to="`/user/${user.uid}`" v-if="user">Profile</router-link>
      <span v-if="user">
        <span>Logged in as {{ user.displayName }}</span>
        <button @click="handleClick">Logout</button>
      </span>
    </nav>
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

<style scoped>
nav {
    background-color:#724949;
    height: 11.2rem;
    text-align: right;
}
.router {
    font-size: 3.6rem;
    margin-left: 3rem;
}
#Home {
    font-size: 4.8rem;
    margin: 0;
    text-align: left;
}
</style>