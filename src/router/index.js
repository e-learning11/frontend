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
import CourseForum from "../views/CourseForum.vue";
import SingleQuestionForum from "../views/SingleQuestionForum.vue";
import CreateAndEditCourse from "../views/CreateAndEditCourse.vue";
import CourseOverview from "../views/CourseOverview.vue";
import NotFound from "../views/NotFound.vue";
import Admin from "../views/Admin.vue";
import ResetPassword from "../views/ResetPassword.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import News from "../views/News.vue";
import NewsStory from "../views/NewsStory.vue";
import ConfirmEmail from "../views/ConfirmEmail.vue";

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
    path: "/resetpassword",
    name: "ResetPassword",
    component: ResetPassword
  },
  {
    path: "/forget",
    name: "ForgetPassword",
    component: ForgetPassword
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/news",
    name: "News",
    component: News
  },
  {
    path: "/news/:story",
    name: "NewsStroy",
    component: NewsStory
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
    path: "/course/:courseId/forum",
    name: "CourseForum",
    component: CourseForum
  },
  {
    path: "/course/:courseId/forum/:question",
    name: "SingleQuestionForum",
    component: SingleQuestionForum
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
    path: "/confirmemail/:confirmationCode",
    name: "ConfirmEmail",
    component: ConfirmEmail
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
