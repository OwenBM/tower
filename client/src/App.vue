<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer class="footer bg-codeworks">
    <!-- Made with <i class="mdi mdi-heart text-pink"></i> by CodeWorks -->
  </footer>
</template>

<style lang="scss">
.footer {
  height: 20px;
  background-color: code;
}
</style>
