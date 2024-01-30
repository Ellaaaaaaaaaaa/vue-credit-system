import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/views/Login";
import store from "@/store";


Vue.use(VueRouter);
if (localStorage.getItem("token")) {
  store.dispatch("getMenuList");
}
const routes = [
  {
    path: "/",
    redirect: "/login",
    component: LoginView,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    redirect: "/home",
    //下面这两个页面按照层级自行创建
    component: () => import("@/layout/layout.vue"),
    children: [
      {
        meta: {
          title: "首页",
        },
        path: "/home",
        component: () => import("@/views/home.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
