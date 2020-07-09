import Rule from '../rule.js';
import {string} from './strings.js';

export default new Rule({
	validator(value) {
		//L If transpiling to ES5, an additional check is required: https://stackoverflow.com/questions/46479169/check-if-value-is-a-symbol-in-javascript
		if (typeof value !== 'symbol') {
			throw new Error('Value is not a symbol.');
		}
	},
	caster(reference) {
		// Non-symbol values cast as the stringified description of a new symbol.
		if (!this.validate(reference.value)) {
			// Symbol(x) cannot convert symbols to strings, but String(x) in string.validateCast() can.
			string.validateCast(reference.value);
			reference.value = Symbol(reference.value);
		}
	},
});
