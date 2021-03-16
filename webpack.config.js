const path = require('path');
const webpack = require('webpack');


const appConf = {
  mode: 'development',

  entry: './srcCli/app.js',
	output: { filename: 'app.js' },

  plugins: [new webpack.ProgressPlugin()],

  module: {
    rules: []
  }
}

const servConf = {
  mode: 'development',

  entry: './srcServ/serv.js',
	output: { filename: 'serv.js' },

  plugins: [new webpack.ProgressPlugin()],

  target: 'node',
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  }
}


module.exports = [ appConf, servConf ];

