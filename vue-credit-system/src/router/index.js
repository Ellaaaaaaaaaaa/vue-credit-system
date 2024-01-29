import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/views/Login";

Vue.use(VueRouter);

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
  {
    path: "/loan-input",
    component: () => import("@/layout/layout.vue"),
    redirect: "/loan-input/index",
    meta: {
      title: "贷款管理",
    },
    children: [
      {
        path: "/loan-input/index",
        component: () => import("@/views/loan-input/index.vue"),
        name: "loan-input",
        meta: {
          title: "贷款申请",
        },
      },
    ],
  },
  {
    path: "/application-manage",
    component: () => import("@/layout/layout.vue"),
    redirect: "/application-manage/index",
    meta: {
      roles: ["input"],
      title: "申请管理",
    },
    children: [
      {
        path: "/application-manage/index",
        component: () => import("@/views/application-manage/index.vue"),
        name: "/application-manage",
        meta: {
          title: "申请列表",
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
