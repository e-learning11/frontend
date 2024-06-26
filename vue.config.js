const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],

  chainWebpack(config) {
    const apiClient = process.env.VUE_APP_API_CLIENT;
    config.resolve.alias.set(
      "api-client",
      path.resolve(__dirname, `src/api/${apiClient}`)
    );

    config.module
      .rule("pdf")
      .test(/\.(pdf)(\?.*)?$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/pdf/[name].[hash:8].[ext]"
      });
  }
};
