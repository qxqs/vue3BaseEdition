/*
 * @Description: 公共接口封装
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-16 13:50:09
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-02-02 16:29:15
 */
import { axios } from "@/utils/request";
export const commonApi = new (class {
  api: string;
  constructor() {
    this.api = "/api/login";
  }
  // 例子
  Login(data: Object) {
    return axios({ url: this.api, data, method: "post" });
  }
})();
