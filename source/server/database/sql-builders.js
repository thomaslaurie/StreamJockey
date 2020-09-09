import {
	rules,
} from '../../shared/utility/index.js';
import {
	pgp,
} from '../db.js';

export function buildValues(mappedEntity) {
	if (Object.keys(mappedEntity).length === 0) {
		// this shouldn't insert anything
		return `("id") SELECT 0 WHERE 0 = 1`;
	}

	let columns = [];
	const values = [];
	let placeholders = [];

	Object.keys(mappedEntity).forEach((key, i) => {
		columns.push(key);
		values.push(mappedEntity[key]);
		placeholders.push(`$${i + 1}`); // $1 based placeholders
	});

	columns = columns.join('", "'); // inner delimiter
	columns = `("${columns}")`; // outer

	placeholders = placeholders.join(', ');
	placeholders = `(${placeholders})`;

	//? this should be able to format arrays just as any other value, otherwise the format is: ARRAY[value1, value2, ...]
	return pgp.as.format(`${columns} VALUES ${placeholders}`, values);
}

export function buildWhere(mappedEntity) {
	if (Object.keys(mappedEntity).length === 0) { //TODO hacky
		// return a false clause
		return '0 = 1';
	}

	// pair as formatted string
	let pairs = [];
	pairs = Object.keys(mappedEntity).map((key) => {
		// wrap array in another array so that pgp doesn't think its values are for separate placeholders
		const input = (rules.array.test(mappedEntity[key])) ? [mappedEntity[key]] : mappedEntity[key];
		return pgp.as.format(`"${key}" = $1`, input); //! if the value here is undefined, it wont format, it will simply leave the string as '"key" = $1'
	});

	// join with ' AND '
	return pairs.join(' AND ');
}

export function buildSet(mappedEntity) {
	if (Object.keys(mappedEntity).length === 0) { //TODO hacky
		// don't make any change
		//! this does have to reference a column that always exists (id)
		return '"id" = "id"';
	}

	let pairs = [];
	// pair as formatted string
	pairs = Object.keys(mappedEntity).map((key) => {
		const input = (rules.array.test(mappedEntity[key])) ? [mappedEntity[key]] : mappedEntity[key];
		return pgp.as.format(`"${key}" = $1`, input);
	});
	// join with ', '
	return pairs.join(', ');
}
