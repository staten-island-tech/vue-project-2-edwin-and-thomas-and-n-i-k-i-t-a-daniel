<template>
    <main>
        <h3>Search Results</h3>
        <!-- lint knows nothing -->
        <DropdownSort/>

        <div class="posts" v-if="user">
            <PostPreview  v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" :imageLink="post.imageLink" :altText="post.altText"/>  
        </div>
    </main>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import PostPreview from '../components/PostPreview.vue'
import DropdownSort from '../components/DropdownSort.vue'

const store = useStore()
const posts = computed(() => store.state.posts)
const user = computed(() => store.state.user)

document.title = 'Search Results | Review Site'
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
    color: var(--color-contrast-text);
}
</style>