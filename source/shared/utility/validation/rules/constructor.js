import Rule from '../rule.js';

export default new Rule({
	validator(value) {
		try { 
			const Test = class extends value {}; 
		} catch (e) { 
			throw new Error('Value is not a constructor.');
		}
	},
});
