import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/Register.vue")
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/layouts/Users/Users.vue")
  },
  {
    path: "/users/edit/:id",
    name: "User edit",
    component: () => import("../views/layouts/Users/User_edit.vue")
  },
  {
    path: "/todos",
    name: "Todos",
    component: () => import("../views/layouts/Todos/Todos.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
