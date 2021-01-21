import test from 'ava';
import capFirst from './capitalize-first-character.js';

test('empty', t => {
	t.is(capFirst(''), '');
});
test('single character', t => {
	t.is(capFirst('a'), 'A');
});
test('multiple characters', t => {
	t.is(capFirst('asdf'), 'Asdf');
});
test('multiple words', t => {
	t.is(capFirst('asdf asdf'), 'Asdf asdf');
});
