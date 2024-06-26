import Vue from "vue";
import Vuex from "vuex";
import english from "@/languages/english.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newNotification: {
      state: false,
      Message: "Hey! Nice to Have you here",
      color: "success"
    },
    currentUser: null,
    CourseInfo: {
      name: "",
      description: "",
      summary: "",
      photo: null,
      gender: null,
      prerequisites: [],
      CourseCategories: [],
      url: null,
      age: [0, 70],
      private: false,
      nonBlocking: false,
      components: [],
      sections: [],
      deleted: []
    },
    language: english
  },
  mutations: {},
  actions: {},
  modules: {}
});
