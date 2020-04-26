//L https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
//L https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
//L https://medium.com/@fsufitch/is-javascript-array-sort-stable-46b90822543f

import {rules} from '../validation/index.js';

export default function (array, compare = (a, b) => {
	//C low to high
	return a - b;
}) {
	rules.array.validate(array);
	rules.func.validate(compare);

	//C Create new array where the original index is preserved.
	const preservedArray = array.map((value, index) => ({value, index}));

	const stableCompare = (a, b) => {
		const order = compare(a.value, b.value);

		//C If equal, sort based on original order, otherwise sort normally.
		return (order === 0) ? a.index - b.index : order;
	};

	preservedArray.sort(stableCompare);

	//C Overwrite original array with sorted values.
	for (let i = 0; i < array.length; i++) {
		array[i] = preservedArray[i].value;
	}

	return array;
};