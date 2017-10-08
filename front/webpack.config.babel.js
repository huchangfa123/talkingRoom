import path from 'path';

module.exports = {
  devtool: 'eval-source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public/static'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    inline: true,
    port: 8080
  },
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      use: {
          loader: "babel-loader"
      },
      exclude: /node_modules/
    }]
  }
}