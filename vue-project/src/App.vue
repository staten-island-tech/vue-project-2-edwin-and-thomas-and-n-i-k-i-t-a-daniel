<template>
  <div>
    <navBar/>
    <router-view/>
  </div>
</template>

<script setup>
import navBar from "./components/navBar.vue";
</script>

<style>
@import url("./assets/base.css");
</style>