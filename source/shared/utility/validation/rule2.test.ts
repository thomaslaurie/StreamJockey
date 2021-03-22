import test from 'ava';
import Rule from './rule2';

const stringRule = new Rule((value: unknown) => {
	if (typeof value === 'string') {
		return value;
	}
	throw new Error('Value is not a string.');
});

const passValue = 'asdf';
const failValue = 12345;

test('validate passes', t => {
	t.notThrows(() => { stringRule.validate(passValue) });
});
test('validate fails', t => {
	t.throws(() => { stringRule.validate(failValue) });
});
test('test passes', t => {
	t.true(stringRule.test(passValue));
});
test('test fails', t => {
	t.false(stringRule.test(failValue));
});
