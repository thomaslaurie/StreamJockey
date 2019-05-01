const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //L https://webpack.js.org/guides/development/
    mode: 'development',
	entry: {
		js: path.resolve(__dirname, '../public/js/index.mjs'),
	},
	output: {
		filename: 'index.bundle.js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../../build/public'), //C the path that output is saved to
		//publicPath: 'dist/', //C the prefix that gets added to resource requests, //L publicPath is just a prefix and needs a following '/': https://github.com/GoogleChrome/workbox/issues/1548
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
					{
						loader: 'sass-loader',
						options: {
							data: `@import './public/css/global.scss';`,
						},
					},
                ],
            },
        ],
    },
    plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'),
		}),
	],
	/* //R don't need this yet
		resolve: {
			//L https://webpack.js.org/configuration/resolve
			//L https://gist.github.com/sokra/27b24881210b56bbaff7#resolving-options
			modules: [path.resolve(__dirname, './public/src'), path.resolve(__dirname, 'node_modules')], //C where the resolver looks for modules

			alias: {
				Js: path.resolve(__dirname, './public/js'),
				Css: path.resolve(__dirname, './public/css'),

				// vue
				Async: path.resolve(__dirname, './public/vue/async'),
				Main: path.resolve(__dirname, './public/vue/main'),
				Mixins: path.resolve(__dirname, './public/vue/mixins'),
				Page: path.resolve(__dirname, './public/vue/page'),
				Playlist: path.resolve(__dirname, './public/vue/playlist'),
				Track: path.resolve(__dirname, './public/vue/track'),
			},
		},
	*/
};