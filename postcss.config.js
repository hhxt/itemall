const path = require('path');

module.exports = (api) => {
  // 获取设计稿宽度
  const designWidth = api.webpackLoaderContext.resourcePath.includes(
    path.join('node_modules', 'vant')
  )
    ? 375
    : 750;

  return {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: designWidth,
        unitPrecision: 6,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: true,
        exclude: [],
        landscape: false
      }
    }
  };
};
