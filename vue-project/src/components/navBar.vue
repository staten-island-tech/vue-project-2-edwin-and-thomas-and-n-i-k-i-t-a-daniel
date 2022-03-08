<template>
    <div>
    <nav v-if="authIsReady">
      <router-link class=router id=Home to="/">HOME</router-link>
<!--       <router-link class=router to="/about">About</router-link> -->
      <div class=notHome><router-link class=router to="/signup" v-if="!user">SIGN UP</router-link>
      <router-link class=router to="/login" v-if="!user">LOGIN</router-link>
      <router-link class=router :to="`/user/${user.uid}`" v-if="user">PROFILE</router-link> <!-- your choice to make it profile or person's username -->
<!--         <span>Logged in as {{ user.displayName }}</span> looked bad -->
        <a v-if="user" class=router @click="handleClick">SIGN OUT</a>
      </div>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
}
a {
  color: white;
  text-decoration: underline;
}
.notHome {
  text-align: right;
  float: right;
  margin-top: 1rem;
}
.router {
    font-size: 3.6rem;
    margin-right: 4rem;
}
#Home {
    font-size: 4.8rem;
}
</style>