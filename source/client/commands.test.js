//TODO Should not be testing the outcome because that is entirely dependant on the trigger and the sendNextCommand function.
//TODO Should only be testing the order of resolution and which triggers get called.
//TODO May have a second set of tests that test outcomes based on mock inputs.

import test from 'ava';
import {Deferred} from '../shared/utility/index.js';
import {
	PlaybackState,
	Toggle,
	Seek,
	Volume,
	Start,
	CommandQueue,
} from './commands2.js';
import Track from './entities/track.js';

/*
test.beforeEach((t) => {
	t.context.currentState = new PlaybackState({
		source:    undefined,
		track:     undefined,
		isPlaying: undefined,
		progress:  undefined,
		volume:    undefined,
	});
	t.context.sentCommand = null;
	t.context.applyState = function applyState(newState) {
		t.context.currentState = new PlaybackState({
			...t.context.currentState,
			...newState,
		});
	};

	t.context.nextCommand = async function nextCommand(commandQueue) {
		// Don't do anything if there is a sent command or if no commands are in the queue.
		if (t.context.sentCommand !== null || !(commandQueue.queue.length > 0)) {
			return;
		}

		// Take a command from the top of the queue and set it as the sent command.
		t.context.sentCommand = commandQueue.pullCommand();

		// Trigger and attach to the command promise handlers.
		//R This could be done in the trigger, however that would make the triggers more complex.
		//TODO Actually, the trigger could be modified upon initialization to attach, however this would break reconstructability.

		await t.context.sentCommand.trigger().then((resolved) => {
			t.context.sentCommand.resolve(resolved);
		}, (rejected) => {
			t.context.sentCommand.reject(rejected);
		});

		// Mark the sent command as finished.
		t.context.sentCommand = null; // eslint-disable-line require-atomic-updates

		// Send the next command.
		//! This does not await, it just restarts the nextCommand cycle.
		t.context.nextCommand(commandQueue);
	};

	t.context.commandQueue = new CommandQueue({
		getCurrentState() {
			return t.context.currentState;
		},
		getSentCommand() {
			return t.context.sentCommand;
		},
		sendNextCommand() {
			return t.context.nextCommand(this);
		},
	});

	t.context.source = {};

	t.context.start = async function start(track) {
		const result = await t.context.commandQueue.pushCommand(new Start2({
			async trigger() {
				t.context.applyState(this.state);
			},
			state: {
				source: t.context.source,
				track,
			},
		}));
		return result;
	};
	t.context.pause = async function pause() {
		const deferred = t.context.commandQueue.pushCommand(new Toggle2({
			async trigger() {
				t.context.applyState(this.state);
			},
			state: {
				source: t.context.source,
				isPlaying: false,
			},
		}));
		return deferred;
	};
	t.context.resume = async function resume() {
		const result = await t.context.commandQueue.pushCommand(new Toggle2({
			async trigger() {
				t.context.applyState(this.state);
			},
			state: {
				source: t.context.source,
				isPlaying: true,
			},
		}));
		return result;
	};
	t.context.seek = async function seek(progress) {
		const result = await t.context.commandQueue.pushCommand(new Seek2({
			async trigger() {
				t.context.applyState(this.state);
			},
			state: {
				source: t.context.source,
				progress,
			},
		}));
		return result;
	};
	t.context.volume = async function volume(volume) {
		const result = await t.context.commandQueue.pushCommand(new Volume2({
			async trigger() {
				t.context.applyState(this.state);
			},
			state: {
				source: t.context.source,
				volume,
			},
		}));
		return result;
	};
});
test('foo', async (t) => {
	await t.context.pause();
	t.is(t.context.currentState.source, t.context.source, 'source');
	t.is(t.context.currentState.isPlaying, false, 'isPlaying');
});
*/


const triggered = Symbol();
const fulfilled = Symbol();
const rejected  = Symbol();
const reject    = Symbol();

