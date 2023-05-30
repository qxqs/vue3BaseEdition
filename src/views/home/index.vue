<!--
 * @Description: 首页
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-15 17:16:04
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-05-30 16:53:44
-->
<template>
  <section class="layout">
    <section class="layout-menu">
      <q-menu />
    </section>
    <section class="layout-centent">
      <q-header />
      <section class="layout-router">
        <div>
          main content
        </div>
        <footer class="layout-footer">Copyright @ 2021 管理系统开发模板</footer>
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import QHeader from "./components/Header/index";
import QMenu from "./components/Menu/index.vue";
</script>

<style scoped lang="less">
.layout {
  display: flex;
  height: 100%;
  .layout-menu {
    height: 100%;
    background: #d0e03f;
    transition: all .1s;
  }
  .layout-header {
    height: 60px;
    background: #0c5488;
  }
  .layout-centent {
      height:100%;
      flex: 1;
    .layout-router {
      height: calc(100% - 60px);
      position: relative;
      background: #64e04b;
    }
  }
  .layout-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #fff;
    background: #7dbcea;
  }
}
</style>
