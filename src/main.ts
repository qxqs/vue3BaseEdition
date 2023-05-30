/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-11 16:57:20
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-05-30 15:30:22
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);
app.use(router);
app.mount('#app');


