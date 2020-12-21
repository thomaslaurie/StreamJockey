import Rule from '../../rule.js';

export default new Rule({
	validator(value) {
		try {
			class Test extends value {}
		} catch (e) {
			throw new Error('Value is not a constructor.');
		}
	},
});
