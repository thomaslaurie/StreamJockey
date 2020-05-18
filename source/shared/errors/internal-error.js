// Used for errors that are caused by internal mistakes in the code. 
// ie. Not the user's fault.

import {
	dynamicClass,
} from '../utility/index.js';
import CustomError from './custom-error.js';

export default dynamicClass.create('InternalError', {
	extends: CustomError,
	intercept: ({
		userMessage = 'An internal error has occurred',
		...rest
	}) => ({
		nextArguments: {userMessage, ...rest},
	}),
});
