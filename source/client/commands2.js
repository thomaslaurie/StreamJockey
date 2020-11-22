import {
	Track,
} from './entities/index.js';
import {
	asyncMap,
	define,
	forSimpleKeysOf,
	Rule,
	rules,
} from '../shared/utility/index.js';
import {
	MultipleErrors, CustomError, InvalidStateError,
} from '../shared/errors/index.js';

/* //!//G
	While triggers and promise-handlers are guaranteed to execute in order. It is not guaranteed that the promise-handler of a command will execute before the trigger of a subsequent command.

	This is due to how the Microtask Queue works.

	Example:
		Command 1 Trigger
		Command 2 Trigger
		Command 1 Handler
		Command 2 Handler

	This should not be an issue because a command trigger should not depend on any effects of a previous command's handler.
		If that is the case then those effects should be in the previous command's trigger and not its handler.
*/

const playbackStateRule = new Rule({
	validator(options) {
		const {
			source,
			track,
			isPlaying,
			progress,
			volume,
		} = options;

		// Both source and track are optional because they aren't required for some commands (volume, toggle).

		//TODO Validate source.
		//! Non-instance sources are getting passed here (I think).
		//TODO Need to find a proper way to cast or ensure that source is an instance.

		// Optional Source
		// if (!(source === undefined || source instanceof Source)) {
		// 	throw new Error('Source is not undefined or a source.');
		// }
		// Source must be defined if track is defined.
		if (source === undefined && track !== undefined) {
			throw new Error('Track has been provided without a source.');
		}
		// Optional Track
		if (!(track === undefined || (track instanceof Track))) {
			throw new Error('Track is not undefined or a track.');
		}
		// Optional IsPlaying
		if (!(isPlaying === undefined || rules.boolean.test(isPlaying))) {
			throw new Error('Value is not undefined or a boolean.');
		}
		// Optional Progress
		if (!(progress === undefined || rules.unitInterval.test(progress))) {
			throw new Error('Value is not undefined or a unit interval.');
		}
		// Optional Volume
		if (!(volume === undefined || rules.unitInterval.test(volume))) {
			throw new Error('Value is not undefined or a unit interval.');
		}
	},
});

// Validated, Immutable Playback State
export class PlaybackState {
	constructor(options = {}) {
		playbackStateRule.validate(options);

		const {
			source,
			track,
			isPlaying,
			progress,
			volume,
		} = options;

		define.constant(this, {
			source,
			track,
			isPlaying,
			progress,
			volume,
		});

		Object.freeze(this);
	}
}
define.constant(PlaybackState.prototype, {
	isValueEqual(otherState, key) {
		return (key === 'track')
			? this[key]?.sourceId === otherState[key]?.sourceId
			: this[key]           === otherState[key];
	},
	encapsulates(otherState, ...exceptions) {
		// True if all defined values (with exceptions) of the other state are equal to the same values of this state.
		const keys = Object.keys(otherState).filter(key => !exceptions.includes(key));
		return !keys.some(key => !(
			otherState[key] === undefined
			|| otherState.isValueEqual(this, key)
		));
	},
});

