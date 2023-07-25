/*
 * @Description: 基础布局
 * @Version: 1.0
 * @Autor: jiajun.wu
 * @Date: 2022-07-26 14:42:26
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-07-24 13:54:42
 */
import { defineComponent, h } from 'vue'
import { Layout, LayoutContent } from 'ant-design-vue'
import moduleLess from './index.module.less'
import LayoutHeader from './layout-header'
import layoutMenu from './layout-menu'
import { RouterView } from 'vue-router'

const BasicLayout = defineComponent({
  name: 'BasicLayout',
  setup() {
    return () => {
      return h(Layout, {class:moduleLess.LayoutStyle}, () => [
        h(LayoutHeader),
        h(Layout, {class:moduleLess.RightLayoutStyle}, () => [
          h(layoutMenu),
          h(LayoutContent,()=>[h(RouterView)]),
        ])
      ])
    }
  }
})

export default BasicLayout


