<template>
    <main class="psuedo-form" v-if="post">
        <div class="form-input">
            <label for="title">Title:</label>
            <input id=title type="title" name="title" v-model="title" required>
        </div>
        <div class="form-input">
            <label for="imageLink">Image Link:</label>
            <input id=imageLink type="url" name="imageLink" v-model="imageLink">
        </div>
        <div class="form-input">
            <label for="imageLink">Alt Text: (Optional)</label>
            <input id=altText type="alt" name="altText" v-model="altText">
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
        <BasicButton @on-click="discardChanges">Discard Changes</BasicButton>
        <BasicButton @on-click="saveDraft">Save Changes</BasicButton>
    </main>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
import BasicButton from '../components/BasicButton.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from '@vue/runtime-core'
import { ref } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const user = computed(() => store.state.user)
const post = computed(() => store.state.posts[0])


// also use this draft component for users editing their preexisitng posts

const title = ref('')
const content = ref('')
const newTag = ref('')
const tags = ref([])
const imageLink = ref('')
const altText = ref('')

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

const getPost = async (id) => {
    await store.dispatch('getSinglePost', id)
    if (store.state.posts[0].author.uid != store.state.user.uid) {
        router.push('/')
    }
    title.value = store.state.posts[0].title
    content.value = store.state.posts[0].content
    if(store.state.posts[0].tags) tags.value = store.state.posts[0].tags
    if(store.state.posts[0].imageLink) imageLink.value = store.state.posts[0].imageLink
}
getPost(route.params.id)

const saveDraft = async () => {
    await store.dispatch('editPost', {
        title: title.value,
        content: content.value,
        imageLink: imageLink.value,
        tags: tags.value,
        id: route.params.id,
        altText: altText.value
    })
    router.push(`/post/${route.params.id}`)
}

const discardChanges = () => {
    if (confirm('Are you sure? All changes will be lost.')) {
        router.push(`/post/${route.params.id}`)
    }
}

watch(
    () => route.params.id,
    async (newId) => {
        getPost(newId)
    }
)

document.title = 'Editing Post | Review Site'
</script>

<style scoped>
.psuedo-form {
    width: 100%;
    /* height: 75vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    padding-top: 3rem;
    color: var(--color-contrast-text);
}
h3 {
    margin-top: 10rem
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

@media (max-width: 400px) {
    .editor, input {
        width: 90vw
    }
}
</style>