import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 在移动端，会将 px 转换为 vw 单位，实现等比例缩放
// 在 PC 端，当宽度超过 1200px 时，会自动停止缩放
// 所有设备上保持相同的布局，只是等比例缩放大小
import viewport from 'postcss-mobile-forever'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    postcss: {
      plugins: [

        viewport({
          appSelector: '#app',
          viewportWidth: 375,    // 设计稿宽度
          maxDisplayWidth: 1200, // pc端最大显示宽度
          unitPrecision: 3,      // 转换后的精度，即小数点位数
          propList: ['*'],
          border: true,
        }),
      ],
    },
    preprocessorOptions: {
      less: {
        math: "always", // 括号内才使用数学计算
        globalVars: {
          // 全局变量
          mainColor: "red",
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',  // 添加这行，使服务器可以被外部访问
    port: 3000,
    proxy: {
      // 在此处为需要解决跨域的 API 配置代理
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 去掉 /api 前缀
      },
      '/real': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/real/, '') // 去掉 /real 前缀
      },
    }
  }
})
