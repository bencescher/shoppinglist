<template>
  <nav class="menu">
    <ul class="menu-list">
      <router-link
        class="menu-list--link"
        tag="li"
        to="/"
      >
        <i class="fas fa-list"></i>
      </router-link>
      <router-link
        class="menu-list--link"
        tag="li"
        to="/new"
      >
        <i class="fas fa-plus"></i>
      </router-link>
      <li @click="archiveItems" class="menu-list--link">
        <i class="fas fa-archive"></i>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    listItems: {
      get() {
        return this.$store.getters.shoppingList;
      },
      set(filteredList) {
        this.$store.dispatch('updateItems', filteredList);
      },
    },
  },
  methods: {
    archiveItems() {
      this.listItems = this.listItems.filter((item) => item.bought === false);
    },
  },
};
</script>
