import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import ViewProfile from "../views/UserProfile.vue";
import CreateBlog from "../views/CreateBlog.vue";
import Post from "../views/Post.vue";
import Err from "../views/404.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
      path: "/user/:uid",
      name: "viewprofile",
      component: ViewProfile,
    },
    {
      path: "/create",
      name: "createblog",
      component: CreateBlog,
    },
    {
      path: "/post/:id",
      name: "post",
      component: Post,
    },
    {
      path: "/:pathmatch(.*)*/",
      name: "Err",
      component: Err,
    },
  ],
});

export default router;
