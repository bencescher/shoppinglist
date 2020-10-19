import Vue from 'vue';
import Vuex from 'vuex';
import db from '../firebase/init';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemList: [],
  },

  mutations: {
    createItem(state, newItem) {
      // add a new item to database or increment the quantity of an existing one
      let existingId = '';

      // check if an item with the same name and shop already exists
      state.itemList.forEach((item) => {
        if (
          item.name === newItem.name
          && item.shop === newItem.shop
        ) {
          existingId = item.id;
        }
      });

      // if no matching item exist in the database add as a new item
      if (!existingId) {
        // add 'bought' flag set to false to new item before adding to state and database
        const formattedItem = {
          bought: false,
          name: newItem.name,
          quantity: parseInt(newItem.quantity, 10),
          shop: newItem.shop,
        };

        // add item to database
        db.collection('shoppinglist')
          .add(formattedItem);
        // add item to state
        state.itemList.push(formattedItem);
      } else {
        // if a matching item exist in the database, increment its quantity
        let previousQuantity = 0;

        db.collection('shoppinglist').get()
          .then((shoppinglist) => {
            shoppinglist.forEach((item) => {
              const itemData = item.data();

              // determine quantity of the matching item
              if (item.id === existingId) {
                previousQuantity = itemData.quantity;
              }
            });

            // update quantity of the matching item adding the new quantity
            db.collection('shoppinglist')
              .doc(existingId)
              .update({
                quantity: parseInt(previousQuantity, 10) + parseInt(newItem.quantity, 10),
              });
          });
      }
    },

    setItems(state) {
      // initialize shopping list from databse
      const rawList = [];
      state.itemList = [];

      db.collection('shoppinglist').get()
        .then((shoppinglist) => {
          shoppinglist.forEach((item) => {
            const itemData = item.data();

            // add document id for each item to have a unique key
            itemData.id = item.id;
            rawList.push(itemData);
          });
          // order items by shop name alphabetically ascending
          rawList.sort((a, b) => {
            if (a.shop < b.shop) {
              return -1;
            }
            if (b.shop > a.shop) {
              return 1;
            }
            return 0;
          });
          state.itemList = rawList;
        });
    },

    updateItems(state, updatedList) {
      // update 'bought' flag in database for the clicked item
      updatedList.forEach((updatedItem) => {
        db.collection('shoppinglist')
          .doc(updatedItem.id)
          .update({
            bought: updatedItem.bought,
          });
      });
    },

    deleteItems(state) {
      // remove items from database where 'bought' flag is true
      db.collection('shoppinglist').get()
        .then((shoppinglist) => {
          shoppinglist.forEach((item) => {
            const itemData = item.data();

            if (itemData.bought) {
              db.collection('shoppinglist')
                .doc(item.id)
                .delete();
            }
          });
        });
      // remove items also from state
      state.itemList = state.itemList.filter((item) => item.bought === false);
    },
  },

  actions: {
    addItem: ({ commit }, newItem) => {
      commit('createItem', newItem);
    },

    initItems: ({ commit }) => {
      commit('setItems');
    },

    updateItems: ({ commit }, updatedList) => {
      commit('updateItems', updatedList);
    },

    archiveItems: ({ commit }) => {
      commit('deleteItems');
    },
  },

  getters: {
    shoppingList: (state) => state.itemList,
  },
});
