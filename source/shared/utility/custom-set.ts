/**
 * A Set that can use a custom compare function.
 * A custom compare function creates a tighter restriction on adding items and a looser restriction on matching and deleting items.
 * //! Slower than Set.
 */
export default class CustomSet<T> extends Set<T> {
	// The compare function will not be used if the values are strictly equal.
	#compareFunction: (a: T, b: T) => boolean;

	constructor(iterable?: T[], compareFunction: (a: T, b: T) => boolean = (a, b) => a === b) {
		super(iterable);
		this.#compareFunction = compareFunction;
	}

	//G Don't expose as public. Just add all the methods that require array casting.
	// @ts-expect-error private method
	get #array() {
		return [...this] as T[];
	}

	// Added Array Methods
	every(...args: Parameters<T[]['every']>) {
		return this.#array.every(...args);
	}
	some(...args: Parameters<T[]['some']>) {
		return this.#array.some(...args);
	}
	find(...args: Parameters<T[]['find']>) {
		return this.#array.find(...args);
	}

	// Set Methods
	has(value: T) {
		//R If values are the same by strict equality, then its impossible for them to be added twice anyways. Might as well short circuit if possible with the faster super method.
		return super.has(value) || this.some(item => this.#compareFunction(value, item));
	}
	add(value: T) {
		return this.has(value) ? this : super.add(value);
	}
	delete(value: T) {
		if (this.has(value)) { // Must use has to distinguish found undefined and not found.
			const foundValue = this.find(item => this.#compareFunction(value, item)) as T;
			return super.delete(foundValue);
		}
		return false;
	}

	// Custom Methods
	// Adds a value to the set. If the value existed, return the value in the set. Otherwise return the passed value which was added.
	addFind(value: T) {
		if (this.has(value)) {
			const foundValue = this.find(item => this.#compareFunction(value, item)) as T;
			return foundValue;
		}
		super.add(value);
		return value;
	}
	// Deletes a value from the set. If the value existed, return the value in the set which was removed. Otherwise return the passed value.
	deleteFind(value: T) {
		if (this.has(value)) {
			const foundValue = this.find(item => this.#compareFunction(value, item)) as T;
			super.delete(foundValue);
			return foundValue;
		}
		return value;
	}
}
