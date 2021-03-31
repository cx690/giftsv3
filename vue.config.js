module.exports = {
  lintOnSave: false,
  devServer: {
    host: "0.0.0.0",
    // hot: false,
    port: 9527,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {
          api: ""
        }
      }
    }
  }
};
