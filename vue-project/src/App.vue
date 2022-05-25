<template>
  <div>
    <Navbar/>
    <router-view/>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue"
document.title = "Review Site"
</script>

<style>
@import url("./assets/base.css");
</style>