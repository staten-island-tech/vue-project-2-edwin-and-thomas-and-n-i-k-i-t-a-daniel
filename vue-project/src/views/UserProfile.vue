<template>
    <div class="main">
        <h2>User {{ store.state.viewingProfile.dname }}</h2>
        <h3 v-if="user.uid === route.params.uid"><router-link to="/create">Create a Post</router-link></h3>
        <div class="radio">
            <h3 class="radio-item" @click="radio = 'post'">Posts</h3>
            <h3 class="radio-item" @click="radio = 'comments'">Comments</h3>
        </div>
        <div v-if="radio === 'post'" class="post">
        <PostPreview v-for="post in posts" :key="post.id" :title="post.title" :author="post.author" :description="post.description" :id="post.id" />
        </div>
        <div v-if="radio === 'comments'" class="comments">
            <div v-for="comment in comments" :key="comment.id" class="comment">
                <p>{{ comment.content }}</p>
                <div>
                    <h5 @click="userClick(comment.author.uid)">-{{ comment.author.dname }}</h5>
                    <BasicButton v-if="comment.author.uid === store.state.user.uid" @click="deleteComment(comment.id, comment.post)">DELETE</BasicButton>
                </div>
            </div> 
        </div>
    </div>
</template>

<script setup>
import PostPreview from '../components/PostPreview.vue'
import BasicButton from '../components/BasicButton.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import { computed, watch, ref } from 'vue';
const route = useRoute()
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

store.dispatch("getViewingProfile", route.params.uid)
watch(
    () => route.params.uid,
    async (newId) => {
        store.dispatch("getViewingProfile", newId)
    },
)
</script>

<style scoped>

</style>