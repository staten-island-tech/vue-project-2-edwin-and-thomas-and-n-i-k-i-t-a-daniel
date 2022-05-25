<template>
<div class='container'>
<div class="sort">
    <select v-model="selected">
        <option disabled value="">Sort by</option>
        <option value="ascending">Most Popular</option>
        <option value="descending">Least Popular</option>
    </select>
    <BasicButton @on-click="store.dispatch('sortPosts', selected)">Sort</BasicButton>
</div>
</div>
  
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BasicButton from './BasicButton.vue'

const store = useStore()
const selected = ref()
</script>

<style scoped>
select {
    font-size: 2rem;
}
.container {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>