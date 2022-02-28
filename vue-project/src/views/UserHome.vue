<template>
    <div>
        <div v-if="user">
            <h2>Welcome to the user home, {{ user.displayName }}</h2>
        </div>
        <div v-if="!user">
            <!-- TODO: make a 404 component -->
            <h2>404</h2>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const user = computed(() => store.state.user)
</script>

<style scoped>

</style>