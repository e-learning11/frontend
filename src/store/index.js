import Vue from "vue";
import Vuex from "vuex";
import english from "@/languages/english.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newNotification: {
      state: false,
      Message: "Hey! Nice to Have you here"
    },
    currentUser: null,
    CourseInfo: {
      Name: "",
      Description: "",
      Summary: "",
      photo: null,
      Gender: null,
      Prerequisites: [],
      URL: null,
      Age: [0, 70],
      components: [],
      sections: []
    },
    language: english
  },
  mutations: {},
  actions: {},
  modules: {}
});
