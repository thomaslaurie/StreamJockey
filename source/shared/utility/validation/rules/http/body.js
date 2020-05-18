import Rule from '../../rule.js';
import {string} from '../strings.js';

export default new Rule({
	validator(value) {
		if (!(string.test(value))) {
			throw new Error('Request body is not a string.');
		}
	},
});
