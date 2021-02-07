import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Courses from "../views/Courses.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import EditProfile from "../views/EditProfile.vue";
import CourseContent from "../views/CourseContent.vue";
import CourseMain from "../views/CourseMain.vue";
import CreateAndEditCourse from "../views/CreateAndEditCourse.vue";
import CourseOverview from "../views/CourseOverview.vue";
import NotFound from "../views/NotFound.vue";

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
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfile
  },
  {
    path: "/course/:courseId/",
    name: "CourseMain",
    component: CourseMain
  },
  {
    path: "/course/:courseId/overview",
    name: "CourseOverview",
    component: CourseOverview
  },
  {
    path: "/course/:courseId/edit",
    name: "EditCourse",
    component: CreateAndEditCourse
  },
  {
    path: "/course/:courseId/:componentNumber",
    name: "CourseContent",
    component: CourseContent
  },
  {
    path: "/createcourse",
    name: "CreateCourse",
    component: CreateAndEditCourse
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
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
