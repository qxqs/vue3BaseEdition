/*
 * @Description: 左侧菜单
 * @Version: 1.0
 * @Autor: jiajun.wu
 * @Date: 2022-07-26 14:42:26
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-07-25 14:30:00
 */
import { defineComponent, h, onMounted, ref, watch } from 'vue'
import Events from '@/utils/Event';
import router from '@/router'
import { Menu, SubMenu, MenuItem } from 'ant-design-vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import moduleLess from './index.module.less'
import { RouteRecordRaw } from 'vue-router';
import { SelectInfo } from 'ant-design-vue/lib/menu/src/interface';
import { Key } from 'ant-design-vue/lib/_util/type';

const LayoutMenu = defineComponent({
  name: 'LayoutMenu',
  setup() {
    const openKeys = ref<Array<Key>>([]) // 展开的节点
    const selectedKeys = ref<Array<Key>>([]) // 当前选中节点
    const preOpenKeys = ref<Array<Key>>([])
    const menuStatus = ref(false)
    watch(
      () => openKeys.value,
      (_val, oldVal) => {
        preOpenKeys.value = oldVal;
      },
      { deep: true }
    );
    watch(
      () => router.currentRoute.value,
      (_val) => {
        selectedKeys.value = _val && _val.meta ? [ (_val.meta.menu as Key) || _val.path ] : []
      },
      { deep: true,immediate:true }
    );
    onMounted(() => {
      Events.on('foldMenu', status => {
        menuStatus.value = status
        if (!menuStatus.value) {
          openKeys.value = preOpenKeys.value;
        }
      })
    })
    const renderMenuItem = (menuItem: RouteRecordRaw):any => {
      const childrenList: any = []
      menuItem.children?.map(e => childrenList.push(renderMenuItem(e)))
      if(menuItem.children){
        return h(SubMenu, {
          key: menuItem.path,
        },{
          icon:()=>h(<SettingOutlined />),
          title:()=>menuItem.meta?.title,
          default:()=>childrenList
        })
      }else{
        return h(MenuItem, {
          key: menuItem.path,
        }, () => [menuItem.meta?.title])
      }
    }

    /** 菜单点击事件 */
    const menuSelect = (record: SelectInfo) => {
      router.push(record.key as string)
    }

    return () => {
      return h('div', {
        class: [moduleLess.unfoldMenu,'scrollbar'],
      }, [
        h(Menu, {
          mode: "inline",
          inlineCollapsed: menuStatus.value,
          selectedKeys:selectedKeys.value,
          openKeys: openKeys.value,
          onSelect: menuSelect,
        }, ()=>router.options.routes.filter(e => !e.meta?.hidden).map(val => renderMenuItem(val))),
      ])
    }
  }
})

export default LayoutMenu