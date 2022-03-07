<template>
    <div>
        <h2>User {{ store.state.viewingProfile.dname }}</h2>
        <h3 v-if="user.uid === route.params.uid"><router-link to="/create">Create a Post</router-link></h3>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { computed, onUpdated } from 'vue';
const route = useRoute()
const store = useStore()
const user = computed(() => store.state.user)
store.dispatch("getViewingProfile", route.params.uid)

onUpdated(() => {
    store.dispatch("getViewingProfile", route.params.uid)
})

</script>

<style scoped>

</style>