test.beforeEach((t) => {
	t.context.source = {};

	t.context.commandQueue = new CommandQueue({
		getCurrentState() {
			// Empty state, ensures that command always gets sent.
			return new PlaybackState();
		},
	});

	// Actions
	t.context.start = async function start(trigger, track) {
		const result = await t.context.commandQueue.pushCommand(new Start({
			trigger,
			state: {
				source: t.context.source,
				track,
			},
		}));
		return result;
	};
	t.context.pause = async function pause(trigger) {
		const deferred = t.context.commandQueue.pushCommand(new Toggle({
			trigger,
			state: {
				source: t.context.source,
				isPlaying: false,
			},
		}));
		return deferred;
	};
	t.context.resume = async function resume(trigger) {
		const result = await t.context.commandQueue.pushCommand(new Toggle({
			trigger,
			state: {
				source: t.context.source,
				isPlaying: true,
			},
		}));
		return result;
	};
	t.context.seek = async function seek(trigger, progress) {
		const result = await t.context.commandQueue.pushCommand(new Seek({
			trigger,
			state: {
				source: t.context.source,
				progress,
			},
		}));
		return result;
	};
	t.context.volume = async function volume(trigger, vol) {
		const result = await t.context.commandQueue.pushCommand(new Volume({
			trigger,
			state: {
				source: t.context.source,
				volume: vol,
			},
		}));
		return result;
	};

	// Tracker
	t.context.trackActions = async function trackActions(actions) {
		const order = [];

		const trackedActions = actions.map(([id, action, value, r]) => {
			async function trigger() {
				/* //! Prevents the trigger from being recorded before the then-handler of a previous command.

					This is done by delaying the trigger into the same micro-task as the then-handlers.

					//R This is only relevant for testing because the affects of a then-handler should not be relied upon by the trigger of a subsequent command.

					This is equivalent to putting a second await null; at the top of sendNextCommand.

					It changes the order from this:

					[ 0, triggered ],
					[ 1, triggered ],
					[ 0, fulfilled ],
					[ 2, triggered ],
					[ 1, fulfilled ],
					[ 3, triggered ],
					[ 2, fulfilled ],
					[ 4, triggered ],
					[ 3, fulfilled ],
					[ 5, triggered ],
					[ 4, fulfilled ],
					[ 5, fulfilled ],

					to this:

				  	[ 0, triggered ],
					[ 0, fulfilled ],
					[ 1, triggered ],
					[ 1, fulfilled ],
					[ 2, triggered ],
					[ 2, fulfilled ],
					[ 3, triggered ],
					[ 3, fulfilled ],
					[ 4, triggered ],
					[ 4, fulfilled ],
				*/
				await null;

				console.log('   triggered', id);
				order.push([id, triggered]);

				if (r === reject) {
					throw new Error('Rejected trigger.');
				}
			}
			return action(trigger, value).then(() => {
				console.log('   fulfilled', id);
				order.push([id, fulfilled]);
			}, () => {
				console.log('   rejected', id);
				order.push([id, rejected]);
			});
		});

		await Promise.allSettled(trackedActions);

		return order;
	};
});


/* eslint-disable no-magic-numbers, no-sparse-arrays */

// SIMPLE INTERACTIONS

// Start
test('start overwrites start', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.start, new Track()],
		[1, t.context.start, new Track()],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('start overwrites pause', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.pause],
		[1, t.context.start, new Track()],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('start overwrites resume', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.resume],
		[1, t.context.start, new Track()],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('start overwrites seek', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.seek, 0.1],
		[1, t.context.start, new Track()],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('start ignores volume', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.volume, 0.1],
		[1, t.context.start, new Track()],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});

// Pause
test('pause ignores start', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.start, new Track()],
		[1, t.context.pause],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});
test('pause overwrites pause', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.pause],
		[1, t.context.pause],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('pause overwrites resume', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.resume],
		[1, t.context.pause],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('pause ignores seek', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.seek, 0.1],
		[1, t.context.pause],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});
test('pause ignores volume', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.volume, 0.1],
		[1, t.context.pause],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});

// Resume
test('resume compacts into start', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.start, new Track()],
		[1, t.context.resume],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('resume overwrites pause', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.pause],
		[1, t.context.resume],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('resume overwrites resume', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.resume],
		[1, t.context.resume],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('resume ignores seek', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.seek, 0.1],
		[1, t.context.resume],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});
test('resume ignores volume', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.volume, 0.1],
		[1, t.context.resume],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});

// Seek
test('seek ignores start', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.start, new Track()],
		[1, t.context.seek, 0.1],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});
test('seek ignores pause', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.pause],
		[1, t.context.seek, 0.1],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});
test('seek ignores resume', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.resume],
		[1, t.context.seek, 0.1],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});
test('seek overwrites seek', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.seek, 0.2],
		[1, t.context.seek, 0.1],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('seek ignores volume', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.volume, 0.1],
		[1, t.context.seek, 0.1],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});

