const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    //L https://webpack.js.org/guides/development/
    mode: 'development',
	entry: '../public/src/js/index.mjs',
	output: {
		filename: 'index.bundle.js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../public/dist'), //C the path that output is saved to
		publicPath: 'dist/', //C the prefix that gets added to resource requests, //L publicPath is just a prefix and needs a following '/': https://github.com/GoogleChrome/workbox/issues/1548
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
	/* //R don't need this yet
		resolve: {
			//L https://webpack.js.org/configuration/resolve
			//L https://gist.github.com/sokra/27b24881210b56bbaff7#resolving-options
			modules: [path.resolve(__dirname, '../public/src'), path.resolve(__dirname, 'node_modules')], //C where the resolver looks for modules

			alias: {
				Js: path.resolve(__dirname, '../public/src/js'),
				Css: path.resolve(__dirname, '../public/src/css'),

				// vue
				Async: path.resolve(__dirname, '../public/src/vue/async'),
				Main: path.resolve(__dirname, '../public/src/vue/main'),
				Mixins: path.resolve(__dirname, '../public/src/vue/mixins'),
				Page: path.resolve(__dirname, '../public/src/vue/page'),
				Playlist: path.resolve(__dirname, '../public/src/vue/playlist'),
				Track: path.resolve(__dirname, '../public/src/vue/track'),
			},
		},
	*/
};