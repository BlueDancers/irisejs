import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
// @ts-ignore
import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
  plugins: [
    vue(),
    // 生成dts文件
    dts({
      entryRoot: 'src',
      outputDir: ['../../irise/src'],
      tsConfigFilePath: '../../tsconfig.json',
    }),
    DefineOptions(), // 为了支持vue3.0的defineOptions
  ],
  build: {
    minify: false, //压缩
    rollupOptions: {
      external: ['vue', 'less'], // 忽略打包vue文件
      input: ['index.ts'],
      output: [
        {
          format: 'es', // 打包格式
          entryFileNames: '[name].mjs', // 打包后文件名
          preserveModules: true, // 让打包目录和我们目录对应
          exports: 'named',
          dir: '../../irise', // 配置打包根目录
        },
      ],
    },
    lib: {
      entry: './index.ts',
    },
  },
})
