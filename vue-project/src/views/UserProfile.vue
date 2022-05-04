<template>
    <div class="page">
        <img class=pfp :src=store.state.viewingProfile.picture >
        <h2 class=userName>{{ store.state.viewingProfile.dname }}</h2>
        <input v-if="store.state.viewingProfile.dname === user.displayName" type="url" name="changePicture" v-model="pictureLink" @keypress.enter="changePicture()"/>
        <div class="radio">
            <h3 class="radio-item" @click="radio = 'post'">Posts</h3>
            <h3 class="radio-item" @click="radio = 'comments'">Comments</h3>
        </div>
        <div v-if="radio === 'post'" class="post">
        <PostPreview v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" :imageLink="post.imageLink"/>
        </div>
        <div v-if="radio === 'comments'" class="comments">
            <div v-for="comment in comments" :key="comment.id" class="comment">
                <p>{{ comment.content }}</p>
                <div>
                    <h5 @click="userClick(comment.author.uid)">-{{ comment.author.dname }}</h5>
                    <BasicButton v-if="comment.author.uid === store.state.user.uid" @click="deleteComment(comment.id, comment.post)">DELETE</BasicButton>
                    <BasicButton @click="postClick(comment.post)">Go to Post</BasicButton>
                </div>
            </div> 
        </div>
    </div>
</template>

<script setup>
import PostPreview from '../components/PostPreview.vue'
import BasicButton from '../components/BasicButton.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router';
import { computed, watch, ref } from 'vue';
import gsap from 'gsap'
const route = useRoute()
const router = useRouter()
const store = useStore()
const user = computed(() => store.state.user)
const posts = computed(() => store.state.posts)
const radio = ref('post')
const comments = computed(() => store.state.comments)
const pictureLink = ref('')
const userClick = (uid) => {
    router.push(`/user/${uid}`)
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
const postClick = (postID) => {
  router.push(`/post/${postID}`)
}
store.dispatch("getViewingProfile", route.params.uid)
watch(
    () => route.params.uid,
    async (newId) => {
        store.dispatch("getViewingProfile", newId)
    },
)
const changePicture = () => {
    store.dispatch('changePicture', {picture: pictureLink.value})
    pictureLink.value = ''
}
</script>

<style scoped>

.page {
    margin-top: 9rem;
    display: flex;
    /* justify-content: center; */
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
.userName{
    width: 50vw;
    text-align: center;
    margin: 1rem;
}
.comments {
    width: 40vw;
}
.comments h2 {
    text-align: center;
}
.comment {
    background-color: #72464972;
    display: flex;
    flex-flow: column nowrap;
    padding: 3rem;
    margin: 3rem;
    color: white;
    border-radius: 0.5rem;
    font-size: 5rem;
}
.comment p {
    margin-left: 0.5rem;
    color: black
}
.comment h5 {
    margin-right: 0.5rem;
    color: black;
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
.pfp {
    width: 30rem;
    height: 30rem;
}
</style>