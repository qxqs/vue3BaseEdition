/*
 * @Description: vuex工具配置
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-15 17:44:41
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-07-24 17:00:14
 */
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import user, { UserState } from './modules/user'
import getters from "./getters";
export interface RootState {
  user: UserState
}
export const key: InjectionKey<Store<RootState>> = Symbol();
export function useStore() {
  return baseUseStore(key)
}
export const store: Store<RootState> = createStore({
  getters,
  modules: {
    user
  }
})