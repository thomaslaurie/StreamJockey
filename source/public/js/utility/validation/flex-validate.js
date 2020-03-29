// Executes validators that take either 1 (value) argument or 2 (object, key) arguments with either 1 or 2 arguments. 
// If the validator takes 2 arguments but 2 arguments weren't passed, the first argument is simulated as an object property.

//R Using (length === 2 else) rather than (length === 1 else) because otherwise if no arguments are passed undefined[undefined] won't work.

export default function flexValidate(validator, ...args) {
	if (validator.length === 0) {
		// Pass no arguments if validator takes none.
		return validator();
	} else if (validator.length === 1) {
		let value;

		if (args.length === 0) {
			value = undefined;
		} else if (args.length === 1) {
			value = args[0];
		} else if (args.length === 2) {
			value = args[0][args[1]];
		} else {
			throw new Error(`${args.length} arguments not supported for validators with 1 parameter.`);
		}

		return validator(value);
	} else if (validator.length === 2) {
		let object;
		let key;

		if (args.length === 2) {
			object = args[0];
			key = args[1];
		} else {
			throw new Error(`${args.length} arguments not supported for validators with 2 parameters.`);
		}

		return validator(object, key);

		/* //OLD Value to property simulation.
			object = Object.create(null);
			key = Symbol('simulated key');
			object[key] = value;
		*/
	} else {
		throw new Error(`Validators with ${validator.length} arguments are not supported.`);
	}
};