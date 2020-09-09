import Rule from '../rule.js';

export default new Rule({
	validator(value) {
		if (typeof value !== 'boolean') {
			throw new Error('Value is not a boolean.');
		}
	},
	caster(reference) {
		reference.value = Boolean(reference.value);
	},
});
