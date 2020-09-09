import Rule from '../../rule.js';
import object from './object.js';
import {getKeysOf} from '../../../object/keys-of.js';

export default new Rule({
	validator(value) {
		object.validate(value);

		if (getKeysOf(value, {
			own:           true,
			enumerable:    true,
			nonEnumerable: true,
			named:         true,
			symbol:        true,

			inherited: false,
		}).length === 0) {
			throw new Error('Object is not populated.');
		}
	},
});
