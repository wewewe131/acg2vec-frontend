const { defineConfig } = require('@vue/cli-service')
// npm install --save-dev webpack-obfuscator
const JavaScriptObfuscator = require('webpack-obfuscator');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
console.log(process.env.NODE_ENV);
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.ROUTER_BASE,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      // filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'acg2vec',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },
  configureWebpack: {
    plugins: process.env.NODE_ENV === 'production' ? [
      new BundleAnalyzerPlugin(),
      new JavaScriptObfuscator({
        // 压缩代码
        compact: true,
        // 是否启用控制流扁平化(降低1.5倍的运行速度)
        controlFlowFlattening: false,
        // 应用概率;在较大的代码库中，建议降低此值，因为大量的控制流转换可能会增加代码的大小并降低代码的速度。
        controlFlowFlatteningThreshold: 0,
        // 随机的死代码块(增加了混淆代码的大小)
        deadCodeInjection: false,
        // 死代码块的影响概率
        deadCodeInjectionThreshold: 0,
        // 此选项几乎不可能使用开发者工具的控制台选项卡
        // debugProtection: false,
        // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
        // debugProtectionInterval: 3000,
        // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
        disableConsoleOutput: false,
        // 标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
        identifierNamesGenerator: 'mangled',
        log: false,
        // 是否启用全局变量和函数名称的混淆
        renameGlobals: false,
        // 通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
        rotateStringArray: false,
        // 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
        selfDefending: false,
        // 删除字符串文字并将它们放在一个特殊的数组中
        stringArray: false,
        stringArrayEncoding: ['rc4'],
        stringArrayThreshold: 1,
        transformObjectKeys: false,
        // 允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
        unicodeEscapeSequence: false
      }, []),
    ] : []
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://acg2vec.cheerfun.dev/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/pix2score': {
        target: "https://i.pixiv.re/",
        changeOrigin: true,
        pathRewrite: {
          '^/pix2score': ''
        }
      }
    }
  },

  productionSourceMap: false
})
