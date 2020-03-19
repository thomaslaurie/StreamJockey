
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	target: 'node',
	entry: {
		js: path.resolve(__dirname, '../server/test.mjs'),
	},
	output: {
		filename: 'index.bundle.js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../../dist'),
	},
	plugins: [
		new CleanWebpackPlugin(),
	],
	node: {
		__dirname: true,
	},
	externals: [
		//C Don't bundle node_modules.
		nodeExternals(),
	],
};