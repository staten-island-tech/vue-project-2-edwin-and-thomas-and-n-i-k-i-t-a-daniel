<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>

        <label for="dname">Display Name:</label>
        <input type="dname" name="dname" v-model="dname" required>

        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" required>

        <label for="email">Password:</label>
        <input type="password" name="password" v-model="password" required>

        <button>Sign up</button>
        <div v-if="error">{{ error }}</div>
    </form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const dname = ref('')
const error = ref(null)

const store = useStore()
const router = useRouter()

const handleSubmit = async () => {
    try {
        await store.dispatch('signup', {
            email: email.value,
            password: password.value,
            dname: dname.value
        })
        router.push('/')
    } catch (err) {
        error.value = err.message
    }
} 
</script>

<style scoped>



</style>