//TODO Review these classes, ensure that references to .prototype and .constructor don't break if a sub-class is created.

// COMMANDS
//R commands are separate from the playback module commands because they are supposed to be instanced, queued packets of trigger functionality and frozen state

//G sj.Commands have their own playback state properties so that they can be queued and then collapsed/annihilated if redundant based on these properties
//G they trigger basic playback functions from all the sources while ensuring these playbacks don't collide (ie. play at the same time)
//G tightly integrated with VueX
//TODO consider a stop command? it would stop all sources and set the current source back to null
//TODO im not sure that the null check for sources should go in these commands, also they're inconsistent between the target source and other sources

/* //R
	I considered instead of updating playback state in each source function upon Success, to do a second and final checkPlayback() once updatePlayback() succeeds (this would require two api calls, but I thought it could be simpler (but would it?)).

	I thought because track info is also needed (in addition to playback state) that a final checkPlayback() would be needed to verify the post-update track info, (this came from not knowing what track was playing when starting one for the first time), however this info should already be known from the fetched and displayed track (object), so all of these functions actually do have the ability to update information when resolved.

	This resolution suggests using track objects everywhere as parameters rather than ids; this should be possible because the user is never going to be blindly playing id strings without the app first searching and tying down its additional metadata.
*/
/* //R
	I considered that setting knownPlayback.progress upon start() (0) and seek() (ms) may wipeout any official information from checkPlayback() or listeners, as any information that arrives between sending and receiving the request will be wiped out upon resolution (with less valuable, inferred information).

	However unless the information is being sent from a synchronous or local source (which actually is likely), that information should not be sent and received between the time-span it takes for the playback request to be sent and received - therefore it must be sent before and therefore less accurate/valuable than even the inferred progress information.

	Then I realized that any checks to playback state will have the same offset error as the playback requests so it makes no sense to even checkPlayback() to get more accurate information.
*/

import {
	Track,
} from './entities/index.js';
import {
	asyncMap,
	define,
	rules,
} from '../shared/utility/index.js';
import {
	MultipleErrors, CustomError,
} from '../shared/errors/index.js';
import {
	superPrototype,
} from '../shared/utility/class-parts.js';

class Command {
	constructor(options = {}) {
		const {
			source,
			sourceInstances = [],
		} = options;

		//TODO Validate source.
		//! Non-instance sources are getting passed here (I think).
		//TODO Need to find a proper way to cast or ensure that source is an instance.

		define.constant(this, {
			source,
			sourceInstances,

			// Used to store any collapsed or annihilated commands so that they may be resolved when this command either resolves or is annihilated.
			collapsedCommands: [],
		});

		// Promise resolve & reject functions will be stored on these properties so that the command can act as a deferred promise.
		define.validatedVariable(this, {
			resolve: {
				value() {
					throw new CustomError({
						message: 'command.resolve called but it has not been given a resolve function',
					});
				},
				validator: rules.func.validate,
			},
			reject: {
				value() {
					throw new CustomError({
						message: 'command.reject called but it has not been given a reject function',
					});
				},
				validator: rules.func.validate,
			},
		});
	}
}
define.constant(Command.prototype, {
	fullResolve(success) {
		// Resolve collapsed commands.
		this.collapsedCommands.forEach((collapsedCommand) => {
			collapsedCommand.resolve();
		});
		// Resolve self.
		this.resolve(success);
	},
	fullReject(error) {
		//! RESOLVE collapsed commands.
		this.collapsedCommands.forEach((collapsedCommand) => {
			collapsedCommand.resolve();
		});
		// Reject self.
		this.reject(error);
	},

	isIdenticalTo(otherCommand) {
		// otherCommand must be an Command, and have the same playback-state properties.
		return otherCommand?.source === this.source;
	},
	collapsesInto(otherCommand) {
		// Collapse if identical.
		return this.isIdenticalTo(otherCommand);
	},
	annihilates()  {
		return false;
	},

	async trigger(context) {
		// Load the player if not loaded.
		if (context.state[this.source.name].player === null) {
			await context.dispatch(`${this.source.name}/loadPlayer`);
		}
	},
});

export class Toggle extends Command {
	constructor(options = {}) {
		const {isPlaying} = options;

		rules.boolean.validate(isPlaying);

		super(options);

		define.constant(this, {isPlaying});
	}
}
define.constant(Toggle.prototype, {
	isIdenticalTo(otherCommand) {
		return (
			   superPrototype(Toggle).isIdenticalTo.call(this, otherCommand)
			&& otherCommand.isPlaying === this.isPlaying
		);
	},
	//! Toggle doesn't have a unique collapsesInto because the otherCommand is either identical (and collapses by default) or is opposite and annihilates.
	annihilates(otherCommand) {
		return (
			superPrototype(Toggle).annihilates.call(this, otherCommand)
			|| (
				// Same source, inverse isPlaying, both are sj.Toggle (ie. don't annihilate pauses with starts).
				superPrototype(Toggle).isIdenticalTo.call(this, otherCommand)
				&& otherCommand.isPlaying === !this.isPlaying
				&& otherCommand.constructor === this.constructor
			)
		);
	},
	async trigger(context) {
		await superPrototype(Toggle).trigger.call(this, context);

		await asyncMap(this.sourceInstances, async (source) => {
			if (this.isPlaying && source === this.source) {
				// Resume target if resuming.
				await context.dispatch(`${source.name}/resume`);
			} else if (context.state[source.name].player !== null) {
				// Pause all or rest.
				await context.dispatch(`${source.name}/pause`);
			}
		}).catch(MultipleErrors.throw);
	},
});

