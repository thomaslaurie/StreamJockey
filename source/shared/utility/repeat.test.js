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

/* TODO Find a non-flakey way to test this. Its proven very difficult.
	for (let i = 1; i <= 500; i++) {
		test(`function runs for specified time #${i}`, async t => { //! Flakey, x4
			const timeout = 5;
		
			const deferred1 = new Deferred();
			let startTime1 = null;
			let   endTime1 = Infinity;
			repeat(() => {
				const time = Date.now();
				
				if (startTime1 === null) {
					startTime1 = time;
				}
				
				if (time > endTime1) {
					t.fail(`assertion 1, ${time - endTime1}`);
				}
				
				if (startTime1 + timeout >= time) {
					endTime1 = time;
				}
				
				return time;
			}, {
				timeout,
				onTimeout(lastTime) {
					endTime1 = lastTime;
					// Waits for the next macro-cycle, ensuring that all repeated calls finish.
					setTimeout(() => {
						deferred1.resolve();
					}, 100);
				},
			});
			
			await deferred1;
		
			const deferred2 = new Deferred();
			let startTime2 = null;
			let   endTime2 = Infinity;
			repeat.sync(() => {
				const time = Date.now();
				
				if (startTime2 === null) {
					startTime1 = time;
				}
				
				if (time > endTime2) {
					t.fail(`assertion 2, ${time - endTime2}`);
				}
				
				if (startTime2 + timeout >= time) {
					endTime2 = time;
				}
				
				return time;
			}, {
				timeout,
				onTimeout(lastTime) {
					endTime2 = lastTime;
					setTimeout(() => {
						deferred2.resolve();
					}, 100);
				},
			});
			
			await deferred2;
		
			// const deferred3 = new Deferred();
			// let startTime3 = null;
			// let   endTime3 = null;
			// await repeat.async(async () => {
			// 	const time = Date.now();
			// 	if (endTime3 !== null) t.fail('assertion 3');
			// 	if (startTime3 === null) startTime3 = time;
			// 	if (time >= startTime3 + timeout) endTime3 = time;
			// }, {
			// 	timeout,
			// 	onTimeout() {
			// 		wait(timeout * 2).then(() => {
			// 			t.pass();
			// 			deferred3.resolve();
			// 		});
			// 	},
			// });
			
			// await deferred3;
			
			t.pass();
		});
	}

	// Implementation that should fail if un-commented:
	const timeLimit = time + timeout;
	const countLimit = Math.floor(countout);

	// let delay = true;

	while (true) {
		result = func(result);

		if (until(result)) break;

		// Update
		time = Date.now();
		counter++;

		if (time    >= timeLimit)  {
			// if (delay) {
			// 	delay = false;
			// } else {
				onTimeout(result);
				break;
			// }
		}
		if (counter >= countLimit) {
			// if (delay) {
			// 	delay = false;
			// } else {
				onCountout(result);
				break;
			// }
		}
	}

	return result;
*/

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
