import test from 'ava';
import * as keyCode from './key-code.js';

test('matches length', (t) => {
	const k = keyCode.create(27);
	t.assert(k.length === 27);
});
test('uri safe', (t) => {
	const encodedCharacters = encodeURIComponent(keyCode.characters);
	t.assert(encodedCharacters === keyCode.characters);
});

// Technically Flaky
test('adds to list', (t) => { 
	const list = [];
	const first  = keyCode.addTo(list);
	const second = keyCode.addTo(list);
	const third  = keyCode.addTo(list);
	
	t.assert(list.length === 3);
	t.assert(list.find((item) => item.key === first.key)  !== undefined);
	t.assert(list.find((item) => item.key === second.key) !== undefined);
	t.assert(list.find((item) => item.key === third.key)  !== undefined);
});

test('removes key from list', (t) => {
	const list = [];
	const p = keyCode.addTo(list);
	const p2 = keyCode.verify(list, p.key);

	t.assert(list.length === 0);
	t.assert(p === p2);
});
test('throws on timed out key', (t) => {
	const list = [];
	const p = keyCode.addTo(list, 0);
	t.throws(() => keyCode.verify(list, p.key));
});

//TODO test throw on timeout
