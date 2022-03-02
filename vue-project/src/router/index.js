import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import UserHome from "../views/UserHome.vue";
import ViewProfile from "../views/UserProfile.vue";
import CreateBlog from "../views/CreateBlog.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/userhome",
      name: "userhome",
      component: UserHome,
    },
    {
      path: "/user/:uid",
      name: "viewprofile",
      component: ViewProfile,
    },
    {
      path: "/create",
      name: "createblog",
      component: CreateBlog,
    },
  ],
});

export default router;
