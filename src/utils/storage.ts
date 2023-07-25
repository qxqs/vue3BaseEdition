/*
 * @Description: 存储
 * @Version: 1.0
 * @Autor: jiajun.wu
 * @Date: 2022-07-26 15:05:21
 * @LastEditors: jiajun.wu
 * @LastEditTime: 2022-09-08 15:03:27
 */

import { Storage, sessionStorage } from 'ynos-storage'
import defaultSettings from '@/config/defaultSettings'
import Cookies from 'js-cookie'

/** 本地存储  LocalStorage */
export let LocalStorage = Storage.useStorage({ namespace: defaultSettings.storageOptions.namespace }).ls
/** 本地会话  SessionStorage */
export let SessionStorage = sessionStorage.useStorage()
// /** Cookie  Cookie */
export let Cookie = Cookies