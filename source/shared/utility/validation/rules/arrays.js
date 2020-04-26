import Rule from '../rule.js';

export const array = new Rule({
	//L Why not instanceof? - http://web.mit.edu/jwalden/www/isArray.html
	//TODO Doesn't this then apply to all classes? Should all classes use validators like this or just use instanceof?
	validator(value) {
		if (!Array.isArray(value)) {
			throw new Error('Value is not an array.')
		}
	}
});