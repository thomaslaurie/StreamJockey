import Rule from '../../rule.js';

export default new Rule({
	//L https://stackoverflow.com/a/22482737
	validator(value) {
		if (value === null || !(typeof value === 'object' || typeof value === 'function')) {
			throw new Error('Value is not an object.');
		}
	},
});