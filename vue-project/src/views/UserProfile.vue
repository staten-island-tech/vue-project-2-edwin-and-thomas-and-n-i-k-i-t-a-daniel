<template>
    <div class="main">
        <img class=pfp :src=store.state.viewingProfile.picture>
        <h2>{{ store.state.viewingProfile.dname }}</h2>
        <h3 v-if="user.uid === route.params.uid"><router-link to="/create">Create a Post</router-link></h3>
        <div class="radio">
            <h3 class="radio-item" @click="radio = 'post'">Posts</h3>
            <h3 class="radio-item" @click="radio = 'comments'">Comments</h3>
        </div>
        <div v-if="radio === 'post'" class="post">
        <h3 v-if="user.uid === route.params.uid"><router-link to="/passwordreset">Reset Password</router-link></h3>
        <PostPreview v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" />
        </div>
        <div v-if="radio === 'comments'" class="comments">
            <div v-for="comment in comments" :key="comment.id" class="comment">
                <p>{{ comment.content }}</p>
                <div>
                    <h5 @click="userClick(comment.author.uid)">-{{ comment.author.dname }}</h5>
                    <BasicButton v-if="comment.author.uid === store.state.user.uid" @click="deleteComment(comment.id, comment.post)">DELETE</BasicButton>
                    <BasicButton v-if="comment.author.uid === store.state.user.uid" @click="postClick(comment.post)">Go to Post</BasicButton>
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
</script>

<style scoped>
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
.pfp {
    width: 30rem;

}
</style>