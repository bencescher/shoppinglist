<template>
  <div class="list-container">
    <div
      v-if="(!listItems.length > 0) && (changeflag !== 0)" class="feedback"
    >
      <p>Good job, your list is empty...</p>
    </div>
    <div
      @click="item.bought = !item.bought; setChangeflag()"
      v-for="(item, index) in listItems"
      :key="index"
      :class="setClass(item.bought)"
      class="card">
      <h1>
        <i
          v-if="!item.bought"
          class="fas fa-shopping-basket"
        ></i>
        <i
          v-else
          class="fas fa-check"
        ></i>
      </h1>
      <h1>{{ item.name }}</h1>
      <p>x{{ item.quantity }}</p>
      <h2>{{ item.shop }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      changeflag: 0,
    };
  },

  watch: {
    changeflag() {
      this.$store.dispatch('updateItems', this.listItems);
    },
    quantityChangeFlag() {
      this.$store.dispatch('initItems');
    },
  },

  computed: {
    listItems() {
      return this.$store.getters.shoppingList;
    },
    quantityChangeFlag() {
      return this.$store.getters.quantityChangeFlag;
    },
  },

  created() {
    this.$store.dispatch('initItems');
  },

  methods: {
    setChangeflag() {
      // change indicator for 'bought' attribute change of item object
      this.changeflag = Math.random(0, 1);
    },

    setClass(flag) {
      // change item card style class depending on 'bought' flag
      let returnClass = '';

      if (flag) {
        returnClass = 'bought';
      } else {
        returnClass = 'needed';
      }

      return returnClass;
    },
  },
};
</script>
