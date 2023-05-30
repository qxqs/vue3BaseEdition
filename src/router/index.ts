/*
 * @Description: 路由配置
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-15 17:04:54
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-05-30 14:25:13
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

/* 页面加载进度条 */
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
const routers = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers as unknown as RouteRecordRaw[]
})

// 路由守卫-跳转前
router.beforeEach((to, from, next) => {
  NProgress.start(); //开启进度条
  next()
})

// 路由守卫-跳转后
router.afterEach(() => {
  NProgress.done(); //完成进度条
});
export default router;