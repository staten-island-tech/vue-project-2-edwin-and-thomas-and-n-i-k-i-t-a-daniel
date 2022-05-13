<template>
    <div :class="{ votepost: type === 'posts', votecomment: type === 'comments'}" class="votes">
            <svg @click="upvote" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ selected: vote === 1 }">
                <path d="M5 19V8H1L8 1L15 8H11V19H5Z" stroke="#E08B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <svg @click="downvote" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ selected: vote === -1 }">
                <path d="M5 1H11V12H15L8 19L1 12H5V1Z" stroke="#E08B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h4>{{ score }}</h4>
        </div>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const store = useStore()
const upvotes = computed(() => store.state.upvotes)
const downvotes = computed(() => store.state.downvotes)

const vote = ref(0)
const score = ref()

const props = defineProps({
  id: String,
  type: String,
})

const upvote = async () => {
  console.log("upvote")
  if (vote.value == 0) {
    await store.dispatch('vote', { targetID: props.id, type: props.type, value: 1 })
    vote.value = 1
  } else if (vote.value == 1) {
    await store.dispatch('unvote', { targetID: props.id, type: props.type, value: 1 })
    vote.value = 0
  } else if (vote.value == -1) {
    await store.dispatch('unvote', { targetID: props.id, type: props.type, value: -1 })
    await store.dispatch('vote', { targetID: props.id, type: props.type, value: 1 })
    vote.value = 1
  }
  await getScore()
}

const downvote = async () => {
  console.log("downvote")
  if (vote.value == 0) {
    await store.dispatch('vote', { targetID: props.id, type: props.type, value: -1 })
    vote.value = -1
  } else if (vote.value == -1) {
    await store.dispatch('unvote', { targetID: props.id, type: props.type, value: -1 })
    vote.value = 0
  } else if (vote.value == 1) {
    await store.dispatch('unvote', { targetID: props.id, type: props.type, value: 1 })
    await store.dispatch('vote', { targetID: props.id, type: props.type, value: -1 })
    vote.value = -1
  }
  await getScore()
}

const getVotes = async () => {
  await store.dispatch('getVotes')
  if (upvotes.value.includes(props.id)) {
    vote.value = 1
  } else if (downvotes.value.includes(props.id)) {
    vote.value = -1
  }
}

const getScore = async () => {
  if(props.type === 'posts') {
    const userRef = doc(db, 'posts', props.id);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    score.value = userData.score
  } else if (props.type === 'comments') {
    const userRef = doc(db, 'comments', props.id);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    score.value = userData.score
  } else {
    console.log('no type given')
  }
}

getVotes()
getScore()
</script>

<style scoped>
.votes {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  cursor: pointer;
}
.votepost svg{
  margin-right: 2rem;
  cursor: pointer;
}
.selected {
  fill: #E08B8B
}
.votepost svg{
  transform: scale(2);
}
.votecomment h4{
  margin-left: 0.5rem;
  font-size: 1.75rem;
}

</style>