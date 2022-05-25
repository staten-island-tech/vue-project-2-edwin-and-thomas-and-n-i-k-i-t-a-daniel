<template>
    <main>
        <select v-model="draft">
            <option disabled value="">Edit Draft</option>
            <option v-for="draft in drafts" :key="draft.id" :value="draft.id">{{ 
            draft.title }}</option>
        </select>
        <div class='top-buttons'>
            <BasicButton @on-click="getDraft">Switch</BasicButton>
            <BasicButton @on-click="clearFields">Clear Fields</BasicButton>
        </div>
        <form @submit.prevent="handleSubmit">

            <div class="form-input">
                <label for="title">Title:</label>
                <input id=title type="title" name="title" v-model="title" required>
            </div>
            <div class="form-input">
                <label for="imageLink">Image Link:</label>
                <input id=imageLink type="url" name="imageLink" v-model="imageLink">
            </div>

            <div class="form-input">
                <label for="tags">Tags: (Optional)</label>
                
                <input id=tags type="tags" name="tags" v-model="newTag">
                <p @click="addTag()" class="clickable-blk">+</p>
                <p v-if="tags.length > 0">Click to remove tag</p>
                <ul v-if="tags">
                    <li v-for="(tag, index) in tags" :key="tag" @click="removeTag(index)" class="clickable-blk tag">{{ tag }}</li>
                </ul>
            </div>

            <div class="editor">
                <label for="content">Content:</label>
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
                    name="content" id=content />
            </div>

            <BasicButton type="submit">Post</BasicButton>
        </form>
            <BasicButton @on-click="handleDraft">Save as Draft</BasicButton>
    </main>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
import BasicButton from '../components/BasicButton.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'

const store = useStore()
const router = useRouter()

const title = ref('')
const content = ref('')
const newTag = ref('')
const tags = ref([])
const imageLink = ref('')

const drafts = computed(() => store.state.drafts)
const draft = ref('')

const handleSubmit = async () => {
    try {
        await store.dispatch('createPost', {
            title: title.value,
            content: content.value,
            imageLink: imageLink.value,
            tags: tags.value,
        })
        console.log(content)
        router.push('/')
    } catch (err) {
        console.log(err)
    }
}
const handleDraft = async () => {
    try {
        await store.dispatch('createDraft', {
            title: title.value,
            content: content.value,
            imageLink: imageLink.value,
            tags: tags.value,
        })
        console.log(content)
        router.push('/')
    } catch (err) {
        console.log(err)
    }
}

const addTag = () => {
    const arr = tags.value
    if(newTag.value.trim() != ''){
        arr.push(newTag.value.trim())
        newTag.value = ''
    }
}
const removeTag = (index) => {
    const arr = tags.value
    arr.splice(index, 1)
    console.log(`1 deleted at ${index} index`)
}

<<<<<<< HEAD
=======
const getDraft = async () => {
    await store.dispatch('getSingleDraft', draft.value)
    const doc = store.state.posts[0]
    title.value = doc.title
    content.value = doc.content
    tags.value = doc.tags
    imageLink.value = doc.imageLink
}
const clearFields = () => {
    title.value = ''
    content.value = ''
    tags.value = ''
    imageLink.value = ''
    draft.value = ''
}

watch(
    () => store.state.user,
    async () => {
        store.dispatch('getDrafts')
    }
)
>>>>>>> 7b4cc29405a294a24474edad923b3eea2379907a
</script>



<style scoped>
main {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}
form {
    width: 100%;
    /* height: 75vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
<<<<<<< HEAD
    padding-top: 5rem;
=======
    /* padding-top: 3rem; */
>>>>>>> 7b4cc29405a294a24474edad923b3eea2379907a
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
    z-index: 0;
}
.form-input p {
    width: fit-content;
    cursor: pointer;
}
.tag {
    cursor: pointer;
    font-size: 2rem
}
select{
    font-size: 2rem;
    margin-top: 3rem;
}
.top-buttons {
    transform: scale(0.7);
}
@media (max-width: 400px) {
    .editor, input {
        width: 90vw
    }
}


</style>