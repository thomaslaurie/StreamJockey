export default function combinations(optionsObject) {
	// takes an options object with a set of own properties whose value is an array of all possible values for that property
	// returns an array of objects with all combinations of those property values

	// ensure optionsObject is an object
	if (optionsObject === null || typeof optionsObject !== 'object') {
		throw new Error('Options object is not an object.');
	}

	// get all own property keys
	const keys = [];
	keys.push(...Object.getOwnPropertyNames(optionsObject));
	keys.push(...Object.getOwnPropertySymbols(optionsObject));

	// ensure all own properties are iterable
	for (const key of keys) {
		if (!(optionsObject[key] instanceof Array)) {
			throw new Error(`Property options for ${key} is not iterable.`);
		}
	}

	const combinations = [];
	const combination = {};

	// return empty array if no own keys
	if (keys.length <= 0) return combinations;

	// start with the first property
	const nest = function (index = 0) {
		const key = keys[index];
		const options = optionsObject[key];

		// for each option
		for (const option of options) {
			// set the option
			combination[key] = option;

			if (index < keys.length - 1) {
				// move to the next property
				nest(index + 1);
			} else {
				// or if at last property, save the combination
				combinations.push({...combination});
			}
		}
	};
	
	nest();
	return combinations;
};