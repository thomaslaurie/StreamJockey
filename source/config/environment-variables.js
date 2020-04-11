//! this needs to be in its own file (not at the top of index.js) because imports are hoisted, which causes dotenv.config() to run after any module that uses environment variables immediately, which makes them undefined
//L https://stackoverflow.com/questions/42817339/es6-import-happening-before-env-import
import sourcePath from '../node-utility/source-path.cjs';
import dotenv from 'dotenv';

dotenv.config({
	path: sourcePath('config/.env'),
});

//R The 'canary string' should be an environment variable that is committed to the repo that tests weather the passed environment variables are available and accurate. It should be identical to the CANARY environment variable.
if (process.env.CANARY !== 'canaryString') {
	throw new Error('Environment variables are not available.');
}
