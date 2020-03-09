//R Not all modules on npm are 'bundle-able' or compatible with non-Node environments: bcrypt is written in C. This was causing errors when trying to bundle server-side code with Webpack, it just wasn't able to. Used bcryptjs instead.

//TODO checkout webpack HMR, dev-server, dev-middleware, etc.

// nodemon = automatic rebuild & restart
// watch = automatic rebuild, but requires manual client refresh

// webpack-dev-server = server to serve files + dev-middleware
// webpack-dev-middleware = proxy that causes automatic client refresh upon change

// hot = module replacement without refresh (preserves page state)

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env, args) => {
	const common = {
		//L https://webpack.js.org/configuration/mode
		mode: args.mode,
		//L https://webpack.js.org/configuration/devtool
		devtool: args.mode === 'development' ? 'eval-source-map' : undefined,
	};

	return [{
		// CLIENT
		target: 'web',
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
								//! Apparently breaks sass source-maps.
								prependData: `@import 'global.scss';`,
								sassOptions: {
									includePaths: [path.resolve(__dirname, '../public/css/')],
								},
								// 	data: `@import '${path.resolve(__dirname, './public/index.html')}';`,
							},
						},
					],
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new VueLoaderPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '../public/index.html'),
			}),
		],
		...common,
		/* //R Don't need this yet.
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
	}, {
		// SERVER
		
		target: 'node',
		entry: {
			index: path.resolve(__dirname, '../server/index.mjs'),
		},
		output: {
			filename: 'index.bundle.js',
			path: path.resolve(__dirname, '../../build/server'),
		},
		module: {
			rules: [
				{
					//L Required to load import.meta syntax: https://github.com/webpack/webpack/issues/6719#issuecomment-546840116
					test: /(\.js|\.mjs)$/,
					loader: '@open-wc/webpack-import-meta-loader',
				},
			],
		},
		externals: [
			//C Don't bundle node_modules.
			nodeExternals(),
		],
		plugins: [
			new CleanWebpackPlugin(),
			/* //OLD Only required if bundling node_modules	
				const {IgnorePlugin} = require('webpack');
				//L Required to patch pg-promise: https://github.com/serverless-heaven/serverless-webpack/issues/78#issuecomment-405646040
				new IgnorePlugin(/^pg-native$/),
				//L Required to patch socket.io: https://github.com/socketio/engine.io/issues/575#issuecomment-578081012
				new IgnorePlugin(/^uws$/),
			*/
		],
		...common,
	}];
};
