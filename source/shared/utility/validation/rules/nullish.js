import Rule from '../rule.js';

export default new Rule({
	validator(value) {
		if (value !== undefined && value !== null) {
			throw new Error('Value is not nullish.');
		}
	},
});
