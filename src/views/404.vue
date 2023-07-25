<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2023-07-24 15:34:54
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-07-24 15:45:54
-->
<template>
  <Result status="404" title="404" sub-title="很抱歉, 您访问的页面不存在">
    <template #extra>
      <Button type="primary" @click="backHome">回到首页</Button>
    </template>
  </Result>
</template>

<script lang='ts' setup>
import router from '@/router';
import { Result,Button } from 'ant-design-vue';
const backHome = ()=>{
  router.push({path:'/'})
}
</script>

<style scoped lang="less">

</style>
