import Rule from '../../rule.js';
import constructor from './constructor.js';

export default new Rule({
	validator(value, Class) {
		constructor.validate(Class);

		if (!(value instanceof Class)) {
			throw new Error(`Value is not an instance of ${Class.name}`);
		}
	},
});
