import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin' // 引入
import viteCompression from 'vite-plugin-compression'
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill'
import inject from '@rollup/plugin-inject'
import vitePluginImp from 'vite-plugin-imp'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  //静态资源服务的文件夹
  publicDir: "public",
  base: '/',

  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      filter: (filter) => {
        if (
            filter.includes('/token-explorer') ||
            filter.includes('/transparencyBg') ||
            filter.includes('/main-bg') ||
            filter.includes('/reportFrame')
          ) {
          return false
        } else {
          return true
        }
      }
    }),
    viteCompression({
      verbose: true, //是否在控制台输出压缩结果
      disable: false, //是否禁用,相当于开关在这里
      deleteOriginFile: false, // 压缩后是否删除原文件，默认为 false
      threshold: 1024000, // 对大于 1mb 的文件进行压缩
      algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz', //文件后缀
    }),
    PkgConfig(),
    OptimizationPersist()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "@/assets": path.resolve(__dirname, 'src/assets'),
      "@/components": path.resolve(__dirname, 'src/components'),
      "@/constants": path.resolve(__dirname, 'src/constants'),
      "@/hooks": path.resolve(__dirname, 'src/hooks'),
      "@/i18n": path.resolve(__dirname, 'src/i18n'),
      "@/state": path.resolve(__dirname, 'src/state')
    }
  },

  define: {
    'process.env': {}
  },

  // 强制预构建插件包
  optimizeDeps: {
    include: ['axios'],  //用于鉴权
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true
            })
        ]
    }
  },

  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 支持内联 JavaScript
        charset: false
      },
      
    }
  },

  server: {
    host: true,
    port: 8080, // 开发环境启动的端口
    open: true,
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://127.0.0.1:8080/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 将 /api 重写为空
      },
    }
  },

  //打包配置
  build: {
    //浏览器兼容性  "esnext"|"modules"
    target: "modules",
    //指定输出路径
    outDir: "dist",
    //生成静态资源的存放路径
    assetsDir: "assets",
    //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 100000,
    //启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    //构建后是否生成 source map 文件
    sourcemap: false,
    polyfillModulePreload: true, // 是否自动注入 module preload 的 polyfill
    //自定义底层的 Rollup 打包配置
    rollupOptions: {
      output: {
        // 静态资源分拆打包 最小化拆分包
        manualChunks: (id) => {
          // 需要单独分割那些资源 就写判断逻辑就行
          if (id.includes('i18n')) {
            return 'locale.js';
          }
          // 需要单独分割那些资源 就写判断逻辑就行
          // if (id.includes("page/")) {
          //   return id
          //     .toString()
          //     .split("page/")[1]
          //     .split("/")[0]
          //     .toString()
          // }
          // 最小化拆分包
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString()
          }
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'js/[name].[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'js/[name].[hash].js',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: '[ext]/[name].[hash].[ext]',
      },
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
    //@rollup/plugin-commonjs 插件的选项
    commonjsOptions: {
      transformMixedEsModules: true
    },
    //当设置为 true，构建后将会生成 manifest.json 文件
    manifest: false,
    // 设置为 false 可以禁用最小化混淆，
    // 或是用来指定使用哪种混淆器
    // boolean | 'terser' | 'esbuild'
    minify: "terser", //terser 构建后文件体积更小
    //设置为 false 来禁用将构建后的文件写入磁盘
    write: true,
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    //启用/禁用 brotli 压缩大小报告
    brotliSize: true,
    //chunk 大小警告的限制
    chunkSizeWarningLimit: 500,
    //关闭文件计算
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      }
    }
  }
})
