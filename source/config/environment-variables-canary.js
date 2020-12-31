// The CANARY variable tests that environment variables are being defined. Here it is imported and compared against an identical, hard-coded string.
//TODO Consider creating a test file for this instead?
if (process.env.CANARY !== 'canaryString') {
	throw new Error('Environment variables are not available.');
}

/* //OLD Using dotenv-webpack now because this broke when upgrading to webpack 5.
	//! this needs to be in its own file (not at the top of index.js) because imports are hoisted, which causes dotenv.config() to run after any module that uses environment variables immediately, which makes them undefined
	//L https://stackoverflow.com/questions/42817339/es6-import-happening-before-env-import
	import dotenv from 'dotenv';
	import {dotEnvFile} from './project-paths.js';

	dotenv.config({
		path: dotEnvFile,
	});
*/
