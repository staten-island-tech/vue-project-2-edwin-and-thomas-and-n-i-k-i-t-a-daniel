<template>
    <div class="page">
        <h2>User {{ store.state.viewingProfile.dname }}</h2>
        <h3 v-if="user.uid === route.params.uid"><router-link to="/create">Create a Post</router-link></h3>
        <PostPreview v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" />
    </div>
</template>

<script setup>
import PostPreview from '../components/PostPreview.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
const route = useRoute()
const store = useStore()
const user = computed(() => store.state.user)
const posts = computed(() => store.state.posts)
store.dispatch("getViewingProfile", route.params.uid)
watch(
    () => route.params.uid,
    async (newId) => {
        store.dispatch("getViewingProfile", newId)
    },
)
</script>

<style scoped>
.page {
    padding-top: 9rem;
}
</style>