<template>
    <div>
        <form @submit.prevent="handleSubmit">

            <label for="title">Title:</label>
            <input type="title" name="title" v-model="title" required>

            <label for="title">Description:</label>
            <input type="description" name="description" v-model="description" required>

            <editor 
                api-key="ffugz7x38mw73x297de4hhgulrnsse6ldbn7cumiyo99w54f" 
                :init="{
                    height: 500,
                    menubar: false,
                    plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                    'undo redo | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }"
            v-model="content" name="content" />

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
        router.push('/userhome')
    } catch (err) {
        console.log(err)
    }
}

</script>

<style scoped>

</style>