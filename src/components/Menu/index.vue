<!--
 * @Description: 菜单组件
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-15 17:16:04
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-05-30 16:44:33
-->
<template>
  <Menu
      class="unfold-menu"
      :class="{'fold-menu':menuStatus}"
      v-model:openKeys="openKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="menuStatus"
    >
      <MenuItem key="1">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>Option 1</span>
      </MenuItem>
      <MenuItem key="2">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>Option 2</span>
      </MenuItem>
      <MenuItem key="3">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Option 3</span>
      </MenuItem>
      <SubMenu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>Navigation One</template>
        <MenuItem key="5">Option 5</MenuItem>
        <MenuItem key="6">Option 6</MenuItem>
        <MenuItem key="7">Option 7</MenuItem>
        <MenuItem key="8">Option 8</MenuItem>
      </SubMenu>
      <SubMenu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Navigation Two</template>
        <MenuItem key="9">Option 9</MenuItem>
        <MenuItem key="10">Option 10</MenuItem>
        <SubMenu key="sub3" title="Submenu">
          <MenuItem key="11">Option 11</MenuItem>
          <MenuItem key="12">Option 12</MenuItem>
        </SubMenu>
      </SubMenu>
    </Menu>
</template>

<script lang='ts' setup>
import Events from '@/utils/Event';
import { PieChartOutlined,AppstoreOutlined,MailOutlined,InboxOutlined,DesktopOutlined } from '@ant-design/icons-vue';
import { Menu,SubMenu,MenuItem } from 'ant-design-vue';
import { onMounted, reactive, ref, toRefs, watch } from 'vue'
const openKeys = ref<Array<string>>([])
const preOpenKeys = ref<Array<string>>([])
const menuStatus = ref(false)
watch(
  () => openKeys.value,
  (_val, oldVal) => {
    preOpenKeys.value = oldVal;
  },
  {deep:true}
);
onMounted(()=>{
  Events.on('foldMenu',status=>{
    menuStatus.value = status
    if(!menuStatus.value){
      openKeys.value = preOpenKeys.value;
    }
    
  })
})
</script>

<style scoped lang="less">
.fold-menu,.unfold-menu{
  height: 100%;
}
.unfold-menu{
  width: 200px;
}
.fold-menu{
  width: 80px;
}

</style>
