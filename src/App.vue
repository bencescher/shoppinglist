<template>
  <div id="app">
    <header id="nav">
      <app-navbar></app-navbar>
    </header>
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import appNavbar from '@/components/TheNavbar.vue';

export default {
  components: {
    appNavbar,
  },
};
</script>
