var wpPlugins = require('./config/webpack/plugins.js');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: './dist/notes.js'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader'},
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  devtool: 'source-map',
  plugins: wpPlugins
};
