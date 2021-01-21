import test from 'ava';
import Deferred from './deferred.js';
import wait from './time/wait.js';

test('deferred can be resolved with value', async t => {
	const deferred = new Deferred();
	const value = Symbol();
	deferred.resolve(value);
	t.is(await deferred, value);
});
test('deferred can be rejected with reason', async t => {
	const deferred = new Deferred();
	const reason = Symbol();
	deferred.reject(reason);
	t.is(await deferred.catch(reason => reason), reason);
});
test('modifiers are chain-able', t => {
	const deferred = new Deferred();
	t.is(deferred.timeout(100), deferred);
	deferred.resolve();
});
test('timeout rejects with error', async t => {
	await t.throwsAsync(async () => {
		await (new Deferred()).timeout(0);
	});
});
test('cancel works', async t => {
	const deferred = (new Deferred()).cancel().timeout(0);
	await wait(5);
	t.true(deferred.isPending);
	t.true(deferred.isCanceled);
});
