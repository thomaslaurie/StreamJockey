const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    //L https://webpack.js.org/guides/development/
    mode: 'development',
	entry: '../public/src/js/index.mjs',
	output: {
		filename: 'index.bundle.js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../public/dist'),
		publicPath: 'dist/',
		//L publicPath is just a prefix and needs a following '/': https://github.com/GoogleChrome/workbox/issues/1548
		//TODO consider tossing not-yet-bundled resources into dist too (index.html, css)
    },
    devtool: 'cheap-module-eval-source-map', //L https://webpack.js.org/configuration/devtool/
    module: {
        rules: [
            {
                //L https://vue-loader.vuejs.org/guide/#manual-configuration
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ],
            },
            {
                //L https://vue-loader.vuejs.org/guide/pre-processors.html#sass
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin()
	],
};