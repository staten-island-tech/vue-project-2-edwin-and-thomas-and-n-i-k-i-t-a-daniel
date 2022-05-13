<template>
    <div>
        <h3>{{ route.params.id }}</h3>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, watch } from '@vue/runtime-core'

const store = useStore()
const route = useRoute()
const user = computed(() => store.state.user)
const post = computed(() => store.state.posts[0])

store.dispatch('getSinglePost', route.params.id)

// also use this draft component for users editing their preexisitng posts

watch(
    () => route.params.id,
    async (newId) => {
        store.dispatch("getSinglePost", newId)
    }
)
</script>

<style scoped>
h3 {
    margin-top: 10rem
}
</style>