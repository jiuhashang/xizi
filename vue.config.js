// const port = process.env.port || 80 // dev port
module.exports = {
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    // devServer: {
    //   // port: 80,
    //   open: true,
    //   proxy: {
    //     '/xizi-api': {
    //       pathRewrite: {'^/xizi-api': ''},
    //       target: 'http://119.45.162.104/xizi-api',
    //       // target: 'http://123.60.52.140/xizi-api',
    //       ws: true,
    //       secure: false,
    //       changOrigin: true
    //     }
    //   },
      // overlay: {·
      //   warnings: false,
      //   errors: true
      // }
      // before: require('./mock/mock-server.js')
    // },
    chainWebpack: (config) => {
      config.externals({
        vue:'Vue',
        'vue-router':'VueRouter',
        'element-ui':'ELEMENT',
        nprogress: 'NProgress',
        axios: 'axios',
        lodash: '_'
      })
    }
  }