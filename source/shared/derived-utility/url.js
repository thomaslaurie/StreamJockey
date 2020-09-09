import Rule from '../utility/validation/rule.js';
import validURL from 'valid-url';

export default new Rule({
	validator(value) {
		if (validURL.isWebUri(value) === undefined) {
			throw new Error('Value is not a valid URL');
		}
	},
});
