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

import Base from '../shared/legacy-classes/base.js';
import {
	Track,
} from './entities/index.js';
import {
	Success,
} from '../shared/legacy-classes/success.js';
import {
	Err,
} from '../shared/legacy-classes/error.js';
import isInstanceOf from '../shared/is-instance-of.js';
import {
	asyncMap,
} from '../shared/utility/index.js';
import {
	MultipleErrors,
} from '../shared/errors/index.js';


const Command = Base.makeClass('Command', Base, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			//G must be given a source
			//TODO The non-instance source casting actually seems necessary here for some reason.
			//TODO Find a better way to convert from non-instance to instance.
			/*
			if (!sj.isType(accessory.options.source, sj.Source)) {
				throw new Err({
					origin: 'sj.Command.beforeInitialize()',
					message: 'no source is active to receive this command',
					reason: `sj.Command instance.source must be an sj.Source: ${accessory.options.source}`,
					content: accessory.options.source,
				});
			}
			*/
		},
		defaults: {
			source: undefined,
			sourceInstances: [],
		},
		afterInitialize(accessory) {
			this.collapsedCommands = []; //C an array used to store any collapsed or annihilated commands so that they may be resolved when this command either resolves or is annihilated
			this.fullResolve = function (success) {
				//C resolve collapsed commands
				this.collapsedCommands.forEach(collapsedCommand => {
					collapsedCommand.resolve(new Success({
						origin: 'resolvePlus()',
						reason: 'command was collapsed',
					}));
				});
				//C resolve self
				this.resolve(success);
			};
			this.fullReject = function (error) {
				//C//! RESOLVE collapsed commands
				this.collapsedCommands.forEach(a => {
					a.resolve(new Success({
						origin: 'resolvePlus()',
						reason: 'command was collapsed',
					}));
				});
				//C reject self
				this.reject(error);
			};

			this.resolve = function () {
				throw new Err({
					origin: 'sj.Command.resolve()',
					reason: 'command.resolve called but it has not been given a resolve function',
				});
			};
			this.resolve = function () {
				throw new Err({
					origin: 'sj.Command.reject()',
					reason: 'command.reject called but it has not been given a reject function',
				});
			};
		},
	}),
	prototypeProperties: parent => ({
		collapseCondition(otherCommand) {
			//C collapse if identical
			return this.identicalCondition(otherCommand);
		},
		annihilateCondition: otherCommand => false,
		async trigger(context) {
			//C load the player if not loaded
			if (context.state[this.source.name].player === null) await context.dispatch(`${this.source.name}/loadPlayer`);
		},
	}),
});
const Start = Base.makeClass('Start', Command, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			//G must be given a track
			if (!isInstanceOf(accessory.options.track, Track, 'Track')) throw new Err({
				origin: 'sj.Start.beforeInitialize()',
				reason: 'sj.Start instance.track must be an Track',
				content: accessory.options.track,
			});
		},
		defaults: {
			track: undefined,
			isPlaying: true,
			progress: 0,
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherCommand) {
			return parent.prototype.identicalCondition.call(this, otherCommand) 
			&& isInstanceOf(otherCommand.track, Track, 'Track') //C catch non-Tracks
			&& otherCommand.track.sourceId === this.track.sourceId //! compare tracks by their sourceId not by their reference
			&& otherCommand.isPlaying === this.isPlaying
			&& otherCommand.progress === this.progress;
		},
		async trigger(context) {
			await parent.prototype.trigger.call(this, context);

			//C pause all
			await asyncMap(this.sourceInstances, async source => {
				if (context.state[source.name].player !== null) await context.dispatch(`${source.name}/pause`);
			}).catch(MultipleErrors.throw);

			//C change startingTrackSubscription to subscription of the new track
			context.commit('setStartingTrackSubscription', await context.dispatch('resubscribe', {
				subscription: context.state.startingTrackSubscription,

				Entity: Track,
				query: {id: this.track.id},
				options: {}, //TODO //?
			}, {root: true})); //L https://vuex.vuejs.org/guide/modules.html#accessing-global-assets-in-namespaced-modules

			//C start target
			await context.dispatch(`${this.source.name}/start`, this.track);

			//C transfer subscription from starting to current
			context.commit('setCurrentTrackSubscription', context.state.startingTrackSubscription);
			context.commit('setStartingTrackSubscription', null);

			//C change source
			context.commit('setSource', this.source);
		},
	}),
});
const Toggle = Base.makeClass('Toggle', Command, {
	//? pause command might not have a desired progress?
	//TODO toggle resume seems to be broken, maybe because of CORS?
	// "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://api.spotify.com/v1/melody/v1/logging/track_stream_verification. (Reason: CORS request did not succeed).""
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//G isPlaying must be manually set to true or false
			if (options.isPlaying !== true && options.isPlaying !== false) throw new Err({
				origin: 'sj.Toggle',
				reason: `Toggle isPlaying must be true or false: ${options.isPlaying}`,
				content: options.isPlaying,
			});
		},
		defaults: {
			isPlaying: undefined,
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherCommand) {
			return parent.prototype.identicalCondition.call(this, otherCommand)
			&& otherCommand.isPlaying === this.isPlaying;
		},
		//! sj.Toggle doesn't have a unique collapseCondition because the otherCommand is either identical (and collapses by default) or is opposite and annihilates
		annihilateCondition(otherCommand) {
			return parent.prototype.annihilateCondition.call(this, otherCommand)
			|| ( 
				//C same source, inverse isPlaying, both are sj.Toggle (ie. don't annihilate pauses with starts)
				parent.prototype.identicalCondition.call(this, otherCommand)
				&& otherCommand.isPlaying === !this.isPlaying
				&& otherCommand.constructor === this.constructor
			);
		},
		async trigger(context) {
			await parent.prototype.trigger.call(this, context);

			await asyncMap(this.sourceInstances, async source => {
				if (this.isPlaying && source === this.source) {
					//C resume target if resuming
					await context.dispatch(`${source.name}/resume`);
				} else {
					//C pause all or rest
					if (context.state[source.name].player !== null) await context.dispatch(`${source.name}/pause`);
				}
			}).catch(MultipleErrors.throw);
		},
	}),
});
const Seek = Base.makeClass('Seek', Command, {
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//G progress must be manually set between 0 and 1\
			if (options.progress < 0 || 1 < options.progress) throw new Err({
				origin: 'sj.Seek.trigger()',
				reason: `seek progress is not a number between 0 and 1: ${options.progress}`,
				content: options.progress,
			});
		},
		defaults: {
			progress: undefined,
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherCommand) {
			return parent.prototype.identicalCondition.call(this, otherCommand)
			&& otherCommand.progress === this.progress;
		},
		async trigger(context) {			
			await parent.prototype.trigger.call(this, context);

			await context.dispatch(`${this.source.name}/seek`, this.progress);
		},
	}),
});
const Volume = Base.makeClass('Volume', Command, {
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//G volume must be manually set between 0 and 1
			if (options.volume < 0 || 1 < options.volume) throw new Err({
				origin: 'sj.Volume.trigger()',
				reason: `volume is not a number between 0 and 1: ${options.volume}`,
				content: options.volume,
			});
		},
		defaults: {
			volume: undefined,
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherCommand) {
			return parent.prototype.identicalCondition.call(this, otherCommand)
			&& otherCommand.volume === this.volume;
		},
		async trigger(context) {
			await parent.prototype.trigger.call(this, context);

			// adjust volume on all sources
			await asyncMap(this.sourceInstances, async source => {
				if (context.state[source.name].player !== null) await context.dispatch(`${source.name}/volume`, this.volume);
			}).catch(MultipleErrors.throw);
		},
	}),
});

// COMMAND EXTERNALS
// These methods have references to constructors that are not available at declaration:
// Command
Command.prototype.identicalCondition = function (otherCommand) {
	// otherCommand must be an sj.Command, and have the same playback-state properties
	return isInstanceOf(otherCommand, Command, 'Command') && otherCommand.source === this.source;
};
// Start, Resume, Pause, Seek
Start.prototype.collapseCondition = function (otherCommand) {
	// collapses parent condition, any sj.Starts, sj.Resumes, sj.Pauses, or sj.Seeks
	return parent.prototype.collapseCondition.call(this, otherCommand)
	|| otherCommand.constructor === Start
	|| otherCommand.constructor === Resume 
	|| otherCommand.constructor === Pause 
	|| otherCommand.constructor === Seek;
};
// Seek
Seek.prototype.collapseCondition = function (otherCommand) {
	return parent.prototype.collapseCondition.call(this, otherCommand)
	|| otherCommand.constructor === Seek;
};
// Volume
Volume.prototype.collapseCondition = function (otherCommand) {
	return parent.prototype.collapseCondition.call(this, otherCommand)
	|| otherCommand.constructor === Volume;
};

export {
	Command,
	Start,
	Toggle,
	Seek,
	Volume,
};
