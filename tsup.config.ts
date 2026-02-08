import { defineConfig } from 'tsup'

export default defineConfig({
  /**
   * 指定要打包的入口文件
   * - 支持字符串或数组格式
   * - 支持 glob 模式匹配多个文件
   * - 相对路径基于项目根目录
   */
  entry: ['./src/index.ts'],
  /**
   * 指定输出的模块格式
   * - 'cjs': CommonJS 格式，适用于 Node.js
   * - 'esm': ESM 格式，适用于现代浏览器和打包工具
   * - 'iife': 立即执行函数，适用于浏览器脚本
   */
  format: ['cjs', 'esm'],
  /**
   * 是否生成 TypeScript 声明文件 (.d.ts)
   * - true: 自动为每个入口文件生成对应的 .d.ts 文件
   * - false: 不生成类型声明文件
   * - 对象: 详细配置生成选项
   */
  dts: true,
  /**
   * 是否进行代码分割
   * - true: 将公共代码提取到单独的文件中
   * - false: 每个入口文件独立打包（推荐用于库开发）
   */
  splitting: false,
  /**
   * 是否生成 sourcemap 文件
   * - true: 生成 .map 文件，便于调试
   * - false: 不生成，减小打包体积
   */
  sourcemap: false,
  /**
   * 是否在构建前清理输出目录
   * - true: 每次构建前清空 dist 目录
   * - false: 保留之前的构建文件
   */
  clean: true,
  /**
   * 输出目录
   * - 默认: 'dist'
   */
  outDir: 'dist',
  /**
   * 是否压缩代码
   * - true: 启用压缩，减小文件体积
   * - false: 保留原始格式，便于阅读
   */
  minify: true,
  /**
   * 外部依赖配置
   * - 指定不打包到最终文件中的模块
   */
  // external: ['react', 'vue'],
  /**
   * 替换全局变量
   * 用于处理不同环境下的全局变量
   */
  define: {
    // 'process.env.NODE_ENV': '"production"',
  },
  /**
   * 平台目标
   * - 'node': Node.js 环境
   * - 'browser': 浏览器环境
   * - 'neutral': 通用环境（默认）
   */
  platform: 'neutral',
  /**
   * 注入代码
   * 在每个生成文件的顶部注入代码
   */
  banner: {
    // js: '// Built by tsup\n',
  },
  /**
   * 文件后缀配置
   * 自定义不同格式的文件后缀
   */
  // outExtension({ format }) {
  //   return {
  //     js: format === 'cjs' ? '.cjs' : '.mjs',
  //   }
  // },
  /**
   * 是否跳过 node_modules 打包
   * - true: 不打包 node_modules 中的依赖
   * - false: 将所有依赖打包进最终文件
   */
  skipNodeModulesBundle: true,
  /**
   * 环境变量注入
   * - 在构建时注入的环境变量
   */
  env: {
    // NODE_ENV: 'production',
  },
  /**
   * 构建成功后的回调
   * - 可以执行自定义脚本或命令
   */
  // onSuccess: 'npm run type-check',

  /**
   * ESBuild 自定义配置
   * - 传递给底层 ESBuild 的额外选项
   */
  esbuildOptions(_options, _context) {
    // options.drop = ['console', 'debugger'] // 移除 console 和 debugger
  },
})
