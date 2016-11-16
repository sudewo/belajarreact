module.exports = {
    entry: [
        './src/index.jsx'
    ],
    output: {
        filename: 'bundle.js',
        path: './public/'
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
