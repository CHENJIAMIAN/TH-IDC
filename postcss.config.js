module.exports = {
  plugins: {
    autoprefixer: {},
    // 它不会污染 CSS 全局范围，可以简单地在 JS 中使用
    "postcss-modules-scope":{},
  }
}
