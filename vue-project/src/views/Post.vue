<template>
    <div class="main">
        <div class="radio">
            <h3 class="radio-item" @click="radio = 'post'">Post</h3>
            <h3 class="radio-item" @click="radio = 'comments'">Comments</h3>
        </div>

        <div v-if="radio === 'post'">
            <h2>{{ post.title }}</h2>
            <h4>by {{ post.author.dname }}</h4>
            <div id="content" v-html="post.content"></div>
        </div>

        <div v-if="radio === 'comments'">
            <h2>Comments</h2>
            <div v-for="comment in comments" :key="comment.id" class="comment">
                <p>{{ comment.content }}</p>
            </div>
            <input type="text" v-model="comment">
            <button @click="handleComment">Post</button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import { computed, watch, ref } from 'vue';
const route = useRoute()
const store = useStore()
const user = computed(() => store.state.user)
const post = computed(() => store.state.posts[0])
const comments = computed(() => store.state.comments)
store.dispatch("getSinglePost", route.params.id)

const radio = ref('post')
const comment = ref('')


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
.comment {
    outline: medium solid red;
}

</style>