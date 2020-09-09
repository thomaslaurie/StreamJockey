import Rule from '../../rule.js';
import {object} from '../objects/index.js';
import {string} from '../strings.js';
import {number} from '../numbers.js';
import boolean from '../boolean.js';
import {forKeysOf} from '../../../object/index.js';

export default new Rule({
	validator(value) {
		if (!object.test(value)) {
			throw new Error('Query parameters is not an object.');
		}
		forKeysOf(value, {
			own:        true,
			named:      true,
			enumerable: true,

			inherited:     false,
			symbol:        false,
			nonEnumerable: false,

			callback(obj, key) {
				const parameterValue = obj[key];
				if (!(
					string.test(parameterValue)
					|| number.test(parameterValue)
					|| boolean.test(parameterValue)
				)) {
					throw new Error(`Query parameter '${key}' is not a string, number, or boolean.`);
				}
			},
		});
	},
});
