<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>

        <div class="form-input">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email" required>            
        </div>

        <div class="form-input">
            <label for="email">Password:</label>
            <input type="password" name="password" v-model="password" required>     
        </div>

        <button>Login</button>

        <h4><router-link to="/signup">Don't have an account?</router-link></h4>

        <div v-if="error">{{ error }}</div>
    </form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref(null)
const store = useStore()
const router = useRouter()
const handleSubmit = async () => {
    try {
        await store.dispatch('login', {
            email: email.value,
            password: password.value
        })
        router.push('/')
    }
    catch (err) {
        error.value = err.message
    }
}
</script>

<style scoped>

form {
    width: 100%;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
}

.form-input {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 2rem;
}

button {
    color: white;
    background-color: #724646;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1.2rem 3.2rem;
    display: inline-block;
    margin: 1.6rem;
    font-size: 1.6rem;
    border: none;
    border-radius: 0;
    transition: all 0.2s;
}

input {
    background-color: #c4c4c4;
    border: none;
    width: 33vw;
    height: 7vh;
    padding: 1.2rem 3.2rem;
    font-size: 3.2rem;
    text-align: center;
}

label {
    font-size: 1.6rem;
}



</style>