class Command {
	constructor(options) {
		const source = options?.state?.source;
		const trigger = options?.trigger;

		rules.func.validate(trigger);

		define.writable(this, {
			state: new PlaybackState({source}),
		});
		define.constant(this, {trigger});


		define.constant(this, {
			// Stores dequeued commands so that they may be resolved when this command resolves.
			dequeuedPrevCommands: [],
			dequeuedNextCommands: [],
		});


		// Resolve and reject functions will be assigned to these properties when they are queued. The command will act as a deferred promise.
		define.validatedVariable(this, {
			resolveDeferred: {
				value() {
					throw new Error('command.resolveDeferred was called but the command has not been given a resolve function.');
				},
				validator: rules.func.validate,
			},
			rejectDeferred: {
				value() {
					throw new Error('command.rejectDeferred was called but the command has not been given a reject function.');
				},
				validator: rules.func.validate,
			},
		});
	}
}
define.constant(Command.prototype, {
	resolve() {
		console.log('\n', '  resolved', this.constructor.name); //TODO
		// Resolve prev commands backwards.
		for (let i = this.dequeuedPrevCommands.length - 1; i >= 0; i--) {
			this.dequeuedPrevCommands[i].resolve();
		}
		// Resolve self.
		this.resolveDeferred();
		// Resolve next commands forwards.
		for (let i = 0; i < this.dequeuedNextCommands.length; i++) {
			this.dequeuedNextCommands[i].resolve();
		}
	},
	reject() {
		// Reject prev commands backwards.
		for (let i = this.dequeuedPrevCommands.length - 1; i >= 0; i--) {
			this.dequeuedPrevCommands[i].reject();
		}
		// Reject self.
		this.rejectDeferred();
		// Reject next commands forwards.
		for (let i = 0; i < this.dequeuedNextCommands.length; i++) {
			this.dequeuedNextCommands[i].reject();
		}
	},

	// Should be overwritten by child classes with encapsulation exceptions.
	overwrites(otherCommand) {
		return this.state.encapsulates(otherCommand.state);
	},

	extendState(properties) {
		define.constant(this, {
			state: new PlaybackState({
				source: this.state.source,
				...properties,
			}),
		});
	},
});

export class Toggle extends Command {
	constructor(options) {
		const isPlaying = options?.state?.isPlaying;
		rules.boolean.validate(isPlaying);
		super(options);
		this.extendState({isPlaying});
	}
}
define.constant(Toggle.prototype, {
	overwrites(otherCommand) {
		return this.state.encapsulates(otherCommand.state, 'isPlaying');
	},
});
export class Seek extends Command {
	constructor(options) {
		const progress = options?.state?.progress;
		rules.unitInterval.validate(progress);
		super(options);
		this.extendState({progress});
	}
}
define.constant(Seek.prototype, {
	overwrites(otherCommand) {
		return this.state.encapsulates(otherCommand.state, 'progress');
	},
});
export class Volume extends Command {
	constructor(options) {
		const volume = options?.state?.volume;
		rules.unitInterval.validate(volume);
		super(options);
		this.extendState({volume});
	}
}
define.constant(Volume.prototype, {
	overwrites(otherCommand) {
		return this.state.encapsulates(otherCommand.state, 'volume');
	},
});
export class Start extends Command {
	constructor(options) {
		const track   = options?.state?.track;
		let isPlaying = options?.state?.isPlaying;
		let progress  = options?.state?.progress;

		// Not using nullish here because passing null should throw.
		//TODO If it turns out that null is not a valid value for track, then maybe it would be useful to consider undefined and null the same for commands. This would involve updating the encapsulated function.
		if (isPlaying === undefined) isPlaying = true;
		if (progress  === undefined) progress  = 0;

		//TODO make rule or something
		if (!(track instanceof Track)) {
			throw new Error('Start track is not a track.');
		}
		rules.boolean.validate(isPlaying);
		rules.unitInterval.validate(progress);

		super(options);
		this.extendState({
			track,
			isPlaying,
			progress,
		});
	}
}
define.constant(Start.prototype, {
	overwrites(otherCommand) {
		return this.state.encapsulates(otherCommand.state, 'track', 'isPlaying', 'progress');
	},
});

const nullableCommand = new Rule({
	validator(value) {
		if (value !== null && !(value instanceof Command)) {
			throw new InvalidStateError({
				message: 'Sent command is not a Command or null.',
				state: value,
			});
		}
	},
});

