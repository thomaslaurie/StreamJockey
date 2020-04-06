//TODO Test functions with [value] and [object, key] parameters.

import test from 'ava';
import { 
	Interface, 
	SymbolInterface, 
	exists, 
	ALL, 
	ANY,
} from './interface.js';

test('complete interface', (t) => {
	t.assert((new Interface({
		jump: exists,
		swim: exists,
		fly:  exists,
	})).isImplementedBy({
		jump: 'jump',
		swim: 'swim',
		fly:  'fly',
	}))
});

test('incomplete interface', (t) => {
	t.assert(!(new Interface({
		jump: exists,
		swim: exists,
		fly:  exists,
	})).isImplementedBy({
		jump: 'jump',
		swim: 'swim',
	}));
});

test('exists succeeds', (t) => {
	t.assert((new Interface({
		foo: exists,
	})).isImplementedBy({
		foo: undefined,
	}));
});

test('exists fails', (t) => {
	t.assert(!(new Interface({
		foo: exists,
	})).isImplementedBy({}));
});

test('validator succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => o[k] === 'foo',
	})).isImplementedBy({
		foo: 'foo',
	}));
});

test('validator fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => o[k] === 'foo',
	})).isImplementedBy({
		foo: 'bar',
	}));
});

test('full undefined succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => o[k] === undefined,
	})).isImplementedBy({}));
});

test('full undefined fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => o[k] === undefined,
	})).isImplementedBy({
		foo: 'foo',
	}));
});

test('partial undefined succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => o[k] === undefined,
		bar: (o, k) => o[k] === 'bar',
	})).isImplementedBy({
		bar: 'bar',
	}));
});

test('partial undefined fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => o[k] === undefined,
		bar: (o, k) => o[k] === 'bar',
	})).isImplementedBy({
		foo: 'foo',
		bar: 'bar',
	}));
});

test('full undeclared succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => !(k in o),
	})).isImplementedBy({}));
});

test('full declared fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => !(k in o),
	})).isImplementedBy({
		foo: undefined,
	}));
});

test('partial undeclared succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => !(k in o),
		bar: (o, k) => o[k] === 'bar',
	})).isImplementedBy({
		bar: 'bar',
	}));
});

test('partial undeclared fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => !(k in o),
		bar: (o, k) => o[k] === 'bar',
	})).isImplementedBy({
		foo: undefined,
		bar: 'bar',
	}));
});

test('all succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => o[k] === 'foo',
		bar: (o, k) => o[k] === 'bar',
	})).isImplementedBy({
		foo: 'bar',
		bar: 'foo',
	}, ALL));
});

test('all fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => o[k] === 'foo',
		bar: (o, k) => o[k] === 'bar',
	})).isImplementedBy({
		foo: 'bar',
	}, ALL));
});

test('any succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => o[k] === 'foo',
		bar: (o, k) => o[k] === 'bar',
	})).isImplementedBy({
		foo: 'bar',
	}, ANY));
});

test('any fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => o[k] === 'foo',
		bar: (o, k) => o[k] === 'bar',
	})).isImplementedBy({
		baz: 'baz',
	}, ANY));
});

test('empty', (t) => {
	t.assert((new Interface({
	})).isImplementedBy({
	}));
});

test.beforeEach((t) => {
	t.context.symbolInterface = new SymbolInterface({
		foo: (o, k) => o[k] === 'foo',
	});
});

test('SymbolInterface by value succeeds', (t) => {
	t.assert(t.context.symbolInterface.isImplementedBy({
		[t.context.symbolInterface.foo]: 'foo',
	}));
});

test('SymbolInterface by key fails', (t) => {
	t.assert(!t.context.symbolInterface.isImplementedBy({
		foo: 'foo',
	}));
});
