/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-11 16:57:20
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-07-24 17:06:12
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { store, key } from './store';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);
app.use(store, key)
.use(router)
.mount('#app');


