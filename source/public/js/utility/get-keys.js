
// Returns all keys of an object that match the specified attributes.
// Defaults to own, named, enumerable keys. This is the same as Object.keys().

// Additional filtering can be done via the filter option. This avoids iterating keys twice.
//! value is not passed to the filter function to avoid invoking getters.

export default function getKeys(object, {
	own = true,
	inherited = false,
	
	named = true,
	symbol = false,
	
	enumerable = true,
	nonEnumerable = false,

	filter = (key, object) => true,
} = {}) {
	if (typeof filter !== 'function') throw new Error('filter is not a function');

	const keys = [];

	// undefined & null return empty array
	if (object == null) return keys;
	
	const chain = [];
	if (own) chain.push(object);
	if (inherited) {
		let target = Object.getPrototypeOf(object);
		while (target !== null) {
			chain.push(target);
			target = Object.getPrototypeOf(target);
		}
	}
	
	for (const target of chain) {
		const targetKeys = [];
		if (named)  targetKeys.push(...Object.getOwnPropertyNames  (target));
		if (symbol) targetKeys.push(...Object.getOwnPropertySymbols(target));
		
		for (const targetKey of targetKeys) {
			const isEnumerable = Object.prototype.propertyIsEnumerable.call(target, targetKey);

			const keyMatchesAttributes = (enumerable && isEnumerable) || (nonEnumerable && !isEnumerable);

			if (keyMatchesAttributes && !keys.includes(targetKey) && filter(targetKey, target)) {
				keys.push(targetKey);
			}
		}
	}
	
	return keys;
};