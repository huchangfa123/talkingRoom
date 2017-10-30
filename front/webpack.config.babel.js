import path from 'path';
console.log(path.join(__dirname, 'public'))
module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080/',
      './src/index.jsx'
    ]
  },
  output: {
    path: path.join(__dirname, 'public/static'),
    filename: 'bundle.js',
    publicPath: '/static/'
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
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: "empty"
  }
}