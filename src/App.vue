<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-11 16:57:20
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-07-25 16:05:13
-->
<template>
  <ConfigProvider :locale="zh_CN" class="">
    <router-view />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from "ant-design-vue";
import zh_CN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
</script>

<style scoped lang="less">
@import url("@/components/global.less");
</style>
