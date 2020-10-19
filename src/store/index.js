import Vue from 'vue';
import Vuex from 'vuex';
import db from '../firebase/init';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemList: [],
    quantityChangeFlag: 0,
  },

  mutations: {
    createItem(state, formattedItem) {
      // add item to database
      db.collection('shoppinglist')
        .add(formattedItem);
      // add item to state
      state.itemList.push(formattedItem);
    },

    setItems(state, itemList) {
      state.itemList = itemList;
    },

    incrementQuantity(state, payload) {
      const { existingId } = payload;
      const { newQuantity } = payload;

      // update quantity of the matching item adding the new quantity
      db.collection('shoppinglist')
        .doc(existingId)
        .update({
          quantity: newQuantity,
        })
        .then(() => {
          for (let i = 0; i < state.itemList.length; i += 1) {
            if (state.itemList[i].id === existingId) {
              state.itemList[i].quantity = newQuantity;
            }
          }
          state.quantityChangeFlag = Math.random();
        });
    },

    updateItems(state, updatedList) {
      // update 'bought' flag in database for the clicked item
      updatedList.forEach((updatedItem) => {
        db.collection('shoppinglist')
          .doc(updatedItem.id)
          .update({
            bought: updatedItem.bought,
          })
          .then(() => {
            state.itemList = updatedList;
          });
      });
    },

    deleteItems(state, itemId) {
      // remove items from database
      db.collection('shoppinglist')
        .doc(itemId)
        .delete();
      // remove items also from state
      state.itemList = state.itemList.filter((item) => item.bought === false);
    },
  },

  actions: {
    addItem: ({ commit, state }, newItem) => {
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

        commit('createItem', formattedItem);
      } else {
        // if a matching item exist in the database, increment its quantity
        let previousQuantity = 0;
        let newQuantity = 0;

        db.collection('shoppinglist').get()
          .then((shoppinglist) => {
            shoppinglist.forEach((item) => {
              const itemData = item.data();

              // determine quantity of the matching item
              if (item.id === existingId) {
                previousQuantity = itemData.quantity;
              }
            });
            newQuantity = parseInt(previousQuantity, 10) + parseInt(newItem.quantity, 10);

            const payload = {
              existingId,
              newQuantity,
            };

            commit('incrementQuantity', payload);
          });
      }
    },

    initItems: ({ commit }) => {
      // initialize shopping list from databse
      const itemList = [];

      db.collection('shoppinglist').get()
        .then((shoppinglist) => {
          shoppinglist.forEach((item) => {
            const itemData = item.data();

            // add document id for each item to have a unique key
            itemData.id = item.id;
            itemList.push(itemData);
          });
          // order items by shop name alphabetically ascending
          itemList.sort((a, b) => {
            if (a.shop < b.shop) {
              return -1;
            }
            if (b.shop > a.shop) {
              return 1;
            }
            return 0;
          });
          commit('setItems', itemList);
        });
    },

    updateItems: ({ commit }, updatedList) => {
      commit('updateItems', updatedList);
    },

    archiveItems: ({ commit }) => {
      // remove items from database where 'bought' flag is true
      db.collection('shoppinglist').get()
        .then((shoppinglist) => {
          shoppinglist.forEach((item) => {
            const itemData = item.data();

            if (itemData.bought) {
              commit('deleteItems', item.id);
            }
          });
        });
    },
  },

  getters: {
    shoppingList: (state) => state.itemList,

    quantityChangeFlag: (state) => state.quantityChangeFlag,
  },
});
