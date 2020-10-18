import Vue from 'vue';
import Vuex from 'vuex';
import db from '../firebase/init';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemList: [],
  },

  mutations: {
    CREATE_ITEM(state, newItem) {
      db.collection('shoppinglist').add({
        bought: false,
        name: newItem.name,
        quantity: newItem.quantity,
        shop: newItem.shop,
      });
    },
    SET_ITEMS(state) {
      const rawList = [];
      state.itemList = [];

      db.collection('shoppinglist').get()
        .then((shoppinglist) => {
          shoppinglist.forEach((item) => {
            const itemData = item.data();

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
    UPDATE_ITEMS(state, updatedList) {
      updatedList.forEach((updatedItem) => {
        db.collection('shoppinglist')
          .doc(updatedItem.id)
          .update({
            bought: updatedItem.bought,
          });
      });
    },
    DELETE_ITEMS(state) {
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
      state.itemList = state.itemList.filter((item) => item.bought === false);
    },
  },

  actions: {
    addItem: ({ commit }, newItem) => {
      commit('CREATE_ITEM', newItem);
    },
    initItems: ({ commit }) => {
      commit('SET_ITEMS');
    },
    updateItems: ({ commit }, updatedList) => {
      commit('UPDATE_ITEMS', updatedList);
    },
    archiveItems: ({ commit }) => {
      commit('DELETE_ITEMS');
    },
  },

  getters: {
    shoppingList: (state) => state.itemList,
  },
});
