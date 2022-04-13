<template>
    <form @submit.prevent="handleSubmit" class="main">
        <h3>Login</h3>

        <div class="form-input">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email" required>            
        </div>

        <div class="form-input">
            <label for="email">Password:</label>
            <input type="password" name="password" v-model="password" required>     
        </div>

        <BasicButton>Login</BasicButton>

        <h4><router-link to="/passwordreset">Forgot your password?</router-link></h4>
        <h4><router-link to="/signup">Don't have an account?</router-link></h4>

        <h5 class="error" v-if="error">{{ error }}</h5>
    </form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import BasicButton from '../components/BasicButton.vue'

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


@media (max-width: 400px) {
    input {
        width: 90vw
    }
}

</style>