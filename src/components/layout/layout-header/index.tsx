/*
 * @Description: 头部
 * @Version: 1.0
 * @Autor: jiajun.wu
 * @Date: 2022-07-26 14:42:26
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-07-25 11:02:45
 */
import { CaretDownOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Avatar, Dropdown, Menu, MenuItem, MenuProps, Modal } from 'ant-design-vue'
import { defineComponent, h, markRaw } from 'vue'
import { useStore } from "@/store";
import moduleLess from './index.module.less'
import { MenuItemFace } from "./config";
import router from '@/router';
const LayoutHeader = defineComponent({
  name: 'LayoutHeader',
  setup() {
    const store = useStore()||{}
    const leftRenter = () => {
      return h('div', {}, ['logo'])
    }
    const rightRenter = () => {
      return h('div', { class: moduleLess['header-userInfo'] }, [
        h(Avatar, { size: "64", class: moduleLess['header-userInfo-avatar'] }, { icon: () => <UserOutlined /> }),
        h(Dropdown, {placement:'bottomRight'}, {
          default: () => h('div', { class: moduleLess['header-userInfo-name'] }, [
            h('span', [store.getters&&store.getters.userInfo && (store.getters.userInfo.name ?? '清风徐来')]), 
            h(<CaretDownOutlined />)
          ]),
          overlay: () => h(Menu, { onClick: menuClick }, () => menuItemRender())
        })
      ])
    }
    const menuClick = (e: MenuItemFace) => {
      if (e.key == '/logout') {
        // 弹出退出登录确认框
        Modal.confirm({
          title: '是否确认退出登录?',
          icon: h(ExclamationCircleOutlined),
          onOk() {
            router.push({ path: e.key })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      } else {
        router.push({ path: e.key })
      }
    }
    const menuItemRender = () => {
      let menus: MenuItemFace[] = [
        { title: '个人设置', key: '/basicSetup',iconType:h(UserOutlined)},
        { title: '个人中心', key: '/userInfo',iconType:h(UserOutlined) },
        { title: '退出登录', key: '/logout',iconType:h(UserOutlined) },
      ]
      return menus.map(e => {
        return h(MenuItem, {key:e.key},{
          default:()=>[e.iconType,e.title]
        })
      })
    }

    return () => {
      return h('div', { class: moduleLess.header }, [leftRenter(), rightRenter()])
    }
  }
})

export default LayoutHeader