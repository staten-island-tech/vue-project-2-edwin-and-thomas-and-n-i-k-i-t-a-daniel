<template>
    <div>
    <nav v-if="authIsReady">
      <router-link class="router" id="Home" to="/">HOME</router-link>

      <router-link class="router right" to="/signup" v-if="!user">SIGN UP</router-link>
      <router-link class="router right" to="/login" v-if="!user">LOGIN</router-link>
      <router-link class="router right" :to="`/user/${user.uid}`" v-if="user">PROFILE</router-link>
      <router-link v-if="user" class="router right" @click="handleClick" to="/">SIGN OUT</router-link>
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
  height: 9rem;
  display: flex;
  flex-flow: row nowrap;
  flex-direction: row;
  align-items: center;
}
a {
  color: white;
  text-decoration: underline;
}
.router {
  font-size: 3.6rem;
  width: fit-content
}
#Home {
  font-size: 4.8rem;
  margin-left: 2rem;
}
.right {
  margin-left: 5rem;
  left: 125rem;
}
</style>