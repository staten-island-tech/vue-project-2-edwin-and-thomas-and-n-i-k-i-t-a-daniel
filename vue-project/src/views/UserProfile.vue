<template>
    <div>
        <h2>User {{ store.state.viewingProfile.dname }}</h2>
        <h3 v-if="user.uid === route.params.uid"><router-link to="/create">Create a Post</router-link></h3>
        <!-- Temporary Blog Thing, make component -->
        <div class="post" v-for="post in store.state.posts" :key="post.name">
            <router-link class="post-link" :to="`/post/${post.id}`">{{post.title}}</router-link>
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
    }
)

</script>

<style scoped>
.post{
    outline: medium solid red;
}

.post-link {
    font-size: 3.375rem
}

</style>