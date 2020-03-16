// Work-around for __dirname / import.meta issues.
//! Must be in the same directory as the file that imports it.
/* 
	//R I needed a __dirname equivalent that would work for a raw node-run file and a compiled node-run file, both ES modules.
	@open-wc/webpack-import-meta-loader didn't work because it relies on window which isn't available in node.
	@bable/plugin-syntax-import-meta just didn't work at all.

	//L Solution found here: https://medium.com/@almtechhub/es-modules-and-import-meta-dirname-babel-trick-39aad026682

	//OLD If webpack was able to parse import.meta.url, this would work everywhere instead:

		import path from 'path';

		export default function (metaURL) {
			return path.dirname(new URL(metaURL.replace(/^file:\/\/\//, '')).pathname);
		};
*/

module.exports = __dirname;

