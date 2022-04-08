<template>
    <main>
        <h3>Password Reset</h3>
        <form @submit.prevent="handleSubmit">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email">

            <BasicButton>Send Password Reset</BasicButton>
        </form>
        <h5 class="error">{{ error }}</h5>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BasicButton from '../components/BasicButton.vue'
const email = ref('')
const error = ref(null)

const store = useStore()

const handleSubmit = () => {
    try {
        store.dispatch('passwordReset', email.value)
    } catch (err) {
        error.value = err
    }
}
</script>

<style scoped>
main {
    display: flex;
    flex-flow: nowrap column;
    align-items: center;
    padding-top: 5rem;
}
form {
    display: flex;
    flex-flow: column nowrap;
    width: fit-content;
    align-items: center;
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