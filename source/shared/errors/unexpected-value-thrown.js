import {
	dynamicClass,
	define,
} from '../utility/index.js';
import CustomError from './custom-error.js';

export default dynamicClass.create('UnexpectedValueThrown', {
	extends: CustomError,
	instance({
		value, // The value that was thrown.
	} = {}) {
		define.constant(this, {
			value,
		});
	},
});
