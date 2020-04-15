//TODO Test functions with [value] and [object, key] parameters.

import test from 'ava';
import { 
	Interface, 
	SymbolInterface,
} from './interface.js';

test('complete interface', (t) => {
	t.assert((new Interface({
		jump: Interface.exists,
		swim: Interface.exists,
		fly:  Interface.exists,
	})).test({
		jump: 'jump',
		swim: 'swim',
		fly:  'fly',
	}))
});

test('incomplete interface', (t) => {
	t.assert(!(new Interface({
		jump: Interface.exists,
		swim: Interface.exists,
		fly:  Interface.exists,
	})).test({
		jump: 'jump',
		swim: 'swim',
	}));
});

test('exists succeeds', (t) => {
	t.assert((new Interface({
		foo: Interface.exists,
	})).test({
		foo: undefined,
	}));
});

test('exists fails', (t) => {
	t.assert(!(new Interface({
		foo: Interface.exists,
	})).test({}));
});

test('validator succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => o[k] === 'foo',
	})).test({
		foo: 'foo',
	}));
});

test('validator fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => o[k] === 'foo',
	})).test({
		foo: 'bar',
	}));
});

test('full undefined succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => o[k] === undefined,
	})).test({}));
});

test('full undefined fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => o[k] === undefined,
	})).test({
		foo: 'foo',
	}));
});

test('partial undefined succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => o[k] === undefined,
		bar: (o, k) => o[k] === 'bar',
	})).test({
		bar: 'bar',
	}));
});

test('partial undefined fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => o[k] === undefined,
		bar: (o, k) => o[k] === 'bar',
	})).test({
		foo: 'foo',
		bar: 'bar',
	}));
});

test('full undeclared succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => !(k in o),
	})).test({}));
});

test('full declared fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => !(k in o),
	})).test({
		foo: undefined,
	}));
});

test('partial undeclared succeeds', (t) => {
	t.assert((new Interface({
		foo: (o, k) => !(k in o),
		bar: (o, k) => o[k] === 'bar',
	})).test({
		bar: 'bar',
	}));
});

test('partial undeclared fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => !(k in o),
		bar: (o, k) => o[k] === 'bar',
	})).test({
		foo: undefined,
		bar: 'bar',
	}));
});

test('all fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => o[k] === 'foo',
		bar: (o, k) => o[k] === 'bar',
	})).test({
		foo: 'bar',
	}, 'all'));
});

test('any fails', (t) => {
	t.assert(!(new Interface({
		foo: (o, k) => o[k] === 'foo',
		bar: (o, k) => o[k] === 'bar',
	})).test({
		baz: 'baz',
	}, 'any'));
});

test('empty', (t) => {
	t.assert((new Interface({
	})).test({
	}));
});

test.beforeEach((t) => {
	t.context.symbolInterface = new SymbolInterface({
		foo: (o, k) => o[k] === 'foo',
	});
});

test('SymbolInterface by value succeeds', (t) => {
	t.assert(t.context.symbolInterface.test({
		[t.context.symbolInterface.keys.foo]: 'foo',
	}));
});

test('SymbolInterface by key fails', (t) => {
	t.assert(!t.context.symbolInterface.test({
		foo: 'foo',
	}));
});

test('throws validator option', (t) => {
	t.throws(() => {
		new Interface({}, {validator: () => {}});
	});
});
test('options are passed to Rule constructor', (t) => {
	const caster = () => {};
	const foo = new Interface({}, {caster});
	t.is(foo.caster, caster);
});




/* //OLD
	test('all succeeds', (t) => {
		t.assert((new Interface({
			foo: (o, k) => o[k] === 'foo',
			bar: (o, k) => o[k] === 'bar',
		})).test({
			foo: 'bar',
			bar: 'foo',
		}, 'all'));
	});

	test('any succeeds', (t) => {
		t.assert((new Interface({
			foo: (o, k) => o[k] === 'foo',
			bar: (o, k) => o[k] === 'bar',
		})).test({
			foo: 'bar',
		}, 'any'));
	});
*/
