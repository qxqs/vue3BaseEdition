/*
 * @Description: 系统接口封装
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-16 13:50:09
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-07-24 16:23:46
 */
import { axios } from "@/utils/request";
export const systemApi = new (class {
  api: string;
  logoutApi: string;
  constructor() {
    this.api = "/api/login";
    this.logoutApi = "/api/logout";
  }
  // 例子-登录
  Login(data: Object) {
    return axios({ url: this.api, data, method: "post" });
  }
  // 例子-退出
  LogOut(data: Object) {
    return axios({ url: this.logoutApi, data, method: "post" });
  }
})();
