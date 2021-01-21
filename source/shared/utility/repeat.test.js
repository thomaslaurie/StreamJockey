import test from 'ava';
import repeat from './repeat.js';
import wait from './time/wait.js';

test('function runs at least once', async t => {
	t.plan(3);

	repeat(() => t.pass(), {
		until: () => true,
		timeout: 0,
		onTimeout() {},
		countout: 1,
		onCountout() {},
	});

	repeat.sync(() => t.pass(), {
		until: () => true,
		timeout: 0,
		onTimeout() {},
		countout: 1,
		onCountout() {},
	});

	await repeat.async(() => t.pass(), {
		until: () => true,
		timeout: 0,
		onTimeout() {},
		countout: 1,
		onCountout() {},
	});
});
test('function runs until', async t => {
	let count1 = 0;
	repeat(() => {
		count1++;
	}, {
		until: () => count1 === 17,
	});
	t.assert(count1 === 17);

	let count2 = 0;
	repeat.sync(() => {
		count2++;
	}, {
		until: () => count2 === 18,
	});
	t.assert(count2 === 18);

	let count3 = 0;
	await repeat.async(() => {
		count3++;
	}, {
		until: () => count3 === 19,
	});
	t.assert(count3 === 19);
});
test('function runs for specified count', async t => {
	t.plan(60);

	repeat(() => t.pass(), {
		countout: 20,
		onCountout() {},
	});

	repeat.sync(() => t.pass(), {
		countout: 20,
		onCountout() {},
	});

	await repeat.async(() => t.pass(), {
		countout: 20,
		onCountout() {},
	});
});
test('function runs for specified time', async t => { //! Flakey, x3
	const timeout = 500;

	let startTime1 = null;
	repeat(() => {
		// Record start time (after timer starts)
		if (startTime1 === null) startTime1 = Date.now();
		// Record end time (before timer ends)
		return Date.now();
	}, {
		timeout,
		onTimeout(lastTime) {
			// Ensure the inner recorded range is less than the outer timeout range.
			t.assert(lastTime - startTime1 <= timeout);
		},
	});

	let startTime2 = null;
	repeat.sync(() => {
		if (startTime2 === null) startTime2 = Date.now();
		return Date.now();
	}, {
		timeout,
		onTimeout(lastTime) {
			t.assert(lastTime - startTime2 <= timeout);
		},
	});

	let startTime3 = null;
	await repeat.async(async () => {
		if (startTime3 === null) startTime3 = Date.now();
		return Date.now();
	}, {
		timeout,
		onTimeout(lastTime) {
			t.assert(lastTime - startTime3 <= timeout); //! Flakey
		},
	});
});
test('async runs in series', async t => {
	const start = Date.now();
	await repeat.async(async () => {
		await wait(100);
	}, {
		countout: 5,
		onCountout() {
			t.assert(Date.now() >= start + 500);
		},
	});
});
test('throws on invalid inputs', async t => {
	t.throws(() => {
		repeat(undefined);
	});
	t.throws(() => {
		repeat(() => {}, {
			until: '',
		});
	});
	t.throws(() => {
		repeat(() => {}, {
			timeout: '',
		});
	});
	t.throws(() => {
		repeat(() => {}, {
			countout: '',
		});
	});
	t.throws(() => {
		repeat(() => {}, {
			onTimeout: '',
		});
	});
	t.throws(() => {
		repeat(() => {}, {
			onCountout: '',
		});
	});

	t.throws(() => {
		repeat.sync(undefined);
	});
	t.throws(() => {
		repeat.sync(() => {}, {
			until: '',
		});
	});
	t.throws(() => {
		repeat.sync(() => {}, {
			timeout: '',
		});
	});
	t.throws(() => {
		repeat.sync(() => {}, {
			countout: '',
		});
	});
	t.throws(() => {
		repeat.sync(() => {}, {
			onTimeout: '',
		});
	});
	t.throws(() => {
		repeat.sync(() => {}, {
			onCountout: '',
		});
	});

	await t.throwsAsync(async () => {
		await repeat.async(undefined);
	});
	await t.throwsAsync(async () => {
		await repeat.async(() => {}, {
			until: '',
		});
	});
	await t.throwsAsync(async () => {
		await repeat.async(() => {}, {
			timeout: '',
		});
	});
	await t.throwsAsync(async () => {
		await repeat.async(() => {}, {
			countout: '',
		});
	});
	await t.throwsAsync(async () => {
		await repeat.async(() => {}, {
			onTimeout: '',
		});
	});
	await t.throwsAsync(async () => {
		await repeat.async(() => {}, {
			onCountout: '',
		});
	});
});
test('previous result is passed to function', async t => {
	t.plan(3);

	const value1 = Symbol();
	repeat(previousResult => {
		if (previousResult !== undefined) t.is(previousResult, value1);
		return value1;
	}, {
		countout: 2,
		onCountout() {},
	});

	const value2 = Symbol();
	repeat.sync(previousResult => {
		if (previousResult !== undefined) t.is(previousResult, value2);
		return value2;
	}, {
		countout: 2,
		onCountout() {},
	});

	const value3 = Symbol();
	await repeat.async(async previousResult => {
		if (previousResult !== undefined) t.is(previousResult, value3);
		return value3;
	}, {
		countout: 2,
		onCountout() {},
	});
});
