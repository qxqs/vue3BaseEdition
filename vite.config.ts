/*
 * @Description: vite配置文件
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2022-11-11 16:57:20
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2022-11-29 18:12:55
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  // 开发配置
  plugins: [
    vue(),
    // 提供传统浏览器兼容性支持
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    // 编译JSX文件
    vueJsx(),
    // gzip 压缩
    viteCompression()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
      '#': path.join(__dirname, 'types'), // 设置 `@` 指向 `src` 目录
    },
  },
  // 打包配置
  build: {
    outDir: "baseEdition",
    target: "esnext",
    minify: "terser", // 混淆器，terser 构建后文件体积更小，'terser' | 'esbuild'
    chunkSizeWarningLimit: 1500, //chunk 大小警告的限制，默认500KB
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        // 用于命名代码拆分时创建的共享块的输出命名，[name]表示文件名,[hash]表示该文件内容hash值
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/')
            : [];
          const fileName =
            facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].[hash].js`;
        },
      }
    },
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      // 10月更新
      output: {
        comments: true, // 去掉注释内容
      },
    },
  },
  // 全局样式配置
  css: {
    // 全局变量+全局引入less
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    },
  },
  // 代理配置
  server: {
    port: 8000,
    host: '0.0.0.0',
    proxy: {
      "/api": {
        secure: false,// securea是否校验https合法性 如果代理的是http接口，需要配置这个参数
        target: `代理地址`,// 服务器端接口地址
        changeOrigin: true, // 代理的接口是否跨域
        // ws:true, // 如果要代理webSockets，配置这个参数
      },
    }
  }
})
