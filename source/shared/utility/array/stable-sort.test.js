import test from 'ava';
import stableSort from './stable-sort.js';

test('plain sort', (t) => {
	t.deepEqual(stableSort([2, 1, 0]), [0, 1, 2]);
});
test('compare function', (t) => {
	t.deepEqual(
		stableSort([[2], [1], [0]], (a, b) => a[0] - b[0]), 
		[[0], [1], [2]]
	);
});
test('stable sort', (t) => {
	t.deepEqual(stableSort([
		[0, 1],
		[1, 1],
		[2, 0],
		[3, 1],
		[4, 0],
		[5, 0],
	], (a, b) => a[1] - b[1]), [
		[2, 0],
		[4, 0],
		[5, 0],
		[0, 1],
		[1, 1],
		[3, 1],
	]);
});
