/*
 * @Description: 路由配置
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-15 17:04:54
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2022-11-16 13:41:23
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routers = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
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