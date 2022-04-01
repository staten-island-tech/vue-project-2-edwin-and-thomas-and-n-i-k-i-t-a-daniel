<template>
    <button @click="$emit('on-click')" class="clickable">
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    color: white;
    background-color: #724646;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1.2rem 3.2rem;
    display: inline-block;
    margin: 1.6rem;
    font-size: 1.6rem;
    border: none;
    border-radius: 0;
    transition: all 0.2s;
}
</style>