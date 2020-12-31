//TODO Consider converting this into a Vuex store. That way it will integrate better with its parent store. Another benefit is that getter values are cached until a dependency changes, dependencies being anything that Vuex can detect changes for. One issue with converting might be testing.
//R The problems are more to do with maintaining order of actions. This can be done in Vuex because actions that are synchronous throughout the stack will update the state in a synchronous way, even if actions must be async functions.

/* //OLD Flatten playback getter, doesn't use spread. Possibly more efficient, especially if individual state properties are needed to be retrieved.
	flattenPlayback: (state, getters) => (key) => {
		//TODO Consider if some object spread thing is possible?

		// Value starts as the actualValue.
		let value = getters[`actual${capitalizeFirstCharacter(key)}`];

		if (state.commandQueue instanceof CommandQueue) {
			// If sent command's value is defined, then set it to that.
			const sentCommandValue = state.commandQueue.sentCommand?.[key];
			if (sentCommandValue !== undefined) {
				value = sentCommandValue;
			}

			// If a queued command's value is defined, then set it to that. Iterate to the last command.
			for (const queuedCommand of state.commandQueue.queue) {
				const queuedCommandValue = queuedCommand.state?.[key];
				if (queuedCommandValue !== undefined) {
					value = queuedCommandValue;
				}
			}
		}

		return value;
	},
*/

/* //OLD Commands notes

	//TODO Review these classes, ensure that references to .prototype and .constructor don't break if a sub-class is created.

	// COMMANDS
	//R commands are separate from the playback module commands because they are supposed to be instanced, queued packets of trigger functionality and frozen state

	//G sj.Commands have their own playback state properties so that they can be queued and then collapsed/annihilated if redundant based on these properties
	//G they trigger basic playback functions from all the sources while ensuring these playbacks don't collide (ie. play at the same time)
	//G tightly integrated with VueX
	//TODO consider a stop command? it would stop all sources and set the current source back to null
	//TODO im not sure that the null check for sources should go in these commands, also they're inconsistent between the target source and other sources

	//R
	I considered instead of updating playback state in each source function upon Success, to do a second and final checkPlayback() once updatePlayback() succeeds (this would require two api calls, but I thought it could be simpler (but would it?)).

	I thought because track info is also needed (in addition to playback state) that a final checkPlayback() would be needed to verify the post-update track info, (this came from not knowing what track was playing when starting one for the first time), however this info should already be known from the fetched and displayed track (object), so all of these functions actually do have the ability to update information when resolved.

	This resolution suggests using track objects everywhere as parameters rather than ids; this should be possible because the user is never going to be blindly playing id strings without the app first searching and tying down its additional metadata.

	//R
	I considered that setting knownPlayback.progress upon start() (0) and seek() (ms) may wipeout any official information from checkPlayback() or listeners, as any information that arrives between sending and receiving the request will be wiped out upon resolution (with less valuable, inferred information).

	However unless the information is being sent from a synchronous or local source (which actually is likely), that information should not be sent and received between the time-span it takes for the playback request to be sent and received - therefore it must be sent before and therefore less accurate/valuable than even the inferred progress information.

	Then I realized that any checks to playback state will have the same offset error as the playback requests so it makes no sense to even checkPlayback() to get more accurate information.

*/

import {
	Track,
} from './entities/index.js';
import {
	define,
	Rule,
	rules,
	undeclareUndefined,
} from '../shared/utility/index.js';
import {
	InvalidStateError,
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
		// if (!(rules.nullish.test(source) || source instanceof Source)) {
		// 	throw new Error('Source is not undefined or a source.');
		// }
		// Source must be exist if track exists.
		if (rules.nullish.test(source) && !rules.nullish.test(track)) {
			throw new Error('Track has been provided without a source.');
		}
		// Optional Track
		if (!(rules.nullish.test(track) || track instanceof Track)) {
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

		// vue-proxy-workaround
		define.vueConstant(this, {
			source,
			track,
			isPlaying,
			progress,
			volume,
		});

		Object.freeze(this);
	}
}
define.vueConstant(PlaybackState.prototype, {
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
		define.vueConstant(this, {trigger});


		define.vueConstant(this, {
			// Stores dequeued commands so that they may be resolved when this command resolves.
			dequeuedPrevCommands: [],
			dequeuedNextCommands: [],
		});


		// Resolve and reject functions will be assigned to these properties when they are queued. The command will act as a deferred promise.
		//! Should only be called by the command's own resolve and reject functions.
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
define.vueConstant(Command.prototype, {
	resolve() {
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
		define.vueConstant(this, {
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
define.vueConstant(Toggle.prototype, {
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
define.vueConstant(Seek.prototype, {
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
define.vueConstant(Volume.prototype, {
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
define.vueConstant(Start.prototype, {
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
		define.vueConstant(this, {
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
define.vueConstant(CommandQueue.prototype, {
	pushCommand(command) {
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
					queue.splice(i, 1);
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
				rules.instanceOf.validate(currentState, PlaybackState);

				// Check if this command can be dequeued into the current state.
				if (currentState.encapsulates(command.state)) {
					// Don't queue, resolve immediately.
					push = false;

					command.resolve();
				}
			}
		}

		if (push) {
			queue.push(command);
		}

		// Send next command.
		//! Does not await.
		//R This must go inside push. Otherwise the caller has no way of knowing when the queue has new commands pushed.
		this.sendNextCommand();

		return deferredPromise;
	},
	pullCommand() {
		return this.queue.splice(0, 1)[0];
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
	getDesiredState() {
		const currentState = this.getCurrentState() ?? new PlaybackState();
		rules.instanceOf.validate(currentState, PlaybackState);

		const sentState = this.sentCommand?.state ?? new PlaybackState();

		const states = [currentState, sentState, ...this.queue.map(command => command.state)];

		const desiredStateProperties = states.reduce((previousStates, state) => {
			return {
				...previousStates,
				...undeclareUndefined(state),
			};
		});

		return new PlaybackState(desiredStateProperties);
	},
});
