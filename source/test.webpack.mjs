import webpack from 'webpack';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url.replace(/^file:\/\/\//, '')).pathname);

const compiler = webpack({
	target: 'web',
	mode: 'development',
	entry: {
		js: path.resolve(__dirname, './test.js'),
	},
	output: {
		filename: 'test.bundle.js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, './test'),
	},
	plugins: [
		new webpack.ProgressPlugin(),
	],
});

compiler.run((error, stats) => {
	if (error) {
		console.error(error);
		return;
	}

	console.log(stats.toString({
		colors: true,
	}));
});