var path = require('path');
module.exports = {
    entry: [
        './src/index.jsx'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve('./public/')
    },
    module: {
      loaders : [{
	test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'	
      }]	    
    },
    plugins: []
}
