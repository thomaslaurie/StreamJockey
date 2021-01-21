import test from 'ava';
import {
	Reference,
	formReferences,
	extractValues,
} from './reference.js';

// REFERENCE
test('value is accessible', t => {
	const reference = new Reference('foo');
	t.assert(reference.value = 'foo');
});
test('value is modifiable', t => {
	const reference = new Reference('foo');
	reference.value = 'bar';
	t.assert(reference.value = 'bar');
});
test('value persists through functions', t => {
	const reference = new Reference('foo');
	function modify(reference) {
		reference.value = 'bar';
	}
	modify(reference);
	t.assert(reference.value = 'bar');
});

// FORM REFERENCES
const originals = ['foo', 'bar', new Reference('baz')];
const processed = formReferences(originals);
test('all values turned into references', t => {
	for (const reference of processed) {
		t.assert(reference instanceof Reference);
	}
});
test('values convert to reference values, references remain same', t => {
	processed.forEach((reference, index) => {
		const original = processed[index];

		if (original instanceof Reference) {
			t.assert(reference === original);
		} else {
			t.assert(reference.value === original);
		}
	});
});

// EXTRACT VALUES
const originals2 = [new Reference('foo'), new Reference('bar'), 'baz'];
const processed2 = extractValues(originals2);
test('references convert to values, values remain same', t => {
	processed2.forEach((value, index) => {
		const original = originals2[index];
		if (original instanceof Reference) {
			t.assert(value === original.value);
		} else {
			t.assert(value === original);
		}
	});
});
