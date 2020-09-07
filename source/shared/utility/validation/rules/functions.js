//L Doesn't seem proper to distinguish async vs sync functions: https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async, async operations can handle sync function returns
// sync func
// async func

import Rule from '../rule.js';

export const func = new Rule({
	validator(value) {
		if (typeof value !== 'function') throw new Error('Value is not a function.');
	},
});
