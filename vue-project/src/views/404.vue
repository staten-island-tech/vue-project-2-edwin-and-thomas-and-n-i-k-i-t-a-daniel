<template>
    <main>
        <h2>This page either does not exist, or you are not signed in.</h2>
        <router-link to="/">Home</router-link>
    </main>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()
document.title = '404 | Review Site Thing'
router.push('/')
</script>

<style scoped>
main {
    margin-top: 10rem
}

</style>