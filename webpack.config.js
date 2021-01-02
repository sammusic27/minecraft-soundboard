const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
// const SRC = path.resolve(__dirname, 'node_modules');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },

  mode: 'development',
  watch: true,

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },

          // Creates `style` nodes from JS strings
          // "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },

          // Creates `style` nodes from JS strings
          // "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf|mp3)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(ttf|png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 80
  }
};