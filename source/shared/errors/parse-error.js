import {
	dynamicClass,
	define,
} from '../utility/index.js';
import CustomError from './custom-error.js';

export default dynamicClass.create('ParseError', {
	extends: CustomError,
	instance({
		input,
	} = {}) {
		define.constant(this, {
			input,
		});
	},
});
