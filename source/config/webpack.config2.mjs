//R Not all modules on npm are 'bundle-able' or compatible with non-Node environments: bcrypt is written in C. This was causing errors when trying to bundle server-side code with Webpack, it just wasn't able to. Used bcryptjs instead.

/*
	File Watching Types


	Build Method \ Target             | Client                          | Server
	___________________________________________________________________________________________________________          
	Hot      (init + auto update)     | webpack + w-hot + server        | (webpack + w-hot + w-server) + node
	___________________________________________________________________________________________________________
	Refresh  (init + auto refresh)    | webpack + w-middleware + server | webpack watch + nodemon
	___________________________________________________________________________________________________________
	Watch    (init + manual refresh)  | webpack watch + server          | webpack watch + node
	___________________________________________________________________________________________________________
	Compile  (build + manual refresh) | webpack + server                | webpack + node
	___________________________________________________________________________________________________________
	Raw      (manual refresh)         | server                          | node


	[Client x Hot] and [Client x Refresh] 
		Require build initialization from the server side.
		Only useful when running client code, therefore should not be used without a running server.
		May use a webpack-dev-server instead of the homebrew server.

	[Server]
		Can only configure the watch mode of the Client, not itself.
		Its own watch mode must be set by whatever process starts the server.

	[Raw]
		Not relevant where webpack has been setup for Client and/or Server.
*/

//TODO Start off by doing a single startup command for refresh of both client and server.

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import cwp from 'clean-webpack-plugin';
const CleanWebpackPlugin = cwp.CleanWebpackPlugin;
import nodeExternals from 'webpack-node-externals';
import VueLoaderPlugin from 'vue-loader/lib/plugin.js';

const __dirname = path.dirname(new URL(import.meta.url.replace(/^file:\/\/\//, '')).pathname);

// COMMON
const common = {
	options: (env, argv) => ({
		//L https://webpack.js.org/configuration/mode
		mode: argv.mode,
		//L https://webpack.js.org/configuration/devtool
		devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,
	}),
	plugins: (env, argv) => ([
		new CleanWebpackPlugin(),
		new webpack.ProgressPlugin(),
	]),
};

// TARGETS
export const client = (env, argv) => ({
	...common.options(env, argv),
	target: 'web',
	entry: {
		js: path.resolve(__dirname, '../public/js/index.mjs'),
	},
	output: {
		filename: 'index.bundle.js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../../build/public'), //C the path that output is saved to
		publicPath: '/',
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
		...common.plugins(env, argv),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'),
		}),
	],
});

export const server = (env, argv) => ({
	...common.options(env, argv),
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
		...common.plugins(env, argv),
		/* //OLD Only required if bundling node_modules	
			const {IgnorePlugin} = require('webpack');
			//L Required to patch pg-promise: https://github.com/serverless-heaven/serverless-webpack/issues/78#issuecomment-405646040
			new IgnorePlugin(/^pg-native$/),
			//L Required to patch socket.io: https://github.com/socketio/engine.io/issues/575#issuecomment-578081012
			new IgnorePlugin(/^uws$/),
		*/
	],
});