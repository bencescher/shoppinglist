<template>
  <div class="container">
    <h1>Add an item</h1>
    <form>
      <div class="form--group">
        <label for="itemname">Name</label>
        <input type="text" name="itemname" id="itemname">
      </div>
      <div class="form--group">
        <label for="itemquantity">Quantity</label>
        <input type="number" name="itemquantity" id="itemquantity">
      </div>
      <div class="form--group">
        <label for="shopname">Name</label>
        <select name="shopname" id="shopname">
          <option value="Aldi">Aldi</option>
          <option value="Aldi">Auchan</option>
          <option value="Aldi">Ikea</option>
          <option value="Aldi">Lidl</option>
          <option value="Aldi">Rossmann</option>
          <option value="Aldi">Tesco</option>
        </select>
      </div>
      <div class="form--group">
        <button class="btn btn-save">Save</button>
      </div>
    </form>
  </div>
</template>
