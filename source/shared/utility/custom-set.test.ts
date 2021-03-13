import test from 'ava';
import CustomSet from './custom-set';

test('empty set has nothing', async t =>  {
	const set = new CustomSet();

	t.false(set.has('foo'));
	t.false(set.has(undefined));
});

test('set has undefined, delete undefined', async t => {
	const set = new CustomSet();

	set.add(undefined);
	t.false(set.has('foo'));
	t.true(set.has(undefined));

	set.delete(undefined);
	t.false(set.has('foo'));
	t.false(set.has(undefined));
});

test('set has another value, delete another value', async t => {
	const set = new CustomSet();

	set.add('foo');
	t.true(set.has('foo'));
	t.false(set.has(undefined));

	set.delete('foo');
	t.false(set.has('foo'));
	t.false(set.has(undefined));
});

test('set has undefined, delete another value', async t => {
	const set = new CustomSet();

	set.add(undefined);
	t.false(set.has('foo'));
	t.true(set.has(undefined));

	set.delete('foo');
	t.false(set.has('foo'));
	t.true(set.has(undefined)); //! Ensure undefined is not removed if not found.
});

test('set has another value, delete undefined', async t => {
	const set = new CustomSet();

	set.add('foo');
	t.true(set.has('foo'));
	t.false(set.has(undefined));

	set.delete(undefined);
	t.true(set.has('foo'));
	t.false(set.has(undefined));
});
