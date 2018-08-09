import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration } from "webpack";

export default {
  devtool: "source-map",
  entry: path.resolve(__dirname, "src", "index.tsx"),
  module: {
    rules: [
      {
        include: /src/,
        loader: "ts-loader",
        options: { compilerOptions: { module: "esnext" } },
        test: /\.tsx?$/
      },
      {
        loader: "node-loader",
        test: /\.node$/
      },
      {
        loaders: ["style-loader?sourceMap", "css-loader?sourceMap"],
        test: /\.css$/
      }
    ]
  },
  optimization: {
    minimize: false,
    runtimeChunk: true,
    splitChunks: {
      chunks: "all"
    }
  },
  output: {
    path: path.resolve(__dirname, "app")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".node", ".json"]
  },
  target: "electron-renderer"
} as Configuration;
