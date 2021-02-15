import test from 'ava';
import propagate, {errorSharedRegistryId} from './propagate.js';
import {sharedRegistry} from './class-registry.js';
import {UnexpectedValueThrown, UnknownError, UnreachableError} from './errors/index.js';

function testThrowsAndIsRegistered(t, Class, func) {
	const error = t.throws(func);
	t.true(sharedRegistry.isRegistered(error));
	t.is(error.constructor, Class);
}

test('registered error', t => {
	testThrowsAndIsRegistered(t, Error, () => {
		const error = new Error();
		sharedRegistry.defineId(error, errorSharedRegistryId);
		propagate(error);
	});
});
test('un-registered error', t => {
	testThrowsAndIsRegistered(t, Error, () => {
		const error = new Error();
		propagate(error);
	});
});
test('unreachable', t => {
	testThrowsAndIsRegistered(t, UnreachableError, () => {
		const error = new Error();
		Object.defineProperty(error, sharedRegistry.idKey, {
			value: Symbol(), // Something thats not the sharedRegistryId
			configurable: false,
			writable: false,
		});
		propagate(error);
	});
});
test('unknown error', t => {
	testThrowsAndIsRegistered(t, UnknownError, () => {
		class UnregisteredError extends Error {}
		const error = new UnregisteredError();
		propagate(error);
	});
});
test('unexpected value', t => {
	testThrowsAndIsRegistered(t, UnexpectedValueThrown, () => {
		const error = 'foo';
		propagate(error);
	});
});
