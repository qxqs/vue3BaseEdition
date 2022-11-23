/*
 * @Description: ts文件引入.vue文件配置
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-21 12:21:49
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2022-11-22 16:04:34
 */
/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
