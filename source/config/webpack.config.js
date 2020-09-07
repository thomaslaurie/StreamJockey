// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

//R Not all modules on npm are 'bundle-able' or compatible with non-Node environments: bcrypt is written in C. This was causing errors when trying to bundle server-side code with Webpack, it just wasn't able to. Used bcryptjs instead.
//R Unless nodeExternals is used, in which case node_modules are ignored and a node environment is assumed.

/* Build Type Table


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

//TODO Consider Closure-Compiler (or Prepack).
//TODO Tree-shaking, look for files with the "side-effects" comment.

//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// BUILT-IN

// EXTERNAL
import webpack from 'webpack';
import CWP from 'clean-webpack-plugin';
const {CleanWebpackPlugin} = CWP;
import HtmlWebpackPlugin from 'html-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin.js';
import nodeExternals from 'webpack-node-externals';

// INTERNAL
import {
	serverBuildDirectory,
	clientBuildDirectory,
	serverMainFile,
	clientMainFile,
	UIMainFile,
	CSSDirectory,
} from './project-paths.js';


//   ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
//  ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
//  ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
//  ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
//  ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
//   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝

// COMMON
const common = {
	options: (env, argv) => ({
		//L https://webpack.js.org/configuration/mode
		mode: argv.mode,
	}),
	babelRule(targets) {
		return {
			test: /\.js$/u,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets,
							},
						],
					],
					plugins: [
						'@babel/plugin-proposal-export-namespace-from',
						'@babel/plugin-proposal-optional-chaining',
					],
					sourceMaps: true,
				},
			},
		};
	},
	plugins: (env, argv) => ([
		new CleanWebpackPlugin(),
		new webpack.ProgressPlugin(),
	]),
};

// TARGETS
export const clientOptions = (env, argv) => ({
	...common.options(env, argv),
	target: 'web',
	entry: {
		main: clientMainFile,
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js',
		path: clientBuildDirectory,
		//TODO This is explicitly required for webpack-dev-middleware, not 100% sure what it should be yet though.
		// publicPath: 'dist/', // the prefix that gets added to resource requests, //L publicPath is just a prefix and needs a following '/': https://github.com/GoogleChrome/workbox/issues/1548
		//TODO consider tossing not-yet-bundled resources into dist too (clientIndex, css)
		publicPath: '/',
	},
	//L https://webpack.js.org/configuration/devtool
	//! 'eval-source-map' doesn't seem to work with source-map-support.
	//L https://www.npmjs.com/package/source-map-support
	devtool: argv.mode === 'development' ? 'source-map' : undefined,
	module: {
		rules: [
			{
				//L https://vue-loader.vuejs.org/guide/#manual-configuration
				test: /\.vue$/u,
				loader: 'vue-loader',
			},
			{
				test: /\.css$/u,
				use: [
					'vue-style-loader',
					'css-loader',
				],
			},
			{
				//L https://vue-loader.vuejs.org/guide/pre-processors.html#sass
				test: /\.scss$/u,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							//! Apparently breaks sass source-maps.
							prependData: `@import 'global.scss';`,
							sassOptions: {
								includePaths: [CSSDirectory],
							},
							// data: `@import '${sourcePath(`client/ui/${clientIndex}`)}';`,
						},
					},
				],
			},
			common.babelRule({esmodules: true}),
		],
	},
	plugins: [
		...common.plugins(env, argv),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: UIMainFile,
		}),
	],
});

export const serverOptions = (env, argv) => ({
	...common.options(env, argv),
	target: 'node',
	entry: {
		main: serverMainFile,
	},
	output: {
		//! Compiling as a CJS file
		filename: '[name].bundle.cjs',
		path: serverBuildDirectory,
	},
	// Required for SourceMapDevToolPlugin to work.
	devtool: false,
	module: {
		rules: [common.babelRule({node: true})],
	},
	plugins: [
		...common.plugins(env, argv),
		new webpack.SourceMapDevToolPlugin({
			//R Webpack creates sourcemaps with the source content embedded in the files themselves, rather than pointing to the actual source files. This doesn't appear to be compatible with the idea of clicking URL directly from console-logged stack-traces, as the URL isn't valid from the perspective of the file-system.
			//L This behavior is described here: https://github.com/webpack/webpack/issues/559, https://sourcemaps.info/spec.html
			//G To override the default Webpack behavior and use non-self-contained source-maps, Webpack's custom prefix must be removed and the source URLs must point to the actual source files.

			// Explicit 'filename' option forces non-inline source-maps.
			//L Default from: https://stackoverflow.com/questions/52228650/configure-sourcemapdevtoolplugin-to-generate-source-map
			filename: '[file].map[query]',
			// Removes the 'webpack:///' prefix from the source URLs.
			//? Not sure if 'fallbackModuleFilenameTemplate' is needed too?
			moduleFilenameTemplate: '[absolute-resource-path]',
			// Removes sourceContent from the source-maps.
			noSources: true,

			// Modified the default pattern from SourceMapDevToolPlugin to include .cjs files.
			// Original: /\.(m?js|css)($|\?)/i
			//L Source code: https://github.com/webpack/webpack/blob/28bb0c59c0d5a8d2d1192b4c19217f7ed59785f9/lib/SourceMapDevToolPlugin.js#L141
			test: /\.(?:[mc]?js|css)(?:$|\?)/iu,
		}),
		{
			/* custom node globals polyfill */
			//L From: https://github.com/webpack/webpack/issues/1599#issuecomment-550291610
			//G //! Works with default node-global config settings (replaces node: {__dirname: true}).
			apply(compiler) {
				function setModuleConstant(expressionName, fn) {
					compiler.hooks.normalModuleFactory.tap('MyPlugin', (factory) => {
						factory.hooks.parser.for('javascript/auto').tap('MyPlugin', (parser, _options) => {
							parser.hooks.expression.for(expressionName).tap('MyPlugin', () => {
								parser.state.current.addVariable(expressionName, JSON.stringify(fn(parser.state.module)));
								return true;
							});
						});
					});
				}

				setModuleConstant('__filename', module => module.resource);
				setModuleConstant('__dirname',  module => module.context);
			},
		},
		/* //OLD If bundling node_modules:
			const {IgnorePlugin} = require('webpack');
			//L Required to patch pg-promise: https://github.com/serverless-heaven/serverless-webpack/issues/78#issuecomment-405646040
			new IgnorePlugin(/^pg-native$/),
			//L Required to patch socket.io: https://github.com/socketio/engine.io/issues/575#issuecomment-578081012
			new IgnorePlugin(/^uws$/),
		*/
	],
	externals: [
		// Don't bundle node_modules.
		nodeExternals(),
	],
});