export class Seek extends Command {
	constructor(options = {}) {
		const {progress} = options;

		rules.unitInterval.validate(progress);

		super(options);

		define.constant(this, {progress});
	}
}
define.constant(Seek.prototype, {
	collapsesInto(otherCommand) {
		return superPrototype(Seek).collapsesInto.call(this, otherCommand)
			|| otherCommand.constructor === Seek;
	},
	isIdenticalTo(otherCommand) {
		return superPrototype(Seek).isIdenticalTo.call(this, otherCommand)
			&& otherCommand.progress === this.progress;
	},
	async trigger(context) {
		await superPrototype(Seek).trigger.call(this, context);

		await context.dispatch(`${this.source.name}/seek`, this.progress);
	},
});

export class Volume extends Command {
	constructor(options = {}) {
		const {volume} = options;

		rules.unitInterval.validate(volume);

		super(options);

		define.constant(this, {volume});
	}
}
define.constant(Volume.prototype, {
	collapsesInto(otherCommand) {
		return superPrototype(Volume).collapsesInto.call(this, otherCommand)
			|| otherCommand.constructor === Volume;
	},
	isIdenticalTo(otherCommand) {
		return superPrototype(Volume).isIdenticalTo.call(this, otherCommand)
			&& otherCommand.volume === this.volume;
	},
	async trigger(context) {
		await superPrototype(Volume).trigger.call(this, context);

		// Adjust volume on all sources.
		await asyncMap(this.sourceInstances, async (source) => {
			if (context.state[source.name].player !== null) {
				await context.dispatch(`${source.name}/volume`, this.volume);
			}
		}).catch(MultipleErrors.throw);
	},
});

export class Start extends Command {
	constructor(options = {}) {
		const {
			track,
			isPlaying = true,
			progress = 0,
		} = options;

		if (!(track instanceof Track)) {
			throw new CustomError({
				message: 'sj.Start instance.track must be an Track',
			});
		}

		super(options);

		define.constant(this, {
			track,
		});
		define.validatedVariable(this, {
			isPlaying: {
				value: isPlaying,
				validator: rules.boolean.validate,
			},
			progress: {
				value: progress,
				validator: rules.unitInterval.validate,
			},
		});
	}
}
define.constant(Start.prototype, {
	collapsesInto(otherCommand) {
		// Collapses parent condition, any Start, Toggle, or Seek.
		//TODO //? Tight coupling?
		return superPrototype(Start).collapsesInto.call(this, otherCommand)
			|| otherCommand.constructor === Start
			|| otherCommand.constructor === Toggle
			|| otherCommand.constructor === Seek;
	},
	isIdenticalTo(otherCommand) {
		return (
			superPrototype(Start).isIdenticalTo.call(this, otherCommand)
			// Catch non-Tracks.
			&& (otherCommand.track instanceof Track)
			//! Compare tracks by their sourceId not by their reference.
			&& otherCommand.track.sourceId === this.track.sourceId
			&& otherCommand.isPlaying === this.isPlaying
			&& otherCommand.progress === this.progress
		);
	},
	async trigger(context) {
		await superPrototype(Start).trigger.call(this, context);

		// Pause all.
		await asyncMap(this.sourceInstances, async (source) => {
			if (context.state[source.name].player !== null) {
				await context.dispatch(`${source.name}/pause`);
			}
		}).catch(MultipleErrors.throw);

		// Change startingTrackSubscription to subscription of the new track.
		context.commit('setStartingTrackSubscription', await context.dispatch('resubscribe', {
			subscription: context.state.startingTrackSubscription,

			Entity: Track,
			query: {id: this.track.id},
			options: {}, //TODO //?
		}, {
			//L https://vuex.vuejs.org/guide/modules.html#accessing-global-assets-in-namespaced-modules
			root: true,
		}));

		// Start target.
		await context.dispatch(`${this.source.name}/start`, this.track);

		// Transfer subscription from starting to current.
		context.commit('setCurrentTrackSubscription', context.state.startingTrackSubscription);
		context.commit('setStartingTrackSubscription', null);

		// Change source.
		context.commit('setSource', this.source);
	},
});
