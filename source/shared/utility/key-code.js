import {
	Rule,
	rules,
} from './validation/index.ts';
import repeat from './repeat.js';

const packRule = new Rule({
	validator(value) {
		rules.object.validate(value);
		rules.string.validate(value.key);
		rules.nonNegativeInteger.validate(value.timestamp);
		rules.nonNegativeInteger.validate(value.timeout);
	},
});

export const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export function create(length = 10) {
	// Validate input.
	rules.nonNegativeInteger.validate(length);

	// Create.
	let key = '';
	for (let i = 0; i < length; i++) {
		const index = Math.floor(Math.random() * characters.length);
		key += characters.charAt(index);
	}

	// Validate output.
	rules.string.validate(key);

	// Return.
	return key;
}

const defaultTimeout = 300000; // 5 minutes
const tryLimit = 1000;
// Adds a new unique key to the list, returns a pack {key, timeout, timestamp}
export function addTo(list, timeout = defaultTimeout) {
	// Validate inputs.
	rules.array.validate(list);
	rules.nonNegativeInteger.validate(timeout);

	// Create.
	const key = repeat(() => create(), {
		until: key => !list.includes(key),
		countout: tryLimit,
		onCountout() {
			throw new Error(`Failed to add key to list, took over ${tryLimit} tries.`);
		},
	});
	const timestamp = Date.now();
	const pack = {
		key,
		timestamp,
		timeout: timestamp + timeout,
	};

	// Validate output.
	packRule.validate(pack);

	// Return.
	list.push(pack);
	return pack;
}

// Checks if a list has a key. Cleans up timed-out keys.
export function verify(list, key) {
	// Validate inputs.
	rules.array.validate(list);
	rules.string.validate(key);

	// Iterate over list.
	for (let i = list.length - 1; i >= 0; i--) {
		const pack = list[i];

		// Validate items in the list.
		packRule.validate(pack);

		// Determine if item has timed out.
		const fresh = pack.timeout > Date.now();

		if (pack.key === key) {
			// If key matches,
			if (fresh) {
				// and it hasn't timed out, remove the pack from the list and return it,
				return list.splice(i, 1)[0];
			}
			// else throw a timeout error.
			throw new Error('Key timed out.');
		} else if (!fresh) {
			// Remove non-matching packs if they've timed out.
			list.splice(i, 1);
		}
	}

	// If the key isn't found, throw an error.
	throw new Error('Invalid key.');
}
