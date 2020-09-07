import test from 'ava';
import clamp from './clamp.js';

// MIN / MAX
test('min and max', (t) => {
	t.assert(clamp(3, 4, 6) === 4); // Under
	t.assert(clamp(4, 4, 6) === 4); // Bottom
	t.assert(clamp(5, 4, 6) === 5); // Middle
	t.assert(clamp(6, 4, 6) === 6); // Top
	t.assert(clamp(7, 4, 6) === 6); // Over
});
test('min and max are same', (t) => {
	t.assert(clamp(4, 5, 5) === 5); // Under
	t.assert(clamp(5, 5, 5) === 5); // Bottom/Middle/Top
	t.assert(clamp(6, 5, 5) === 5); // Over
});
test('min and no max', (t) => {
	t.assert(clamp(4, 5, undefined) === 5); // Under
	t.assert(clamp(5, 5, undefined) === 5); // Bottom
	t.assert(clamp(6, 5, undefined) === 6); // Inside
});
test('no min and max', (t) => {
	t.assert(clamp(4, undefined, 5) === 4); // Inside
	t.assert(clamp(5, undefined, 5) === 5); // Top
	t.assert(clamp(6, undefined, 5) === 5); // OVer
});
test('throws min > max', (t) => {
	t.throws(() => { clamp(5, 5, 4) });
});

// VALIDATION
test('throws on NaN', (t) => {
	t.throws(() => { clamp(NaN, 5, 5) });
	t.throws(() => { clamp(5, NaN, 5) });
	t.throws(() => { clamp(5, 5, NaN) });
});
test('throws on non-numbers', (t) => {
	t.throws(() => { clamp('foo', 5, 5) });
	t.throws(() => { clamp(5, 'foo', 5) });
	t.throws(() => { clamp(5, 5, 'foo') });
});
test('throws input if not defined', (t) => {
	t.throws(() => { clamp(undefined, 5, 5) });
});
