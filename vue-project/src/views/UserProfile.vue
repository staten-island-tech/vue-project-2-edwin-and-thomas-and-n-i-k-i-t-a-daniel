<template>
    <div>
        <h2>User {{ store.state.viewingProfile.dname }}</h2>
        <h3>{{ store.state.viewingProfile.fname }} {{ store.state.viewingProfile.lname }}</h3>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
const route = useRoute()
const store = useStore()
store.dispatch("getViewingProfile", route.params.uid)
console.log("opened user profile")
</script>

<style scoped>

</style>