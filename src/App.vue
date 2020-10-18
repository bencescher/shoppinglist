<template>
  <div id="app">
    <header id="nav">
      <app-navbar></app-navbar>
    </header>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    'app-navbar': Navbar,
  },
};
</script>
