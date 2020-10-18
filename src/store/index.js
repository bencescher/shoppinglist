import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemList: [],
  },

  mutations: {
    CREATE_ITEM(state, newItem) {
      state.itemList.push(newItem);
    },
    SET_ITEMS(state) {
      state.itemList = [
        {
          name: 'croissant',
          quantity: 3,
          shop: 'Aldi',
          bought: false,
        },
        {
          name: 'chocolate',
          quantity: 9,
          shop: 'Auchan',
          bought: false,
        },
        {
          name: 'cat litter',
          quantity: 1,
          shop: 'Aldi',
          bought: false,
        },
        {
          name: 'plate',
          quantity: 4,
          shop: 'Ikea',
          bought: false,
        },
        {
          name: 'Orange juice',
          quantity: 1,
          shop: 'Lidl',
          bought: false,
        },
        {
          name: 'Toast bread',
          quantity: 1,
          shop: 'Auchan',
          bought: false,
        },
        {
          name: 'Onion',
          quantity: 5,
          shop: 'Lidl',
          bought: false,
        },
        {
          name: 'Cheese',
          quantity: 1,
          shop: 'Aldi',
          bought: false,
        },
        {
          name: 'Toothbrush',
          quantity: 2,
          shop: 'Rossmann',
          bought: false,
        },
        {
          name: 'Shampoo',
          quantity: 1,
          shop: 'Rossmann',
          bought: false,
        },
      ];
    },
    UPDATE_ITEMS(state, updatedList) {
      state.itemList = updatedList;
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
  },

  getters: {
    shoppingList: (state) => state.itemList,
  },
});
