'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '潼湖数据中心动环监控系统' // page title

//如果您的端口设置为80，请使用管理员权限执行命令行。
//例如，Mac：sudo npm run
//您可以通过以下方法更改端口：port = 9527 npm run dev或npm run dev --port = 9527
const port = 9823;//process.env.port || process.env.npm_config_port || 9527 // dev port

//所有配置项说明均可在https://cli.vuejs.org/config/中找到 
module.exports = {
  /**
    *如果您打算在子路径（例如GitHub Pages）下部署站点，则需要设置publicPath。如果您打算将站点部署到https://foo.github.io/bar/，则publicPath应该设置为“ /bar /”。
    *在大多数情况下，请使用'/'！
    *详细信息：https://cli.vuejs.org/config/#publicpath
    */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,//process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    //在webpack的名称字段中提供应用程序的标题，以便
    //可以在index.html中对其进行访问以注入正确的标题。 
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    //可以提高第一个屏幕的速度，建议打开预加载
    //可以提高第一个屏幕的速度，建议打开预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        //忽略runtime.js 
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])


    //当页面很多时，它将导致太多无意义的请求 
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        // config => config.devtool('eval')//大量报警告
        // config => config.devtool('cheap-eval-source-map')
        config => config.devtool('cheap-source-map')
        // config => config.devtool('cheap-module-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' //仅打包最初依赖的第三方 
                },
                elementUI: {
                  name: 'chunk-elementUI', //将elementUI拆分为一个包 
                  priority: 20, //权重必须大于libs和app，否则将打包到libs或app中 
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
