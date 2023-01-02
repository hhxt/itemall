const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // less 的路径
      patterns: [path.resolve(__dirname, './src/assets/css/global.less')],
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'sidebar-selected-border-color': '#00bfc0',
            'sidebar-width': '85px',
            'sidebar-line-height': 'line-height-sm',
            'sidebar-padding': '20px 12px',
          },
        },
      },
    },
  },
});
