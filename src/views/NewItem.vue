<template>
  <div class="new-container">
    <h1>Add an item</h1>
    <form @submit.prevent="saveItem()" class="form">
      <div class="form--group">
        <label class="form--label" for="itemname">What?</label>
        <input
          class="form--input"
          id="itemname"
          maxlength="16"
          name="itemname"
          placeholder="Item name"
          required
          type="text"
          v-model="newItem.name"
        >
      </div>
      <div class="form--group">
        <label class="form--label" for="itemquantity">How many?</label>
        <input
          class="form--input"
          id="itemquantity"
          max="100"
          min="1"
          name="itemquantity"
          placeholder="Item quantity"
          required
          type="number"
          v-model="newItem.quantity"
        >
      </div>
      <div class="form--group">
        <label class="form--label form--label--select" for="shopname">Where?</label>
        <select
          class="form--select"
          id="shopname"
          name="shopname"
          required
          v-model="newItem.shop"
        >
          <option value="" disabled selected>Shop name</option>
          <option value="Aldi">Aldi</option>
          <option value="Auchan">Auchan</option>
          <option value="Ikea">Ikea</option>
          <option value="Lidl">Lidl</option>
          <option value="Rossmann">Rossmann</option>
          <option value="Tesco">Tesco</option>
        </select>
      </div>
      <div class="form--group">
        <button class="btn btn--save" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: {
        name: '',
        quantity: '',
        shop: '',
      },
    };
  },

  methods: {
    saveItem() {
      this.$store.dispatch('addItem', this.newItem)
        .then(() => {
          this.$router.push('/');
        });
    },
  },
};
</script>
