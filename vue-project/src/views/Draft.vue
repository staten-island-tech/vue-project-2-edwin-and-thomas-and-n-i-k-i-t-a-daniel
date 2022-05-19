<template>
    <div>
        <h2>{{ post.title }}</h2>
        <Votes :key="route.params.id" :id="route.params.id" :type="'posts'"/>
        <h4>by {{ post.author.dname }}</h4>
        <div id="content" v-html="post.content"></div>
        <img v-bind:src="post.imageLink" alt="postImage" class="image" onerror="this.onerror=null;this.id='error';">
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from '@vue/runtime-core'
import { ref } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const user = computed(() => store.state.user)
const post = computed(() => store.state.posts[0])
</script>

<style scoped>

</style>