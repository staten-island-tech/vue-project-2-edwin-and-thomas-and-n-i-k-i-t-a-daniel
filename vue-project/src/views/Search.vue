<template>
    <main>
        <h3>Search Results</h3>
        <!-- lint knows nothing -->
        <PostPreview v-if="user" v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" />  
    </main>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import PostPreview from '../components/PostPreview.vue'

const store = useStore()
const posts = computed(() => store.state.posts)
const user = computed(() => store.state.user)

</script>

<style lang="scss" scoped>

</style>