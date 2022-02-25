<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>

        <label for="fname">First Name:</label>
        <input type="fname" name="fname" v-model="fname" required>

        <label for="lname">Last Name:</label>
        <input type="lname" name="lname" v-model="lname" required>

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
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const fname = ref('')
const lname = ref('')
const dname = ref('')
const error = ref(null)

const store = useStore()
const router = useRouter()

const handleSubmit = async () => {
    try {
        await store.dispatch('signup', {
            email: email.value,
            password: password.value,
            fname: fname.value,
            lname: lname.value,
            dname: dname.value
        })
        router.push('/userhome')
    } catch (err) {
        error.value = err.message
    }
} 
</script>

<style scoped>



</style>