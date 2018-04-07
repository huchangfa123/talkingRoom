import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack'

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080/',
      './src/index.jsx'
    ],
    vendor: ['react', 'react-dom', 'react-router-dom', 'immutable']
  },
  output: {
    path: path.join(__dirname, 'public/static'),
    publicPath: '/static/',
    filename: '[name].[chunkhash:4].js',
    chunkFilename: '[name].[chunkhash:4].child.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    historyApiFallback: true,
    inline: true,
    port: 8080
  },
  module: {
    rules: [{
        test: /(\.jsx|\.js)$/,
        use: ['react-hot-loader', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'sass-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader?limit=8192&name=../images/[name].[ext]?[hash]']
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: false,
        output: {
          comments: false,
          beautify: false,
        },
        mangle: {
          keep_fnames: true
        },
        compress: {
          warnings: false,
          drop_console: true
        },
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'runtime'], //把公共资源抽离，避免多次打包
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // ( 公共chunk(commnons chunk) 的名称)
      name: "commons",
      // ( 公共chunk 的文件名)
      filename: "commons.[chunkhash:4].js",
      // (模块必须被 3个 入口chunk 共享)
      minChunks: 3
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // (选择所有被选 chunks 的子 chunks)
      children: true,
      async: true,
      // (在提取之前需要至少三个子 chunk 共享这个模块)
      minChunks: 3,
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: "empty"
  }
}