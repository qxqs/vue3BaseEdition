# vue3项目基础框架搭建流程

### 1.创建项目

```
npm init vite
```

### 2.安装依赖

**项目创建完成之后是没有node_modules包的，需要手动安装依赖**

```
npm i
```

**初始化依赖后再安装项目所需基础依赖**

```
npm i -save vue-router vuex axios
```

**安装开发所需依赖**

```
npm i -D less less-loader
```

### 3.ts全局配置

**在tsconfig.json中添加配置，全局类型、接口**

```
"include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "types/**/*.d.ts",
    "types/**/*.ts"
],
```

### 4.配置项目路径别名

**在tsconfig.json中添加配置，处理通过"@/"引入文件时ts报错问题**

```
"compilerOptions": {
...
"baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ],
      "#/*": [
        "types/*"
      ]
    }
}
```

**在vite.config.ts中添加配置，处理通过"@/"引入文件时运行报错问题**

```
// 引入path时会标红，需要安装响应的type依赖 npm i @types/node
import * as path from 'path'
// 或 const path = require('path')
export default ({ mode }) => {
  return defineConfig({
      resolve: {
          alias: {
              '@': path.join(__dirname, 'src'),
              '#': path.join(__dirname, 'types'); 
          }
      },
  })
}
```

### 5.创建页面文件夹

**在src文件夹下面创建views文件，其下传创建home/index.vue文件**

```
<template>
  <div>首页</div>
</template>
<script lang='ts' setup>
import { reactive, ref, toRefs } from 'vue'
</script>
<style scoped lang="less">
</style>
```

### 6.配置路由

**在src文件夹下面创建router文件夹，其下创建index.ts文件**

```
//index.ts
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
```

**在main.ts文件中引入**

```
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

import router from './router'
// 初始化路由
app.use(router)
app.mount('#app')

```

**在APP.vue文件使用router-view组件**

```
<template>
  <router-view />
</template>
<script lang='ts' setup>
</script>
<style scoped lang="less">
</style>
```

### 7.配置vuex

**在src文件夹下面创建store文件夹，其下创建index.ts文件**

```
//index.ts
import { createStore } from 'vuex'
export const store = createStore({
  state() {
    return {

    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
```

**在main.ts文件中引入**

```
...
// 初始化vuex
import store from './store'
app.use(store)
```

### 8.封装axios请求接口，配置请求拦截器

**在src文件夹下面创建api文件夹，其下创建index.ts及request.ts文件**

**1.在request.ts文件配置请求拦截器**

```
// request.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const service = axios.create({
  timeout: 60000,
  baseURL: ''
})

// 请求失败回调函数处理
const error = (error: { request: AxiosRequestConfig, response: AxiosResponse }) => {
  if (error.response.status === 401) {
    // 登录状态过期或未登录
  }
  return Promise.reject(error)
}

// 请求前
service.interceptors.request.use((request: AxiosRequestConfig) => {
  return request
}, error)

// 响应后
service.interceptors.response.use((response: AxiosResponse) => {
  return response
}, error)

export { service as axios }
```

**2.在src文件夹下面创建interface文件夹，其下创建request.ts文件，配置请求接口需要的类型**

```
// request.ts
/** 普通数据响应 */
export interface ResDataStruct<T = any> {
  /** 响应内容体 */
  data: T,
  /** api响应信息 */
  message: string,
  /** api响应编码 */
  code: number,
  /** api接口返回是否成功 */
  success: boolean,
  /** api接口查询数据库总数 */
  total: number | string | null,
}
```

**3.在index.ts文件封装axios请求**

```
// index.ts
import { ResDataStruct } from "@/interface/request";
import { axios } from "@/utils/request"
export const httpApi = new class {
    constructor() {
        // 请求接口路径
        this.loginApi = '/login/login' // 登录
    }
    Login( data: Object)){
        return axios<ResDataStruct<T>>({ url: this.loginApi, method: "post", data })
    }
}
```

### 9.创建全局配置文件

**在src文件夹下创建hooks(配置共用函数)、interface(定义全局接口类型)、types(定义全局类型别名)文件夹，以及在相应的文件夹下创建index.ts文件**

### 10.扩展

#### 一、扩展插件

**1.vite插件@vitejs/plugin-legacy的作用是为打包后的文件提供传统浏览器兼容性支持**

```
// npm 安装依赖
npm i -save @vitejs/plugin-legacy

// vite.config.ts
import legacy from '@vitejs/plugin-legacy'
export default defineConfig({
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        }),
        ...
    ],
})
```

**2.vite插件vite-plugin-compression的作用是做 gzip 压缩，**`vite-plugin-compress`的增强版，

```
// npm 安装依赖
npm i -save vite-plugin-compression

// vite.config.ts
import viteCompression from 'vite-plugin-compression'
export default defineConfig({
    plugins: [
        viteCompression(),
        ...
    ],
})
```

**3.vite插件vite-plugin-rsw的作用 - 基于 vite 实现的 webAssembly 插件，支持热更新，友好的报错提示**

```
// npm 安装依赖
npm i -save vite-plugin-rsw
```

**4.vite插件@vitejs/plugin-vue-jsx的作用是为编译JSX文件**

```
// npm 安装依赖
npm i -save @vitejs/plugin-vue-jsx

// vite.config.ts
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
    plugins: [
        vueJsx(),
        ...
    ],
})
```
