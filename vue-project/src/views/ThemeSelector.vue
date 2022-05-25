<template>
<div class="inputs">
    <h1>Theme Changer</h1>
    <input type="color" name="primary" id="primary" value="colorPrimary">
    <input type="color" name="secondary" id="secondary" value="--color-secondary">
    <input type="color" name="tertiary" id="tertiary" value="tertiaryColor">
    <div class="valueholder"></div>
    </div>
</template>
<script setup>
</script>

<style scoped>
input{
    width: 55rem;
    height: 10rem;
    margin: 2rem;
}
.valueholder{
    color: var(--color-primary);
    background-color: var(--color-secondary);
    display: none;
}
.inputs{
    display: flex;
    justify-content: center;
    padding-top: 15rem;
    flex-flow: wrap;
    margin: auto;
    width: 75rem;
    }
</style>