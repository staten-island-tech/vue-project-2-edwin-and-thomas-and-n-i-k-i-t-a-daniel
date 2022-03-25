<template>
    <div>
        <form @submit.prevent="handleSubmit">

            <div class="form-input">
                <label for="title">Title:</label>
                <input type="title" name="title" v-model="title" required>
            </div>

            <div class="form-input">
                <label for="title">Description:</label>
                <input type="description" name="description" v-model="description" required>
            </div>

            <div class="editor" required>
                <editor 
                    api-key="ffugz7x38mw73x297de4hhgulrnsse6ldbn7cumiyo99w54f" 
                    :init="{
                        height: 500,
                        max_height: 500,
                        min_height: 500,
                        menubar: false,
                        plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                        'undo redo | bold italic underline | \
                        bullist numlist outdent indent | removeformat',
                    }"
                    v-model="content" 
                    name="content" />
            </div>



            <button>Upload Post</button>
        </form>
        
    </div>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const store = useStore()
const router = useRouter()

const title = ref('')
const description = ref('')
const content = ref('')

const handleSubmit = async () => {
    try {
        await store.dispatch('createPost', {
            title: title.value,
            description: description.value,
            content: content.value
        })
        router.push('/')
    } catch (err) {
        console.log(err)
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
    margin-top: 10rem;
}
label {
    font-size: 1.6rem;
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
    width: 20vw;
    height: 3vh;
    padding: 1.2rem 1.5rem;
    font-size: 2rem;
    text-align: left;
}
.editor {
    width: 30vw;
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

</style>