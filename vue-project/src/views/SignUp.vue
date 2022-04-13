<template>
    <form @submit.prevent="handleSubmit" class="main">
        <h3>Sign up</h3>

        <div class="form-input">
            <label for="dname">Display Name:</label>
            <input type="dname" name="dname" v-model="dname" required>
        </div>

        <div class="form-input">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email" required>
        </div>

        <div class="form-input">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password" required>
        </div>

        <div class="form-input">
            <label for="confirm">Confirm Password:</label>
            <input type="password" name="confirm" v-model="confirm" required>
        </div>
        
        <BasicButton>Sign Up</BasicButton>

        <h4><router-link to="/login">Already have an account?</router-link></h4>

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
const confirm = ref('')
const dname = ref('')
const error = ref(null)

const store = useStore()
const router = useRouter()

const handleSubmit = async () => {
    try {
        await store.dispatch('signup', {
            email: email.value,
            password: password.value,
            confirm: confirm.value,
            dname: dname.value,

        })
        router.push('/')
    } catch (err) {
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
    padding-top: 15rem;
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