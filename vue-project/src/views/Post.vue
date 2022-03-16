<template>
    <div>
        <h2>{{ post.title }}</h2>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
const route = useRoute()
const store = useStore()
const user = computed(() => store.state.user)
const post = computed(() => store.state.posts[0])
store.dispatch("getSinglePost", route.params.id)

watch(
    () => route.params.id,
    async (newId) => {
        store.dispatch("getSinglePost", newId)
    }
)
</script>

<style scoped>

</style>