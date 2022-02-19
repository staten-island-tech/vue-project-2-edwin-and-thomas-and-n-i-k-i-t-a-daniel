<template>
    <div>
        <div v-if="user">
            <h2>Welcome to the user home, {{user.email}}</h2>
        </div>
        <div v-if="!user">
            <!-- TODO: make a 404 component -->
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { computed } from 'vue'


export default {
    setup () {
        const store = useStore();
        const router = useRouter()

        const user = computed(() => store.state.user)

        return { user }
    }
}
</script>

<style scoped>

</style>