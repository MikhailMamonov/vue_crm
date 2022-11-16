import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { auth: true, layout: "main" },
    component: () => import("../views/vHome.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("../views/vLogin.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { auth: true, layout: "main" },
    component: () => import("../views/vCategories.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { auth: true, layout: "main" },
    component: () => import("../views/vHistory.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { auth: true, layout: "main" },
    component: () => import("../views/vDetailRecord.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { auth: true, layout: "main" },
    component: () => import("../views/vPlanning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { auth: true, layout: "main" },
    component: () => import("../views/vProfile.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { auth: true, layout: "main" },
    component: () => import("../views/vRecord.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("../views/vRegister.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-active",
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
