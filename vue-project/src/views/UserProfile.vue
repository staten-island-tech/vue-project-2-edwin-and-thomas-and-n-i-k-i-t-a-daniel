<template>
    <div>
        <h2>User {{ store.state.viewingProfile.dname }}</h2>
        <h3 v-if="user.uid === route.params.uid"><router-link to="/create">Create a Post</router-link></h3>
        <!-- Temporary Blog Thing, make component -->
        <div class="post" v-for="post in store.state.posts" :key="post.name">
            <h3 class=title>{{ post.title }}</h3>
            <h4>{{ post.description }}</h4>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
const route = useRoute()
const store = useStore()
const user = computed(() => store.state.user)
store.dispatch("getViewingProfile", route.params.uid)

watch(
    () => route.params.uid,
    async (newId) => {
        store.dispatch("getViewingProfile", newId)
    },
)

</script>

<style scoped>
.post {
  background: #724949;
  margin-top: 9.5rem;
  color: white;
  width: 120rem;
  height: 15rem;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0rem 1.5rem 7rem -3rem black
}
h4 {
  font-size: 1.8rem;
  margin-left: 1rem;
}
.title {
    font-size: 4.8rem;
    margin-left: 1rem;
}
h4{
  font-size: 1.4rem;
  margin-left: 1rem;
}
</style>