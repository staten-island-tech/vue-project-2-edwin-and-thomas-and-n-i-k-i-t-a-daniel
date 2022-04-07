<template>
    <div class="main">
        <div class="radio">
            <h3 class="radio-item" @click="radio = 'post'">Post</h3>
            <h3 class="radio-item" @click="radio = 'comments'">Comments</h3>
            <h3 class="radio-item" @click="radio = 'edit'" v-if="user.uid === post.author.uid">Edit</h3>
        </div>

        <div v-if="radio === 'post'" class="post">
            <h2>{{ post.title }}</h2>
            <h4>by <span class="clickable-blk" @click="userClick(post.author.uid)">{{ post.author.dname }}</span></h4>
            <div id="content" v-html="post.content" />
        </div>

        <div v-if="radio === 'comments'" class="comments">
            <h2>Comments</h2>
            <div v-for="comment in comments" :key="comment.id" class="comment">
                <p>{{ comment.content }}</p>
                <div>
                    <h5 @click="userClick(comment.author.uid)" class="clickable">-{{ comment.author.dname }}</h5>
                    <BasicButton v-if="comment.author.uid === store.state.user.uid" @on-click="deleteComment(comment.id)">DELETE</BasicButton>
                </div>
            </div>
            <input type="text" v-model="comment">
            <BasicButton @on-click="handleComment">Post</BasicButton>
            <h5 v-if="error">{{ error }}</h5>
        </div>

        <div v-if="radio === 'edit'">
            <h2>Edit</h2>

            <BasicButton @on-click="handleDelete">Delete</BasicButton>

            <h5 v-if="error">{{ error }}</h5>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router';
import { computed, watch, ref } from 'vue';
import BasicButton from '../components/BasicButton.vue'

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

const deleteComment = async (id) => {
    try {
        await store.dispatch("deleteComment", { 
        commentID: id,
        id: route.params.id
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
</script>

<style scoped>
.main {  
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}
.radio {
    display: flex;
    flex-flow: row nowrap;
}
.radio-item {
    cursor: pointer;
    background-color: #794d4d51;
    color: #724949;
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
.commentBox{
    font-size: 5rem;
}
.commentButton{
    font-size: 5rem;
}
.comments {
    width: 40vw;
}
.comments h2 {
    text-align: center;
}
.comment {
    background-color: #724949;
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 1rem;
    color: white;
    border-radius: 0.5rem;
}
.comment p {
    margin-left: 0.5rem;
}
.comment h5 {
    margin-right: 0.5rem;
}
.comment div {
    align-self: flex-end;
    cursor: pointer;
    display: flex;
    flex-flow: column-reverse nowrap;
}
.comment div h5 {
    text-align: right;
}
.post {
    display: flex;
    flex-flow: column nowrap;
    width: 80vw;
}
.post h2, h4, div {
    align-self: center;
}
.post h4 {
    cursor: pointer;
}
input {
    font-size: 2rem;
}
</style>