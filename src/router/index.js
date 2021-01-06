import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Courses from "../views/Courses.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/courses",
    name: "courses",
    component: Courses
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  }
});

export default router;

// // route level code-splitting
// // this generates a separate chunk (about.[hash].js) for this route
// // which is lazy-loaded when the route is visited.
// component: () =>
//   import(/* webpackChunkName: "about" */ "../views/About.vue")
