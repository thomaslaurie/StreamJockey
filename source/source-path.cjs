/* //R Workaround for __dirname / import.meta / webpack issues. 
	The __dirname node global doesn't exist in ES Modules, even when run with node.
		Webpack is supposed to be able to polyfill this with node: {__dirname: true}, however it doesn't seem to be working.
	The alternative import.meta would normally be the workaround for raw modules. 
		However Webpack doesn't support this yet: //L https://github.com/webpack/webpack/issues/6719
		@open-wc/webpack-import-meta-loader didn't work because it relies on window which isn't available in node.
		@bable/plugin-syntax-import-meta just didn't work at all.
		When webpack is able to parse import.meta, this could be a universal solution:
			//OLD
			import path from 'path';

			export default function (metaURL) {
				return path.dirname(new URL(metaURL.replace(/^file:\/\/\//, '')).pathname);
			};
	//! The best solution so far is to only use __dirname in a CommonJS Module, and instead import it into ES Modules.
		//! This still requires using node: {__dirname: true}
		//L Solution from: https://medium.com/@almtechhub/es-modules-and-import-meta-dirname-babel-trick-39aad026682
	Here its being wrapped in a path call because using the exported __dirname from outside this directory wouldn't make much semantic sense.
*/
//G Use in places where __dirname would normally be required, like config options or non-webpack-recognized imports.
//! Do NOT move this file, unless all references to this function are updated.
const {resolve} = require('path');
module.exports = (...relativePaths) => resolve(__dirname, ...relativePaths);
