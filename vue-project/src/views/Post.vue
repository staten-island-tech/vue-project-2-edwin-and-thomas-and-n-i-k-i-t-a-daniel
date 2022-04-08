<template>
    <div class="main">
        <div class="radio">
            <h3 class="radio-item" @click="radio = 'post'">Post</h3>
            <h3 class="radio-item" @click="radio = 'comments'">Comments</h3>
            <h3 class="radio-item" @click="radio = 'edit'" v-if="user.uid === post.author.uid">Edit</h3>
        </div>

        <div v-if="radio === 'post'" class="post" >
            <h2>{{ post.title }}</h2>
            <h4 @click="userClick(post.author.uid)">by {{ post.author.dname }}</h4>
            <div id="content" v-html="post.content"></div>
            <img v-bind:src="post.imageLink" alt="postImage" class="image" onerror="this.onerror=null;this.src='https://www.transparenttextures.com/patterns/asfalt-light.png';">

        </div>

        <div v-if="radio === 'comments'">
            <h2>Comments</h2>
            <div v-for="comment in comments" :key="comment.id" class="comment">
                <p>{{ comment.content }}</p>
            </div>
            <input type="text" v-model="comment">
            <BasicButton @click="handleComment">Post</BasicButton>
        </div>

        <div v-if="radio === 'edit'">
            <h2>Edit</h2>

            <BasicButton @click="handleDelete">Delete</BasicButton>

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
const handleComment = () => {
    try {
        store.dispatch("postComment", {
            content: comment.value,
            id: route.params.id
        })
        comment.value = ''
    } catch (err) {
        console.log(err)
    }
}
const handleDelete = async () => {
    try {
        await store.dispatch("deletePost", route.params.id)
        router.push('/')
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
    margin-top: 9rem;
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
.comment {
    outline: medium solid red;
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
.image{
   border-radius: 1rem;
   width: 50%;
   margin: auto;
}
</style>