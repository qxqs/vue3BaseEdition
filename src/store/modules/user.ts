/*
 * @Description: 用户信息
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2023-07-24 16:01:03
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-07-24 17:00:56
 */
import { Module } from "vuex";
import { RootState } from "../index";
import { systemApi } from "@/api";
import { Cookie, LocalStorage, SessionStorage } from "@/utils/storage";
import router from "@/router";

export interface UserState {
  /** 用户信息 */
  userInfo: any;
}
const user: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    userInfo: {
      name:'管理员'
    },
  },
  mutations: {
    SET_INFO: (state, info) => {
      state.userInfo = info;
    },
  },
  actions: {
    /* 退出登录-清除缓存 */
    LogOut: ({ commit }) => {
      systemApi.LogOut({}).then((res: any) => {
        // 清除所有缓存-退回登录页
        commit("SET_INFO", undefined);
        LocalStorage.clear();
        SessionStorage.clear();
        Cookie.remove("token");
        router.push({path:'/login'})
      });
    },
    /* 登录-获取用户信息 */
    Login: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        systemApi.Login(data).then((res: any) => {
          if (res.success) {
            // 储存token、用户信息
            Cookie.set("token", res.token);
            commit("SET_INFO", res.userInfo);
            resolve(res);
          } else {
            reject();
          }
        });
      });
    },
  },
};

export default user;
