<template>
    <div class="main">
        <div class="radio">
            <h3 class="radio-item" @click="radio = 'post'">Post</h3>
            <h3 class="radio-item" @click="radio = 'comments'">Comments</h3>
            <h3 class="radio-item" @click="radio = 'edit'" v-if="user.uid === post.author.uid">Edit</h3>
        </div>

        <div v-if="radio === 'post'" class="post" >
            <h2>{{ post.title }}</h2>
            <Votes :key="route.params.id" :id="route.params.id" :type="'posts'"/>
            <h4 @click="userClick(post.author.uid)">by {{ post.author.dname }}</h4>
            <div id="content" v-html="post.content"></div>
            <img v-bind:src="post.imageLink" alt="postImage" class="image" onerror="this.id='error';">

        </div>
        <div v-if="radio === 'comments'" class="commentHolder">
            <h2>Comments</h2>
            <div v-for="comment in comments" :key="comment.id" class="comment"  >
                <em lang="en">{{ comment.content }}</em>
                <div v-if="comment.content.trim() != ''">
                    <Votes :key="comment.id" :id="comment.id" :type="'comments'"/>
                    <h5 @click="userClick(comment.author.uid)" class="clickable">-{{ comment.author.dname }}</h5>
                    <BasicButton v-if="comment.author.uid === store.state.user.uid" @on-click="deleteComment(comment.id, comment.post)" class="delete">DELETE</BasicButton>
                </div>
            </div>
            <div class="commentSubmit">
            <label for=commentSubmit>Comment:</label>
            <input id=commentSubmit type="text" v-model="comment" class="commentBox">
            <BasicButton @click="handleComment">Post</BasicButton>
            </div>
        </div>
        <div v-if="radio === 'edit'">
            <h2>Edit</h2>

            <BasicButton @on-click="handleDelete">Delete</BasicButton>
            <BasicButton @on-click="router.push(`${route.path}/edit`)">Edit</BasicButton>

            <h5 v-if="error" class="error">{{ error }}</h5>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router';
import { computed, watch, ref, onUpdated, onMounted } from 'vue';
import BasicButton from '../components/BasicButton.vue'
import Votes from '../components/Votes.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()
const user = computed(() => store.state.user)
const post = computed(() => store.state.posts[0])
const comments = computed(() => store.state.comments)
store.dispatch("getSinglePost", route.params.id)

const radio = ref('post')
const comment = ref('')
const error = ref(null)

const userClick = (uid) => {
    router.push(`/user/${uid}`)
}
const handleComment = async () => {
    try {
        await store.dispatch("postComment", {
            content: comment.value,
            id: route.params.id
        })
        console.log("comment action on post")
        comment.value = ''
    } catch (err) {
        error.value = err
    }
}

const deleteComment = async (id, post) => {
    try {
        await store.dispatch("deleteComment", { 
        commentID: id,
        postID: post
        })
    } catch (err) {
        error.value = err
    }
}

const handleDelete = async () => {
    try {
        await store.dispatch("deletePost", route.params.id)
        router.push(`/`)
    } catch (err) {
        error.value = err
    }
}

watch(
    () => route.params.id,
    async (newId) => {
        store.dispatch("getSinglePost", newId)
    }
)

document.title = 'Viewing Post | Review Site'
</script>

<style scoped>
.main {  
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding-top: 9rem;
    color: var(--color-contrast-text);
}
.radio {
    display: flex;
    flex-flow: row nowrap;
}
.radio-item {
    cursor: pointer;
    background-color: #e5dbdb;
    color: var(--color-primary);
    border: none;
    border-radius: 2rem;
    height: 5rem;
    padding: .6rem 1.6rem;
    font-size: 2.4rem;
    margin-top: 2rem;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    text-align: center;
    text-decoration-line: none;
}
#content {
    font-size: 2rem;
}
.comment div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
.commentHolder{
    background-color:rgb(114, 73, 73, 0.2);
    padding: 1rem;
    border-radius: 3rem;
    margin-top: 3rem;
}
.commentSubmit{
    display: flex;
    align-content: center;
}
#commentSubmit{
    width: 40vw;
}
.commentBox{
    margin: auto;
    font-size: 3rem;
    height: 4rem;
    width: 50rem;
    
}
.commentButton{
    font-size: 5rem;
    margin: auto;
}
.commentHolder {
    width: 60vw
}

.comments h2 {
    text-align: center;
}
.comment {
    margin: 1rem;
    color: var(--color-contrast-text);
    border-radius: 1.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.comment div h5 {
    margin-left: 0.5rem;    
    word-wrap: break-word;
    overflow-wrap: break-word;
}
.commentContent {
    margin-left: 0.7rem;
}
.deleteButton {
    background-color: #e5dbdb;
    color: var(--color-primary);
    border: none;
    border-radius: 2rem;
    height: 5rem;
    padding: .6rem 1.6rem;
    font-size: 2.4rem;
    margin-top: 2rem;
    margin-left: 60rem;
    text-align: center;
    text-decoration-line: none;
}
.post {
    display: flex;
    flex-flow: column nowrap;
    width: 80vw;
    color: var(--color-primary);
}
.post h2, h4, div {
    align-self: center;
}
.post h4 {
    cursor: pointer;
}
.image{
   border-radius: 1rem;
   max-width: 75rem;
   margin: auto;
}
#error{
    display: none;
}
label {
    font-size: 1.6rem;
    font-size: 3rem;
    margin-top: auto;
    margin-bottom: auto;
    }
@media (prefers-color-scheme: dark) {
    .radio h3{
    color: var(--color-dark-text);
    }
    .post{
        color: var(--color-contrast-text);
    }
}

@media (max-width: 400px) {
    .commentHolder {
        width: 95vw;
    }
    .commentSubmit {
        transform: scale(0.8);
    }
}
</style>