export class CommandQueue {
	constructor({getCurrentState} = {}) {
		//! getCurrentState must be synchronous.
		rules.func.validate(getCurrentState);
		define.constant(this, {
			getCurrentState,
			queue: [],
		});
		define.validatedVariable(this, {
			sentCommand: {
				value: null,
				validator: nullableCommand.validate,
			},
		});
	}
}
define.constant(CommandQueue.prototype, {
	async pushCommand(command) {
		console.log('\n', this.queue.length, 'push start');

		// Validate command.
		if (!(command instanceof Command)) {
			throw new InvalidStateError({
				message: 'Pushed command is not a Command.',
				state: command,
			});
		}

		// Give this command its promise handlers.
		const deferredPromise = new Promise((resolve, reject) => {
			command.resolveDeferred = resolve;
			command.rejectDeferred = reject;
		});

		const queue = this.queue;
		let push = true;

		// Removes redundant commands if possible.
		(function compact(i) {
			if (i >= 0) {
				const prevCommand = queue[i];

				// Validate previous command.
				if (!(prevCommand instanceof Command)) {
					throw new InvalidStateError({
						message: 'Unrecognized value encountered in the command queue.',
						state: {
							value: prevCommand,
							index: i,
							queue,
						},
					});
				}

				// Check if the previous command can be dequeued into this command.
				if (command.overwrites(prevCommand)) {
					// Remove previous command from queue.
					console.log('\n', queue.length, 'dequeueing', prevCommand.constructor.name, prevCommand.state.isPlaying);
					queue.splice(i, 1);
					console.log('\n', queue.length, 'dequeued', prevCommand.constructor.name, prevCommand.state.isPlaying);
					// Attach it to this command.
					command.dequeuedPrevCommands.push(prevCommand);
					// Analyze the next previous command.
					compact(i - 1);
				// Check if this command can be dequeued into the next command.
				} else if (prevCommand.state.encapsulates(command.state)) {
					// Attach it to the next command.
					prevCommand.dequeuedNextCommands.push(command);
					// End, do not push the command.
					push = false;
				}
			}
		})(queue.length - 1);

		// If the command is to be pushed to the front of the queue:
		if (push && queue.length === 0) {
			// If there is a sent command.
			if (this.sentCommand !== null) { // eslint-disable-line no-negated-condition
				//! Do not check if this command overwrites the sent command. It is already sent and cannot be dequeued.

				// Check if this command can be dequeued into the sent command.
				if (this.sentCommand.state.encapsulates(command.state)) {
					// Attach it to the sent command.
					this.sentCommand.dequeuedNextCommands.push(command);
					// Do not push.
					push = false;
				}
			} else {
				const currentState = this.getCurrentState();
				if (!(currentState instanceof PlaybackState)) {
					throw new InvalidStateError({
						message: 'Current state is not a PlaybackState.',
						state: currentState,
					});
				}

				// Check if this command can be dequeued into the current state.
				if (currentState.encapsulates(command.state)) {
					// Don't queue, resolve immediately.
					push = false;
					deferredPromise.resolve();
				}
			}
		}

		if (push) {
			console.log('\n', queue.length, 'pushing');
			queue.push(command);
			console.log('\n', queue.length, 'pushed');
		}

		// Send next command.
		//! Does not await.
		//R This must go inside push. Otherwise the caller has no way of knowing when the queue has new commands pushed.
		this.sendNextCommand();

		return deferredPromise;
	},
	pullCommand() {
		console.log('\n', this.queue.length, 'pulling');
		const x = this.queue.splice(0, 1)[0];
		console.log('\n', this.queue.length, 'pulled');
		return x;
	},
	async sendNextCommand() {
		// Prevents a command from being pulled synchronously.
		// This allows the first command to be overwritten by a later command when multiple commands are being queued synchronously.
		await null;

		// Don't do anything if there is a sent command or if no commands are in the queue.
		if (this.sentCommand !== null || !(this.queue.length > 0)) {
			return;
		}

		// Take a command from the top of the queue and set it as the sent command.
		this.sentCommand = this.pullCommand();

		// Trigger and attach to the command promise handlers.
		await this.sentCommand.trigger().then((resolved) => {
			this.sentCommand.resolve(resolved);
		}, (rejected) => {
			this.sentCommand.reject(rejected);
		});

		// Mark the sent command as finished.
		this.sentCommand = null; // eslint-disable-line require-atomic-updates
		//TODO Verify if this is an actual race condition, try moving the await null after the if statement above. See that that makes sense because the return could be conditionally setting sentCommand based on if this executes in a macroTask or the microTask

		// Send the next command.
		//! This does not await, it just restarts the cycle.
		this.sendNextCommand();
	},
});
