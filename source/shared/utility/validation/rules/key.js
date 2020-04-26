import Rule from '../rule.js';
import {getKeysOf} from '../../object/keys-of.js';

const keyify = function (value) {
	// Create a null object with only one property.
	const nullObject = Object.create(null);
	nullObject[value] = true;

	// Find that only property's key.
	const [keyifiedValue] = getKeysOf(nullObject, {
		own: true,
		named: true,
		symbol: true,
		enumerable: true,

		nonEnumerable: false,
		inherited: false,
	});

	return keyifiedValue;
};
export default new Rule({
	// Keys that won't be cast / have already been cast as a result of being used as a property key.
	//! Does not include numbers, those get cast to strings.
	validator(value) {
		const keyifiedValue = keyify(value);

		if (value !== keyifiedValue) {
			throw 'Value is not keyified.';
		}
	},
	caster(reference) {
		reference.value = keyify(reference.value);
	},
});

