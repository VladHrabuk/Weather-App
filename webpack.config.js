import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: "./src/index.js",

  output: {
    path: resolve(__dirname, "./dist"),
    clean: true,
    filename: "index.js",
    assetModuleFilename: "assets/images/[name][ext]",
  },
  devServer: {
    port: 3000,
    compress: true,
    liveReload: true,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.woff2?$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
        use: [
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: "assets/styles/main.css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./src/assets/images", to: "assets/images" }],
    }),
  ],
};
