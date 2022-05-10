<template>
    <div class="page">
        <div v-if="store.state.viewingProfile.dname != `daniel wrrius`"><h3>Personal PFP:</h3>
        <img class=pfp :src=store.state.viewingProfile.picture >
        <h3>Actual PFP:</h3>
        <img class=pfp src=https://media.discordapp.net/attachments/749708252920676365/973232653224525854/unknown.png alt=danielNoMouth>
        </div>
        <h2 class=userName>{{ store.state.viewingProfile.dname }}</h2>
        
        <img v-if="store.state.viewingProfile.dname === `daniel wrrius`" class=pfp src=https://media.discordapp.net/attachments/749708252920676365/973229925026918460/unknown.png alt=danielWithMouth>
        <div v-if="store.state.viewingProfile.dname === user.displayName"><label for="changePicture">Change your personal PFP (must be a link)</label>
        <input  type="url" name="changePicture" id=changePicture v-model="pictureLink" @keypress.enter="changePicture()"/></div>
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
    justify-content: center;
    flex-flow: wrap;
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
    background-color: #724949;
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 1rem;
    color: white;
    border-radius: 0.5rem;
    font-size: 5rem;
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
    height: 30rem;
}
label {
    font-size: 1.6rem;
}
</style>
