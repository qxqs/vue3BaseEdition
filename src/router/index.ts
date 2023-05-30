/*
 * @Description: 路由配置
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-15 17:04:54
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2022-11-23 14:56:06
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

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

// 路由守卫
router.beforeEach((to, from, next) => {
  next()
})

export default router;