import * as HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
  watch: true,
  target: "electron-renderer",
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".node", ".json"]
  }
};
