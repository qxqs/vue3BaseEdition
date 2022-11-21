/*
 * @Description: 请求拦截器
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-16 14:02:01
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2022-11-16 14:12:43
 */
import { store } from "@/store";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const service = axios.create({
  timeout: 60000,
  baseURL: ''
})

// 请求失败回调函数处理
const error = (error: { request: AxiosRequestConfig, response: AxiosResponse }) => {
  if (error.response.status === 401) {
    // 登录过期或未登录
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
