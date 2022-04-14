<template>
    <main>
        <h3>Search Results</h3>
        <!-- lint knows nothing -->
        <div class="posts" v-if="user">
        <PostPreview  v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" :imageLink="post.imageLink"/>  
        </div>
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

<style scoped>
.posts{
    padding-top: 1rem;
    display: flex;
    justify-content: center;
    flex-flow: wrap;
}
h3{
    padding-top: 4rem;
    margin: auto;
    text-align: center;
}
</style>