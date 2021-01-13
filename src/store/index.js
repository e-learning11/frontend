import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newNotification: {
      state: true,
      Message: "Hey! Nice to Have you here"
    },
    currentUser: null
  },
  mutations: {},
  actions: {},
  modules: {}
});
