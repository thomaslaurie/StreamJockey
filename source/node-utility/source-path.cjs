// Returns an absolute path relative to the source directory.
//G Use in places where __dirname would normally be required, like config options or non-webpack-recognized imports.
/* //! Do NOT move this file. 
	If it must be moved, 
		either ensure all references to this file and all relative paths passed to this function are updated, 
		or update the <base path> of this function: resolve(<__dirname, '../',> ...relativePaths)
*/
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
	Current solution is to use __dirname only in a CommonJS Module, and instead import it into ES Modules.
		//L Solution from: https://medium.com/@almtechhub/es-modules-and-import-meta-dirname-babel-trick-39aad026682
		Here it was being wrapped in a path call because using the exported __dirname from outside this directory wouldn't make much semantic sense.
		This initially didn't work because it was actually just using the directory node was being run from.
			However, with a custom node globals polyfill: //L https://github.com/webpack/webpack/issues/1599#issuecomment-550291610 __dirname can now be properly polyfilled.
		Even though __dirname will now work properly, this cjs workaround is still the preferred way as it can be used in raw ES Modules.	
*/
//R Currying this function won't work. __dirname will only apply to the exact file it is used in.

const {resolve} = require('path');
module.exports = (...relativePaths) => resolve(__dirname, '../', ...relativePaths);
