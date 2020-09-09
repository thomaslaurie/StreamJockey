import Rule from '../rule.js';
import keyify from '../../keyify.js';

export default new Rule({
	// Keys that won't be cast / have already been cast as a result of being used as a property key.
	//! Does not include numbers, those get cast to strings.
	validator(value) {
		const keyifiedValue = keyify(value);

		if (value !== keyifiedValue) {
			throw new Error('Value is not keyified.');
		}
	},
	caster(reference) {
		reference.value = keyify(reference.value);
	},
});
