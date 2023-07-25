/*
 * @Description: 路由配置
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-15 17:04:54
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-07-25 16:13:51
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import layout from "@/components/layout/layout";
/* 页面加载进度条 */
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
const routers: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    component: layout,
    children: [
      {
        path: "/pageHome",
        redirect: "/home",
        meta: { title: "首页", hidden: false },
        children: [
          {
            path: "/home",
            name: "home",
            component: () => import("@/views/Home/index.vue"),
            meta: { title: "版本对比", hidden: false },
          },
          {
            path: "/home1",
            name: "home1",
            component: () => import("@/views/Home/index.vue"),
            meta: { title: "版本对比1", hidden: false },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/index.vue"),
    meta: { title: "登录", hidden: true },
  },
  {
    path: "/:pathMatch(.*)",
    //访问主页的时候 重定向到index页面
    redirect: "/404",
  },
  {
    path: "/404",
    name: "/404",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers as unknown as RouteRecordRaw[],
});

// 路由守卫-跳转前
router.beforeEach((to, from, next) => {
  NProgress.start(); //开启进度条
  next();
});

// 路由守卫-跳转后
router.afterEach(() => {
  NProgress.done(); //完成进度条
});
export default router;