test('seek 0 compacts into start', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.start, new Track()],
		[1, t.context.seek, 0],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});

// Volume
test('volume ignores start', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.start, new Track()],
		[1, t.context.volume, 0.1],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});
test('volume ignores pause', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.pause],
		[1, t.context.volume, 0.1],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});
test('volume ignores resume', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.resume],
		[1, t.context.volume, 0.1],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});
test('volume overwrites volume', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.volume, 0.1],
		[1, t.context.volume, 0.1],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('volume ignores seek', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.seek, 0.2],
		[1, t.context.volume, 0.1],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});


// Resolution
test('one command fulfills', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.pause],
	]), [
		[0, triggered],
		[0, fulfilled],
	]);
});
test('one command rejects', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.pause, , reject],
	]), [
		[0, triggered],
		[0, rejected],
	]);
});


// Rejections
test('prev command rejects if compacted into rejected command', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.pause],
		[1, t.context.resume, , reject],
	]), [
		[1, triggered],
		[0, rejected],
		[1, rejected],
	]);
});
test('prev command fulfills if compacted into fulfilled command', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.pause, , reject],
		[1, t.context.resume],
	]), [
		[1, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});
test('next command rejects if compacted into rejected command', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.start, new Track(), reject],
		[1, t.context.resume],
	]), [
		[0, triggered],
		[0, rejected],
		[1, rejected],
	]);
});
test('next command fulfills if compacted into fulfilled command', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.start, new Track()],
		[1, t.context.resume, , reject],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, fulfilled],
	]);
});


// Different Source
test('different source does not overwrite', async (t) => {
	async function differentResume(trigger) {
		const deferred = t.context.commandQueue.pushCommand(new Toggle({
			trigger,
			state: {
				source: {},
				isPlaying: true,
			},
		}));
		return deferred;
	}

	t.deepEqual(await t.context.trackActions([
		[0, t.context.resume],
		[1, differentResume],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});
test('different source does not compact into prev command', async (t) => {
	async function differentResume(trigger) {
		const deferred = t.context.commandQueue.pushCommand(new Toggle({
			trigger,
			state: {
				source: {},
				isPlaying: true,
			},
		}));
		return deferred;
	}

	t.deepEqual(await t.context.trackActions([
		[0, t.context.start, new Track()],
		[1, differentResume],
	]), [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
	]);
});

// MISC
test('commands trigger and resolve sequentially', async (t) => {
	const order = await t.context.trackActions([
		[0, t.context.seek, 0.1],
		[1, t.context.pause],
		[2, t.context.seek, 0.2],
		[3, t.context.pause],
		[4, t.context.seek, 0.3],
		[5, t.context.pause],
	]);
	t.deepEqual(order, [
		[0, triggered],
		[0, fulfilled],
		[1, triggered],
		[1, fulfilled],
		[2, triggered],
		[2, fulfilled],
		[3, triggered],
		[3, fulfilled],
		[4, triggered],
		[4, fulfilled],
		[5, triggered],
		[5, fulfilled],
	]);
});
test('multiple overwrites of different properties', async (t) => {
	t.deepEqual(await t.context.trackActions([
		[0, t.context.resume],
		[1, t.context.seek, 0.1],
		[2, t.context.start, new Track()],
		[3, t.context.resume],
		[4, t.context.seek, 0.2],
		[5, t.context.start, new Track()],
	]), [
		[5, triggered],
		[0, fulfilled],
		[1, fulfilled],
		[2, fulfilled],
		[3, fulfilled],
		[4, fulfilled],
		[5, fulfilled],
	]);
});

test('compacted command does not trigger or fulfill before sent command', async (t) => {
	const order = [];

	const deferred = new Deferred();

	const sent = t.context.commandQueue.pushCommand(new Start({
		trigger: async () => {
			await deferred;
			order.push('sent triggered');
		},
		state: {
			source: t.context.source,
			track: new Track(),
		},
	})).then(() => {
		order.push('sent fulfilled');
	});

	const queued = t.context.commandQueue.pushCommand(new Toggle({
		trigger: () => {
			order.push('queued triggered');
		},
		state: {
			source: t.context.source,
			isPlaying: true,
		},
	})).then(() => {
		order.push('queued fulfilled');
	});

	// Ensure that queued has been pushed when sent triggers.
	deferred.resolve();

	await Promise.allSettled([sent, queued]);

	t.deepEqual(order, [
		'sent triggered',
		'sent fulfilled',
		'queued fulfilled',
	]);
});
