export default function combinations(optionsObject) {
	//C takes an options object with a set of own properties whose value is an array of all possible values for that property
	//C returns an array of objects with all combinations of those property values

	//C ensure optionsObject is an object
	if (optionsObject === null || typeof optionsObject !== 'object') {
		throw new Error('Options object is not an object.');
	}

	//C get all own property keys
	const keys = [];
	keys.push(...Object.getOwnPropertyNames(optionsObject));
	keys.push(...Object.getOwnPropertySymbols(optionsObject));

	//C ensure all own properties are iterable
	for (const key of keys) {
		if (!(optionsObject[key] instanceof Array)) {
			throw new Error(`Property options for ${key} is not iterable.`);
		}
	}

	const combinations = [];
	const combination = {};

	//C return empty array if no own keys
	if (keys.length <= 0) return combinations;

	//C start with the first property
	const nest = function (index = 0) {
		const key = keys[index];
		const options = optionsObject[key];

		//C for each option
		for (const option of options) {
			//C set the option
			combination[key] = option;

			if (index < keys.length - 1) {
				//C move to the next property
				nest(index + 1);
			} else {
				//C or if at last property, save the combination
				combinations.push({...combination});
			}
		}
	};
	
	nest();
	return combinations;
};