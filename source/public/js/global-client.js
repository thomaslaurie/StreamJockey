// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
*/


//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/*
	Workout api keys & info storage between server & client, its kind of a mixed back right now between youtube and spotify

	Is there a significant discrepancy between potential synchronous/local sources (listeners) and asynchronous api calls for progress checks? Which information sources are synchronous/local? Should their information override the api information?
		Implement some way to see how accurate the timestamps of sources are? by tracking the local timestamp, returned timestamp, and then another local timestamp to gain knowledge of an error margin? then using that to translate timestamps to local time?
*/


//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// BUILT-IN

// EXTERNAL
import moment from 'moment';
import he from 'he';

// INTERNAL
import { 
	clamp, 
	capitalizeFirstCharacter,
	escapeRegExp,
	pick,
	asyncMap,
	wait,
	Deferred,
	one,
	any,
	repeat,
	rules,
	appendQueryParameters,
} from '../../shared/utility/index.js';
import {
	safeStringify,
} from '../../shared/derived-utility/index.js';
import {
	runHTMLScript,
} from './browser-utility/index.js';
import sj from './global.js';
import request from '../../shared/request.js';
import serverRequest from './server-request.js';
import Base from '../../shared/base.js';



//import './vendor/spotify-player.js'; //! creates window.onSpotifyWebPlaybackSDKReady and window.Spotify, this is supposed to be imported dynamically from https://sdk.scdn.co/spotify-player.js, it may change without notice, wont work here because onSpotifyWebPlaybackSDKReady is undefined
//import SpotifyWebApi from './vendor/spotify-web-api.js'; //L api endpoint wrapper: https://github.com/jmperez/spotify-web-api-js


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

//C attach external libraries to sj so that they can be used where ever sj is imported
sj.moment = moment;
sj.he = he;
sj.appName = 'StreamJockey';


//   ██████╗██╗      █████╗ ███████╗███████╗
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
//  ██║     ██║     ███████║███████╗███████╗
//  ██║     ██║     ██╔══██║╚════██║╚════██║
//  ╚██████╗███████╗██║  ██║███████║███████║
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝

// ENTITY CRUD METHODS
sj.Entity.augmentClass({
	prototypeProperties: parent => ({
		async add() {
			return await this.constructor.add(this);
		},
		async get() {
			return await this.constructor.get(this);
		},
		async edit() { //! instance.edit() doesn't take any arguments, and therefore isn't very useful unless the instance itself is edited
			return await this.constructor.edit(this);
		},
		async remove() {
			return await this.constructor.remove(this);
		},
	}),
	staticProperties: parent => ({
		async add(query) {
			return await serverRequest(
				'POST',
				this.table,
				any(query).map((q) => pick(q, this.filters.addIn)),
			);
		},
		async get(query) {
			return await serverRequest(
				'GET',
				this.table,
				any(query).map((q) => pick(q, this.filters.getIn)),
			);
		},
		async edit(query) {
			return await serverRequest(
				'PATCH', 
				this.table,
				any(query).map((q) => pick(q, this.filters.editIn))
			);
		},
		async remove(query) {
			return await serverRequest(
				'DELETE', 
				this.table,
				any(query).map((q) => pick(q,  this.filters.removeIn))
			);
		},
	}),
});

// ACTION
//R commands are separate from the playback module commands because they are supposed to be instanced, queued packets of trigger functionality and frozen state

//G sj.Commands have their own playback state properties so that they can be queued and then collapsed/annihilated if redundant based on these properties
//G they trigger basic playback functions from all the sources while ensuring these playbacks don't collide (ie. play at the same time)
//G tightly integrated with VueX
//TODO consider a stop command? it would stop all sources and set the current source back to null
//TODO im not sure that the null check for sources should go in these commands, also they're inconsistent between the target source and other sources
sj.Command = Base.makeClass('Command', Base, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			//G must be given a source
			//TODO The non-instance source casting actually seems necessary here for some reason.
			if (!sj.isType(accessory.options.source, sj.Source)) {
				throw new sj.Error({
					origin: 'sj.Command.beforeInitialize()',
					message: 'no source is active to receive this command',
					reason: `sj.Command instance.source must be an sj.Source: ${accessory.options.source}`,
					content: accessory.options.source,
				});
			}
		},
		defaults: {
			source: undefined,
		},
		afterInitialize(accessory) {
			this.collapsedCommands = []; //C an array used to store any collapsed or annihilated commands so that they may be resolved when this command either resolves or is annihilated
			this.fullResolve = function (success) {
				//C resolve collapsed commands
				this.collapsedCommands.forEach(collapsedCommand => {
					collapsedCommand.resolve(new sj.Success({
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
					a.resolve(new sj.Success({
						origin: 'resolvePlus()',
						reason: 'command was collapsed',
					}));
				});
				//C reject self
				this.reject(error);
			};

			this.resolve = function () {
				throw new sj.Error({
					origin: 'sj.Command.resolve()',
					reason: 'command.resolve called but it has not been given a resolve function',
				});
			};
			this.resolve = function () {
				throw new sj.Error({
					origin: 'sj.Command.reject()',
					reason: 'command.reject called but it has not been given a reject function',
				});
			};
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherCommand) {
			//C otherCommand must be an sj.Command, and have the same playback-state properties
			return sj.isType(otherCommand, sj.Command)
			&& otherCommand.source === this.source;
		}, 
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
sj.Start = Base.makeClass('Start', sj.Command, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			//G must be given a track
			if (!sj.isType(accessory.options.track, sj.Track)) throw new sj.Error({
				origin: 'sj.Start.beforeInitialize()',
				reason: 'sj.Start instance.track must be an sj.Track',
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
			&& sj.isType(otherCommand.track, sj.Track) //C catch non-sj.Tracks
			&& otherCommand.track.sourceId === this.track.sourceId //! compare tracks by their sourceId not by their reference
			&& otherCommand.isPlaying === this.isPlaying
			&& otherCommand.progress === this.progress;
		},
		collapseCondition(otherCommand) {
			//C collapses parent condition, any sj.Starts, sj.Resumes, sj.Pauses, or sj.Seeks
			return parent.prototype.collapseCondition.call(this, otherCommand)
			|| otherCommand.constructor === sj.Start
			|| otherCommand.constructor === sj.Resume 
			|| otherCommand.constructor === sj.Pause 
			|| otherCommand.constructor === sj.Seek;
		},
		async trigger(context) {
			await parent.prototype.trigger.call(this, context);

			//C pause all
			await asyncMap(sj.Source.instances, async source => {
				if (context.state[source.name].player !== null) await context.dispatch(`${source.name}/pause`);
			});

			//C change startingTrackSubscription to subscription of the new track
			context.commit('setStartingTrackSubscription', await context.dispatch('resubscribe', {
				subscription: context.state.startingTrackSubscription,

				Entity: sj.Track,
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
sj.Toggle = Base.makeClass('Toggle', sj.Command, {
	//? pause command might not have a desired progress?
	//TODO toggle resume seems to be broken, maybe because of CORS?
	// "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://api.spotify.com/v1/melody/v1/logging/track_stream_verification. (Reason: CORS request did not succeed).""
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//G isPlaying must be manually set to true or false
			if (options.isPlaying !== true && options.isPlaying !== false) throw new sj.Error({
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

			await asyncMap(sj.Source.instances, async source => {
				if (this.isPlaying && source === this.source) {
					//C resume target if resuming
					await context.dispatch(`${source.name}/resume`);
				} else {
					//C pause all or rest
					if (context.state[source.name].player !== null) await context.dispatch(`${source.name}/pause`);
				}
			});
		},
	}),
});
sj.Seek = Base.makeClass('Seek', sj.Command, {
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//G progress must be manually set between 0 and 1\
			if (options.progress < 0 || 1 < options.progress) throw new sj.Error({
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
		collapseCondition(otherCommand) {
			return parent.prototype.collapseCondition.call(this, otherCommand)
			|| otherCommand.constructor === sj.Seek;
		},
		async trigger(context) {			
			await parent.prototype.trigger.call(this, context);

			await context.dispatch(`${this.source.name}/seek`, this.progress);
		},
	}),
});
sj.Volume = Base.makeClass('Volume', sj.Command, {
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//G volume must be manually set between 0 and 1
			if (options.volume < 0 || 1 < options.volume) throw new sj.Error({
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
		collapseCondition(otherCommand) {
			return parent.prototype.collapseCondition.call(this, otherCommand)
			|| otherCommand.constructor === sj.Volume;
		},
		async trigger(context) {
			await parent.prototype.trigger.call(this, context);

			//C adjust volume on all sources
			await asyncMap(sj.Source.instances, async source => {
				if (context.state[source.name].player !== null) await context.dispatch(`${source.name}/volume`, this.volume);
			});
		},
	}),
});

// PLAYBACK
sj.Playback = Base.makeClass('Playback', Base, {
	constructorParts(parent) { return {
		defaults: {
			// NEW
			state: undefined,
			actions: undefined,
			mutations: undefined,
			getters: undefined,
			modules: undefined,
		},
		afterInitialize() {
			//C state has to be initialized here because it needs an instanced reference to a state object (cannot pass one as the default or else all instances will refer to the same state object)
			//C because of how constructor defaults work with references, the instanced defaults have to be created in afterInitialize()


			this.state			= {...this.constructor.baseState, ...this.state};
			this.actions		= {...this.constructor.baseActions, ...this.actions};
			this.mutations		= {...this.constructor.baseMutations, ...this.mutations};
			this.baseGetters	= {...this.constructor.baseGetters, ...this.getters};
			this.baseModules	= {...this.constructor.baseModules, ...this.getters};
		},
	}; },
	staticProperties: parent => ({
		requestTimeout: 5000,

		baseState: {
			source: null,
			player: null,

			track: null,
			isPlaying: false,
			progress: 0,
			volume: 1,

			//G all state properties should be updated at the same time
			timestamp: Date.now(),


			//R between the start and resolution of a start command, there will be events on the current track and the new track. as the playback state only stores one active track, one of these tracks will be recognized as a foreign track, regardless of when the new local metadata gets set. eventually the data will line up, but it will cause flickering for interface elements while the command is processing as the local metadata will go from A to null to B. to prevent this, store the starting track to also be used in the foreign track check.
			startingTrack: null,
		},
		baseActions: {
			async start(context, track) {
				const {dispatch, getters, state} = context;
				const timeBefore = Date.now();

				/* //TODO take out polling in favor of a more reactive approach //R context.watch isn't available here
					const deferred = new Deferred().timeout(sj.Playback.requestTimeout, () => new sj.Error({
						origin: 'sj.Playback.baseActions.start()',
						reason: 'start state timed out',
					}));

					const unwatch = context.watch(
						//C pack desired state
						({state: {isPlaying, progress}}, {sourceId}) => ({sourceId, isPlaying, progress}), 
						//C evaluate state conditions
						({sourceId, isPlaying, progress}) => {
							if (
								//C track must have the right id, be playing, near the start (within the time from when the call was made to now)
								sourceId === track.sourceId &&
								isPlaying === true &&
								progress <= (Date.now() - timeBefore) / duration
							) {
								deferred.resolve();
							}
						}, 
						{deep: true, immediate: true}
					);
				*/

				//C trigger api
				await dispatch('baseStart', track);

				/* //TODO same here
					//C wait for desired state
					await deferred;
					unwatch();
				*/
				//C Wait for the desired state.
				await repeat.async(async () => {
					await wait(100);
					return {
						sourceId:  getters.sourceId,
						isPlaying: state.isPlaying,
						progress:  state.progress,
					};
				},  {
					until({sourceId, isPlaying, progress}) {
						//C track must have the right id, be playing, near the start (within the time from when the call was made to now)
						return (							
							sourceId  === track.sourceId &&
							isPlaying === true           &&
							progress  <=  (Date.now() - timeBefore) / duration
						);
					},
				});

				console.log('reached');

				return new sj.Success({
					origin: 'sj.Playback.baseActions.start()',
					reason: 'start command completed',
				});
			},

			/* //OLD
				async preserveLocalMetadata(context, track) {
					if (!sj.isType(track, sj.Track)) throw new sj.Error({
						origin: 'preserveLocalMetadata()',
						reason: 'track is not an sj.Track',
					});

					//C default local metadata as foreign track
					let local = sj.Track.filters.localMetadata.reduce((obj, key) => {
						obj[key] = null;
						return obj;
					}, {});

					//C set local as current or starting track if matching
					if (sj.isType(context.state.track, Object) && 
					track.sourceId === context.state.track.sourceId)			local = context.state.track;
					else if (sj.isType(context.state.startingTrack, Object) && 
					track.sourceId === context.state.startingTrack.sourceId)	local = context.state.startingTrack;				

					//C return new track with localMetadata properties replaced
					return new sj.Track({...track, ...sj.shake(local, sj.Track.filters.localMetadata)});
				},
			*/
		},
		baseMutations: {
			setState(state, values) {
				Object.assign(state, values);
			},
			setStartingTrack(state, track) {
				state.startingTrack = track;
			},
			removeStartingTrack(state, track) {
				state.startingTrack = null;
			},
		},
		baseGetters: {
			//C safe getters for track properties
			sourceId: (state) => state?.track?.sourceId,
			duration: (state) => state?.track?.duration,

			//C state conditions for command resolution
			isStarted:	(state, {sourceId, duration}) => (id, timeBefore) => (
				sourceId === id &&
				state.isPlaying === true &&
				state.progress <= (Date.now() - timeBefore) / duration
			),

			//TODO
			// isPaused:
			// isResumed:
			// isSeeked:
			// isVolumed:
		},
		baseModules: {
		},
	}),
});
sj.Playback.module = new sj.Playback({
	//G main playback module for app
	modules: {},

	state: {
		// CLOCK 
		//C basically a reactive Date.now(), so far just used for updating playback progress
		clock: Date.now(),
		clockIntervalId: null,

		// QUEUE
		/* //R Old Queue Thought Process
				//  //R
			// 	Problem:	Starting a spotify and youtube track rapidly would cause both to play at the same time
			// 	Symptom:	Spotify then Youtube -> checkPlayback() was setting spotify.isPlaying to false immediately after spotify.start() resolved
			// 				Youtube then Spotify -> youtube.pause() would not stick when called immediately after youtube.start() resolved
			// 	Cause:		It was discovered through immediate checkPlayback() calls that the api playback calls don't resolve when the desired playback is achieved but only when the call is successfully received
			// 	Solution:	Playback functions need a different way of verifying their success if they are going to work how I originally imagined they did. Try verifying playback by waiting for event listeners?
			// 				Putting a short delay between sj.Playback.queue calls gives enough time for the apis to sort themselves out.

			TODO checkPlaybackState every command just like before, find a better way
				// TODO in queue system, when to checkPlaybackState? only when conflicts arise?
				// (maybe also: if the user requests the same thing thats happening, insert a check to verify that the playback information is correct incase the user has more recent information), 

			Command Failure Handling 
				// 	!!! old, meant for individual command types

				// send command, change pendingCommand to true, wait
				// 	if success: change pendingCommand to false
				// 		if queuedCommand exists: change command to queuedCommand, clear queued command, repeat...
				// 		else: nothing
				// 	if failure: 
				// 		if queuedCommand exists: change pendingCommand to false, change command to queuedCommand, clear queued command, repeat... // pendingCommands aren't desired if queuedCommands exist, and therefore are only waiting for resolve to be overwritten (to avoid sending duplicate requests)
				// 		else: trigger auto-retry process
				// 			if success: repeat...
				// 			if failure: change pendingCommand to false, trigger manual-retry process which basically sends a completely new request...
		*/
		commandQueue: [],
		sentCommand: null,

		// PLAYBACK STATE
		//C source is used to select the proper playback state for actualPlayback
		source: null,

		// LOCAL TRACKS
		currentTrackSubscription: null,
		startingTrackSubscription: null,
	},
	actions: {
		// CLOCK
		async startClock(context) {
			await context.dispatch('stopClock');
			const id = setInterval(() => context.commit('updateClock'), 100); //C clock refresh rate
			context.commit('setClockIntervalId', id);
		},
		async stopClock(context) {
			clearInterval(context.state.clockIntervalId);
			context.commit('setClockIntervalId', null);
		},

		// QUEUE
		//TODO there seems to be a bug in the command queue where eventually an command will stall until (either it or something ahead of it, im not sure which) times out, upon which the command in question will be fulfilled
		async pushCommand(context, command) {
			//C Attempts to push a new command the current command queue. Will collapse and/or annihilate commands ahead of it in the queue if conditions are met. Command will not be pushed if it annihilates or if it is identical to the sent command or if there is no sent command and it is identical to the current playback state.

			let push = true;

			//C remove redundant commands if necessary
			const compact = function (i) {
				if (i >= 0) {
					//R collapse is required to use the new command rather than just using the existing command because sj.Start collapses different commands than itself
					if (command.collapseCondition(context.state.commandQueue[i])) {
						//C if last otherCommand collapses, this command gets pushed
						push = true;
						//C store otherCommand on this command
						command.collapsedCommands.unshift(context.state.commandQueue[i]);
						//C remove otherCommand
						context.commit('removeQueuedCommand', i);
						//C analyze next otherCommand
						compact(i-1);
					} else if (command.annihilateCondition(context.state.commandQueue[i])) {
						//C if last otherCommand annihilates, this command doesn't get pushed
						push = false;
						command.collapsedCommands.unshift(context.state.commandQueue[i]);
						context.commit('removeQueuedCommand', i);
						compact(i-1);
					} else {
						//C if otherCommand does not collapse or annihilate, escape
						return;
					}
				}
			};
			compact(context.state.commandQueue.length-1);

			if (( //C if there is a sent command and identical to the sent command,
				context.state.sentCommand !== null && 
				command.identicalCondition(context.state.sentCommand)
			) || ( //C or if there isn't a sent command and identical to the actual playback
				context.state.sentCommand === null && 
				command.identicalCondition(context.getters.actualPlayback)
			)) push === false; //C don't push
			
			//C route command resolve/reject to this result promise
			const resultPromise = new Promise((resolve, reject) => {
				command.resolve = resolve;
				command.reject = reject;
			});

			//C push command to the queue or resolve it (because it has been collapsed)
			if (push) context.commit('pushQueuedCommand', command);
			else command.fullResolve(new sj.Success({
				origin: 'pushCommand()',
				reason: 'command was annihilated',
			}));
			
			//C send next command  //! do not await because the next command might not be this command, this just ensures that the nextCommand cycle is running every time a new command is pushed
			context.dispatch('nextCommand');

			//C await for the command to resolve
			return await resultPromise;
		},
		async nextCommand(context) {
			//C don't do anything if another command is still processing or if no queued commands exist
			if (context.state.sentCommand !== null || context.state.commandQueue.length <= 0) return;

			//C move the command from the queue to sent
			context.commit('setSentCommand', context.state.commandQueue[0]);
			context.commit('removeQueuedCommand', 0);

			//C trigger and resolve the command
			await context.state.sentCommand.trigger(context).then(
				resolved => context.state.sentCommand.fullResolve(resolved),
				rejected => context.state.sentCommand.fullReject(rejected),
			);

			//C mark the sent command as finished
			context.commit('removeSentCommand');
			//C send next command //! do not await, this just restarts the nextCommand cycle
			context.dispatch('nextCommand');
		},

		// PLAYBACK FUNCTIONS
		//G the main playback module's commands, in addition to mappings for basic playback functions, should store all the higher-level, behavioral playback functions (like toggle)
		// BASIC
		async start({dispatch}, track) {
			return await dispatch('pushCommand', new sj.Start({
				source: track.source, //! uses track's source
				track,
			}));
		},
		async pause({dispatch, getters: {desiredSource: source}}) {
			return await dispatch('pushCommand', new sj.Toggle({
				source, //! other non-start basic playback functions just use the current desiredPlayback source
				isPlaying: false,
			}));
		},
		async resume({dispatch, getters: {desiredSource: source}}) {
			return await dispatch('pushCommand', new sj.Toggle({
				source,
				isPlaying: true,
			}));
		},
		async seek({dispatch, getters: {desiredSource: source}}, progress) {
			return await dispatch('pushCommand', new sj.Seek({
				source,
				progress,
			}));
		},
		async volume({dispatch, getters: {desiredSource: source}}, volume) {
			//TODO volume should change volume on all sources
			return await dispatch('pushCommand', new sj.Volume({
				source,
				volume,
			}));
		},
		// HIGHER LEVEL
		async toggle({dispatch, getters: {desiredSource: source, desiredIsPlaying: isPlaying}}) {
			return await dispatch('pushCommand', new sj.Toggle({
				source,
				isPlaying: !isPlaying,
			}));
		},
	},
	mutations: {
		// CLOCK
		updateClock(state) {
			state.clock = Date.now();
		},
		setClockIntervalId(state, id) {
			state.clockIntervalId = id;
		},

		// QUEUE
		pushQueuedCommand(state, command) {
			state.commandQueue.push(command);
		},
		removeQueuedCommand(state, index) {
			state.commandQueue.splice(index, 1);
		},
		setSentCommand(state, command) {
			state.sentCommand = command;
		},
		removeSentCommand(state) {
			state.sentCommand = null;
		},

		// PLAYBACK STATE
		setSource(state, source) {
			state.source = source;
		},

		// LOCAL TRACKS
		setCurrentTrackSubscription(state, subscription) {
			state.currentTrackSubscription = subscription;
		},
		setStartingTrackSubscription(state, subscription) {
			state.startingTrackSubscription = subscription;
		},
	},
	getters: {
		/*
			// PLAYBACK STATE
			actualPlayback(state, getters) {
				//C return null playback state if no source
				if (state.source === null) return {...sj.Playback.baseState};

				//C get the source state
				const sourceState = state[state.source.name];

				//C use inferredProgress or regular progress depending on isPlaying
				//G//! anytime isPlaying is changed, the progress and timestamp (and probably track & volume) must be updated
				if (sourceState.isPlaying) return {...sourceState, progress: getters.inferredProgress};
				else return sourceState;
			},		
			inferredProgress(state) {
				if (state.source === null) return -1;
				//C this is detached from actualPlayback() so that it's extra logic isn't repeated x-times per second every time inferredProgress updates
				const sourceState = state[state.source.name];
				const elapsedTime = state.clock - sourceState.timestamp;
				const elapsedProgress = elapsedTime / sourceState.track.duration;
				return clamp(sourceState.progress + elapsedProgress, 0, 1);
			},
			desiredPlayback({sentCommand, commandQueue}, {actualPlayback}) {
				//! this will update x-times per second when playing as the track progress is constantly updating
				return Object.assign({}, actualPlayback, sentCommand, ...commandQueue);
			},
		*/

		// ACTUAL
		sourceOrBase:		(state, getters) => key => {
			if (state.source === null) return sj.Playback.baseState[key];
			else return state[state.source.name][key];
		},
		
		actualSource:		(state, getters) => {
			return state.source;
		},
		actualTrack:		(state, getters, rootState, rootGetters) => {
			const sourceOrBaseTrack = getters.sourceOrBase('track');
			if (sj.isType(sourceOrBaseTrack, sj.Track)) {
				//C if the source track matches the current or starting track (by sourceId), return the current or starting track instead, so that it may be reactive to any data changes
				if (sj.isType(getters.currentTrack, sj.Track) && getters.currentTrack.sourceId === sourceOrBaseTrack.sourceId) return getters.currentTrack;
				if (sj.isType(getters.startingTrack, sj.Track) && getters.startingTrack.sourceId === sourceOrBaseTrack.sourceId) return getters.startingTrack;
			}
			
			return sourceOrBaseTrack;
		},
		actualIsPlaying:	(state, getters) => getters.sourceOrBase('isPlaying'),
		actualProgress:		(state, getters) => {
			let progress = getters.sourceOrBase('progress');

			if (
				sj.isType(state.source, Object) && 
				sj.isType(state[state.source.name], Object) &&
				sj.isType(state[state.source.name].track, Object) && 
				state[state.source.name].isPlaying
			) {
				//C if playing, return inferred progress
				const elapsedTime = state.clock - state[state.source.name].timestamp;
				const elapsedProgress = elapsedTime / state[state.source.name].track.duration;
				progress = clamp(state[state.source.name].progress + elapsedProgress, 0, 1);
			}

			return progress;
		},
		actualVolume:		(state, getters) => getters.sourceOrBase('volume'),

		actualPlayback:		(state, getters) => ({
			//! this will update as fast as progress does
			source:		getters.actualSource,
			track:		getters.actualTrack,
			isPlaying:	getters.actualIsPlaying,
			progress:	getters.actualProgress,
			volume:		getters.actualVolume,
		}),


		// DESIRED
		flattenPlayback: (state, getters) => key => {
			//C value starts as the actualValue
			let value = getters[`actual${capitalizeFirstCharacter(key)}`];
			//C then if defined, sentCommand
			if (sj.isType(state.sentCommand, Object) && state.sentCommand[key] !== undefined) value = state.sentCommand[key];
			//C then if defined, each queuedCommand
			for (const queuedCommand of state.commandQueue) {
				if (queuedCommand[key] !== undefined) value = queuedCommand[key];
			}

			return value;
		},

		desiredSource: 		(state, getters) => getters.flattenPlayback('source'),
		desiredTrack:		(state, getters) => getters.flattenPlayback('track'),
		desiredIsPlaying:	(state, getters) => getters.flattenPlayback('isPlaying'),
		desiredProgress:	(state, getters) => getters.flattenPlayback('progress'),
		desiredVolume:		(state, getters) => getters.flattenPlayback('volume'),
		
		desiredPlayback: (state, getters) => ({
			source:		getters.actualSource,
			track:		getters.desiredTrack,
			isPlaying:	getters.desiredIsPlaying,
			progress:	getters.desiredProgress,
			volume:		getters.desiredVolume,
		}),


		// LOCAL TRACKS
		currentTrack:		(state, getters, rootState, rootGetters) => {
			if (sj.isType(state.currentTrackSubscription, sj.Subscription)) return one(rootGetters.getLiveData(state.currentTrackSubscription));
			else return null;
		},
		startingTrack:		(state, getters, rootState, rootGetters) => {
			if (sj.isType(state.startingTrackSubscription, sj.Subscription)) return one(rootGetters.getLiveData(state.startingTrackSubscription));
			else return null;
		},
	},
});

// SOURCE
sj.Source.augmentClass({
	constructorParts(parent) {
		const oldAfterInitialize = sj.Source.afterInitialize;

		return {
			defaults: {
				//TODO change these off undefined
				auth: undefined,
				request: undefined,
				getAccessToken: undefined,

				search: undefined,
	
				player: undefined,
				loadPlayer: undefined,
				playback: undefined,
			},
			afterInitialize() {
				oldAfterInitialize.call(this);

				//TODO Temporary workaround because isType() doesn't handle required arguments properly.
				const state = this?.playback?.state;
				if (state != null) state.source = this;
	
				//C push own playback module to main playback modules
				sj.Playback.module.modules[this.name] = {
					...this.playback,
					namespaced: true,
				};
			},
		};
	},
});


//  ███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
//  ██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
//  ███████╗█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║
//  ╚════██║██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║
//  ███████║███████╗███████║███████║██║╚██████╔╝██║ ╚████║
//  ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝

sj.session.login = async function (user) {
	return await serverRequest('POST', 'session', new sj.User(user));
	//TODO reconnect socket subscriptions to update subscriber info
};
sj.session.get = async function () {
    return await serverRequest('GET', 'session');
};
sj.session.logout = async function () {
	return await serverRequest('DELETE', 'session');
	//TODO reconnect socket subscriptions to update subscriber info
};


//  ███████╗ ██████╗ ██╗   ██╗██████╗  ██████╗███████╗
//  ██╔════╝██╔═══██╗██║   ██║██╔══██╗██╔════╝██╔════╝
//  ███████╗██║   ██║██║   ██║██████╔╝██║     █████╗  
//  ╚════██║██║   ██║██║   ██║██╔══██╗██║     ██╔══╝  
//  ███████║╚██████╔╝╚██████╔╝██║  ██║╚██████╗███████╗
//  ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚══════╝

/* TODO
	Workout api keys & info storage between server & client, its kind of a mixed back right now between youtube and spotify

	Is there a significant discrepancy between potential synchronous/local sources (listeners) and asynchronous api calls for progress checks? Which information sources are synchronous/local? Should their information override the api information?
		Implement some way to see how accurate the timestamps of sources are? by tracking the local timestamp, returned timestamp, and then another local timestamp to gain knowledge of an error margin? then using that to translate timestamps to local time?

	still some issues with playback, try rapid clicking seek, etc.
*/

// global source objects
sj.spotify = new sj.Source({
	//TODO make apiReady and playerReady checks
	name: 'spotify',
	register: true,
	
	
	//? where is this being called?
	async auth() {
		//C prompts the user to accept permissions in a new window, then receives an auth code from spotify
		/* //R
			this was split in to multiple parts on the client side to have an automatically closing window
			//L https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
			//! cannot load this url in an iframe as spotify has set X-Frame-Options to deny, loading this in a new window is probably the best idea to not interrupt the app
	
		*/
		//TODO transfer-playback permission is required, or else if spotify is connected to another device, playback requests will return 403 Restriction Violated.
	
		//C request url
		const requestCredentials = await serverRequest('GET', 'spotify/authRequestStart');
	
		//C open spotify auth request window
		//L https://www.w3schools.com/jsref/met_win_open.asp
		const authWindow = window.open(requestCredentials.authRequestURL);
	
		//C listen for response from spotify
		//TODO there is a chance to miss the event if the window is resolved before the fetch request reaches the server
		const authCredentials = await serverRequest('POST', 'spotify/authRequestEnd', requestCredentials);
	
		//C automatically close window when data is received
		authWindow.close();
	
		//C exchange auth code for tokens
		const tokens = await serverRequest('POST', 'spotify/exchangeToken', authCredentials);
		this.credentials.accessToken = tokens.accessToken;
		this.credentials.expires = tokens.accessToken;
		this.credentials.scopes = tokens.scopes; //TODO scopes wont be refreshed between sessions
	
		return new sj.Success({
			origin: 'sj.spotify.auth()',
			message: 'authorized spotify',
		});
		
		//TODO there needs to be a scopes (permissions) check in here somewhere
	
		/* //OLD
			//C request authURL & authKey
			return fetch(`${sj.API_URL}/spotify/startAuthRequest`).then(resolved => {
				//C open spotify auth request window
				//L https://www.w3schools.com/jsref/met_win_open.asp
				authRequestWindow = window.open(resolved.authRequestURL);
				return resolved;
			}).then(resolved => {
				//TODO there is a chance to miss the event if the window is resolved before the fetch request reaches the server
				return fetch(`${sj.API_URL}/spotify/endAuthRequest`,  {
					method: 'post',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(resolved),
				});
			}).then(resolved => {
				return resolved.json();
			}).then(resolved => {
				authRequestWindow.close();
				return resolved;
			}).catch(rejected => {
				throw sj.propagate(rejected);
			});
		*/
	},
	async request(method, path, content) {
		// request() wrapper specifically fro spotify-web-api requests.
		// Automatically gets the accessToken and applies the correct header and URL prefix.

		// URL
		const prefix = 'https://api.spotify.com/v1';
		const url = `${prefix}/${path}`;

		// OPTIONS
		const options = {};

		// BODY
		if (method === 'GET') {
			options.queryParameters = content;
		} else {
			options.JSONBody = content;
		}

		// HEADER
		const token = await this.getAccessToken();
		options.headers = {
			...sj.JSON_HEADER,
			Authorization: `Bearer ${token}`,
		};

		return await request(method, url, options);
	},
	//? this is specific to spotify, maybe move this once optional options are implemented into classes
	async getAccessToken() {
		//C gets the api access token, handles all refreshing, initializing, errors, etc.
		//C doing this here is useful because it removes the need to check on init, and only prompts when it is needed
	
		//TODO must respond to denials by spotify too
	
		//C refresh
		let that = this;
		let refresh = async function (that) {
			let result = await serverRequest('GET', `spotify/refreshToken`).catch(sj.andResolve);
			if (sj.isType(result, sj.AuthRequired)) {
				//C call auth() if server doesn't have a refresh token
				await that.auth();
			} else if (sj.isType(result, sj.Error)) {
				throw sj.propagate(result);
			} else {
				//C assign sj.spotify.credentials
				that.credentials.accessToken = result.accessToken;
				that.credentials.expires = result.accessToken;
			}	
		};
	
		//C if client doesn't have token or if it has expired, refresh it immediately
		//TODO reconsider this string test
		if (!rules.visibleString.test(this.credentials.accessToken) || this.credentials.expires <= Date.now()) {
			await refresh(that);
		}
		//C if token is soon to expire, refresh in the background, return the existing token
		if (this.credentials.expires <= Date.now() + this.refreshBuffer) {
			refresh(that);
		}
	
		return this.credentials.accessToken;
	},

	async search({
		term = '',
		startIndex = 0,
		amount = 1,
	}) {
		// VALIDATE
		sj.Rule2.nonEmptyString.validate(term);
		sj.Rule2.nonNegativeInteger.validate(startIndex);
		sj.Rule2.positiveInteger.validate(amount);
	
		const result = await sj.spotify.request('GET', 'search', {
			q: term,
			type: 'track',
			market: 'from_token',
			limit: amount,
			offset: startIndex,
			// include_external: 'audio',
	
			/* //G
				type: 
					'A comma-separated list of item types to search across. Valid types are: album , artist, playlist, and track.'
				market:
					'An ISO 3166-1 alpha-2 country code or the string from_token. If a country code is specified, only artists, albums, and tracks with content that is playable in that market is returned. Note: Playlist results are not affected by the market parameter. If market is set to from_token, and a valid access token is specified in the request header, only content playable in the country associated with the user account, is returned. Users can view the country that is associated with their account in the account settings. A user must grant access to the user-read-private scope prior to when the access token is issued.'
				limit:
					'Maximum number of results to return. Default: 20, Minimum: 1, Maximum: 50, //! Note: The limit is applied within each type, not on the total response. For example, if the limit value is 3 and the type is artist,album, the response contains 3 artists and 3 albums.'
				offset:
					'The index of the first result to return. Default: 0 (the first result). Maximum offset (including limit): 10,000. Use with limit to get the next page of search results.'
				include_external:
					'Possible values: audio. If include_external=audio is specified the response will include any relevant audio content that is hosted externally. By default external content is filtered out from responses.'
			*/
		});
	
		return result.tracks.items.map(track => {
			return new sj.Track({
				source: sj.spotify,
				sourceId: track.id,
				name: track.name,
				duration: track.duration_ms,
				link: track.external_urls.spotify,
				artists: track.artists.map(artist => artist.name),
			});
		});
	},

	playback: new sj.Playback({
		//G source-specific playback should be the basic playback functions that connects this app to the source's api
		actions: {
			async loadPlayer(context) {
				return await new Promise((resolve, reject) => {
					//C this is a callback that the SpotifyWebPlaybackSDK module calls when it is ready
					window.onSpotifyWebPlaybackSDKReady = function () {
						const player = new window.Spotify.Player({ 
							//C "The name of the Spotify Connect player. It will be visible in other Spotify apps."
							name: sj.appName,
							getOAuthToken: async callback => {
								let token = await sj.spotify.getAccessToken();
								callback(token);
							},
							//volume: 1, //TODO initialize with a custom volume (default is 1)
						});
						player.formatState = function (state) {
							//TODO state could be anything from the callback, better validate it somehow
							if (!sj.isType(state, Object)) return {};
							const t = state.track_window.current_track; 
							return {
								track: new sj.Track({
									source: sj.spotify,
									sourceId: t.id,
									name: t.name,
									duration: t.duration_ms,
									artists: t.artists.map(artist => artist.name),
									//TODO link: t.uri,
								}),
								isPlaying: !state.paused,
								progress: state.position / t.duration_ms,
			
								timestamp: state.timestamp, //! this isn't in the documentation, but the property exists
							};
						},
						player.awaitState = async function ({
							command = () => {}, 
							stateCondition = () => false, 
							success = {}, 
							error = {}, 
							timeoutError = {}
						}) {
							return new Promise(async (resolve, reject) => {
								let resolved = false; //C resolved boolean is used to prevent later announcements of response objects

								const callback = async state => {
									if (!resolved && stateCondition(player.formatState(state))) {
										//C remove listener
										this.removeListener('player_state_changed', callback);
										//C update playback state
										await context.dispatch('updatePlayback', state);
										//C resolve
										resolve(new sj.Success(success));
										//C prevent other exit points from executing their code
										resolved = true;
									}
								};

								//C add the listener before the request is made, so that the event cannot be missed 
								//! this may allow unprompted events (from spotify, not from this app because no requests should overlap because of the queue system) to resolve the request if they meet the conditions, but I can't think of any reason why this would happen and any situation where if this happened it would cause issues
								this.addListener('player_state_changed', callback);
			
								//C if command failed, reject
								//! don't do anything when main() resolves, it only indicates that the command has been received
								await command().catch(rejected => {
									if (!resolved) {
										this.removeListener('player_state_changed', callback);
										reject(new sj.Error({...error, content: rejected}));
										resolved = true;
									}
								});

								//C if playback is already in the proper state, resolve but don't update
								//! this check is required because in this case spotify wont trigger a 'player_state_changed' event
								await context.dispatch('checkPlayback');
								if (!resolved && stateCondition(context.state)) {
									this.removeListener('player_state_changed', callback);
									resolve(new sj.Success(success));
									resolved = true;
								}
								
								//C if timed out, reject
								await wait(sj.Playback.requestTimeout);
								if (!resolved) {
									this.removeListener('player_state_changed', callback);
									reject(new sj.Timeout(timeoutError));
									resolved = true;
								}
							});
						},

						//C events
						//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#events
						player.on('ready', async ({device_id}) => {
							//C 'Emitted when the Web Playback SDK has successfully connected and is ready to stream content in the browser from Spotify.'
							//L returns a WebPlaybackPlayer object with just a device_id property: https://developer.spotify.com/documentation/web-playback-sdk/reference/#object-web-playback-player

							//C fix for chrome //L iframe policy: https://github.com/spotify/web-playback-sdk/issues/75#issuecomment-487325589
							const iframe = document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]');
							if (iframe) {
								iframe.style.display = 'block';
								iframe.style.position = 'absolute';
								iframe.style.top = '-1000px';
								iframe.style.left = '-1000px';
							}

							//C set the player as ready 
							//! this must go before playback is transferred. because after, events start firing that checkPlayback() and use the player
							context.commit('setState', {player});

							//C transfer playback //L https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-transfer-a-users-playback
							await sj.spotify.request('PUT', 'me/player', {
								device_ids: [device_id],
								play: false, // keeps current playback state
							}).catch(rejected => {
								reject(new sj.Error({
									//code: JSON.parse(error.response).error.status,
									origin: 'spotify.loadPlayer()',
									message: 'spotify player could not be loaded',
									//reason: JSON.parse(error.response).error.message,
									content: rejected,
								}));
							});

							//C wait for device to transfer
							//TODO this scaling call of recursiveAsyncTime is used twice sofar, would it be good to create a method for this?
							
							//C starting delay
							let delay = 100;
							await repeat.async(async () => {
								//C because no notification is sent when the device is actually transferred, a get request must be sent to see if the device has been transferred. Because different environments may have different wait times, a static delay could just be too early. So, send a series of get requests (with an increasing delay each time, so that it doesn't create too many requests for long waits).
								//L https://developer.spotify.com/documentation/web-api/reference/player/get-information-about-the-users-current-playback/
								//C timeout is doubled here to work better with the doubling delay time.
								//C using an object wrapper for the delay argument so that it can be modified between iterations
								await wait(delay);
								delay = delay*2; //C double the delay each time
								return await sj.spotify.request('Get', 'me/player').catch(rejected => {
									reject(new sj.Error({
										//code: JSON.parse(error.response).error.status,
										origin: 'spotify.loadPlayer()',
										message: 'spotify player could not be loaded',
										//reason: JSON.parse(error.response).error.message,
										content: rejected,
									}));

									return {device: {id: device_id}}; //C break the loop after rejecting
								});
							}, {
								until(result) {
									//L 'When no available devices are found, the request will return a 200 OK response but with no data populated.'
									//C this is fine, it just means that it's not ready, so just catch anything.
									return (
										sj.isType(result, Object) 		 &&
										sj.isType(result.device, Object) &&
										result.device.id === device_id
									);
								},
								timeout: sj.Playback.requestTimeout * 2,
							});

							//C check playback state //? this was commented out earlier and after pause, was this causing issues?
							await context.dispatch('checkPlayback');

							//C ensure that playback is not playing
							await context.dispatch('pause');

							resolve(new sj.Success({
								origin: 'spotify.loadPlayer()',
								message: 'spotify player loaded',
								content: player,
							}));
						});
						player.on('not_ready', ({device_id}) => {
							//? don't know what to do here
							console.error('not_ready', 'device_id:', device_id);
						});
			
						//C errors
						//TODO make better handlers
						//L returns an object with just a message property: https://developer.spotify.com/documentation/web-playback-sdk/reference/#object-web-playback-error
						player.on('initialization_error', ({message}) => {
							//C	'Emitted when the Spotify.Player fails to instantiate a player capable of playing content in the current environment. Most likely due to the browser not supporting EME protection.'
							reject(new sj.Error({
								log: true,
								origin: 'spotify.loadPlayer()',
								message: 'spotify player encountered an initialization error',
								reason: message,
							}));
						});
						player.on('authentication_error', ({message}) => {
							//C 'Emitted when the Spotify.Player fails to instantiate a valid Spotify connection from the access token provided to getOAuthToken.'
							reject(new sj.Error({
								log: true,
								origin: 'spotify.loadPlayer()',
								message: 'spotify player encountered an authentication error',
								reason: message,
							}));
						});
						player.on('account_error', ({message}) => {
							//C 'Emitted when the user authenticated does not have a valid Spotify Premium subscription.'
							reject(new sj.Error({
								log: true,
								origin: 'spotify.loadPlayer()',
								message: 'this account does not have a valid Spotify Premium subscription',
								reason: message,
							}));
						});
			
						//C ongoing listeners
						player.on('player_state_changed', state => {
							//C emits a WebPlaybackState object when the state of the local playback has changed. It may be also executed in random intervals.
							//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#object-web-playback-state
							context.dispatch('updatePlayback', state);
						});
						player.on('playback_error', ({message}) => {
							//TODO this should be a listener, and not resolve or reject
							console.error('playback_error', message);
						});
			
			
						//C connect player
						player.connect().then(resolved => {
							//C 'returns a promise with a boolean for whether or not the connection was successful'
							//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-connect
							//! do not resolve here, the player will trigger the 'ready' event when its truly ready
							if (!resolved) reject(new sj.Error({
								origin: 'spotify.loadPlayer()',
								message: 'spotify player failed to connect',
								reason: 'spotify.connect() failed',
							}));
						}, rejected => {
							reject(new sj.Unreachable({ //C a rejection shouldn't be possible here
								origin: 'spotify.loadPlayer()',
								message: 'spotify player failed to connect',
								reason: 'spotify.connect() failed, this should not be reachable',
								content: rejected,
							}));
						});
			
						/* //R
							//R custom event listeners not actually needed because a closure is created and window.onSpotifyWebPlaybackSDKReady() can directly call resolve() and reject()
							//L events: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
							let eventName = 'spotifyLoadPlayer';
							// listener
							window.addEventListener(eventName, function (customEvent) {
								if (customEvent.detail.resolved) {
									resolve(customEvent.detail.data);
								} else {
									reject(customEvent.detail.data);
								}
							}, {once: true});
							// triggers
							function triggerResolve(data) {
								window.dispatchEvent(new CustomEvent(eventName, {detail: {resolved: true, data}}));
							}
							function triggerReject(data) {
								window.dispatchEvent(new CustomEvent(eventName, {detail: {resolved: false, data}}));
							}
						*/
					};

					//C dynamic import Spotify's SDK
					//! I downloaded this file for module use, however spotify says to import from the url: https://sdk.scdn.co/spotify-player.js
					import(/* webpackChunkName: 'spotify-player' */ `./vendor/spotify-player.js`);
				});

				/* //OLD
					// sets up a local Spotify Connect device, but cannot play or search tracks (limited to modifying playback state, but don't do that here)
					// API can make playback requests to the currently active device, but wont do anything if there isn't one active, this launches one
					// https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-connect
			
					// TODO requires spotifyAccessToken, if this changes (ie. token refresh, account swap) how does player get updated? 
			
					return new Promise(function (resolve, reject) {
						// setup resolve/reject listeners
						window.addEventListener('spotifyLoadPlayerSuccess', function (e) {
							resolve(e.detail);
							e.currentTarget.removeEventListener(e.type, function () {});
						});
			
						window.addEventListener('spotifyLoadPlayerFailure', function (e) {
							reject(e.detail);
							e.currentTarget.removeEventListener(e.type, function () {});
						});
			
						// simplify event triggers
						function triggerResolve(data) {
							window.dispatchEvent(new CustomEvent('spotifyLoadPlayerSuccess', {detail: data}));
						}
			
						function triggerReject(data) {
							window.dispatchEvent(new CustomEvent('spotifyLoadPlayerFailure', {detail: data}));
						}
						
						
						window.onSpotifyWebPlaybackSDKReady = function () {
							// onSpotifyWebPlaybackSDKReady must be immediately after(isn't this before?) spotify-player.js, acts as the callback function
							try {
								// initialize
								var player = new Spotify.Player({
									name: WEB_PLAYER_NAME,
									getOAuthToken: cb => { cb(spotifyAccessToken); }
								});
			
								// configure listeners
								// https://developer.spotify.com/documentation/web-playback-sdk/reference/#events
								
								// ({param}) destructuring: https://stackoverflow.com/questions/37661166/what-do-function-parameter-lists-inside-of-curly-braces-do-in-es6
			
								player.addListener('playback_error', function ({message}) { 
									console.error(message); 
									// TODO handle me
								});
			
								// playback status updates
								player.addListener('player_state_changed', function (state) {
									// https://developer.spotify.com/documentation/web-playback-sdk/reference/#events
									spotify.playback.timestamp = state.timestamp;
									spotify.playback.isPlaying = !state.paused;
									spotify.playback.progress = state.position;
									spotify.playback.track = {
										source: spotify,
										sourceId: state.track_window.current_track.id,
										artists: [],
										title: state.track_window.current_track.name,
										duration: state.track_window.current_track.duration_ms,
									}
			
									// fill artists
									state.track_window.current_track.artists.forEach(function (artist, i) {
										spotify.playback.track.artists[i] = artist.name;
									});
								});
			
								// error handling
								player.addListener('initialization_error', function ({message}) { 
									//	'Emitted when the Spotify.Player fails to instantiate a player capable of playing content in the current environment. Most likely due to the browser not supporting EME protection.'
									triggerReject(new sj.Error({
											log: true,
											origin: 'spotify.loadPlayer()',
											message: 'spotify player encountered an initialization error',
											reason: message,
										})
									);
								});
			
								player.addListener('authentication_error', function ({message}) { 
									// 'Emitted when the Spotify.Player fails to instantiate a valid Spotify connection from the access token provided to getOAuthToken.'
									triggerReject(new sj.Error({
											log: true,
											origin: 'spotify.loadPlayer()',
											message: 'spotify player encountered an authentication error',
											reason: message,
										})
									);
								});
			
								player.addListener('account_error', function ({message}) {
									// 'Emitted when the user authenticated does not have a valid Spotify Premium subscription.'
									triggerReject(new sj.Error({
											log: true,
											origin: 'spotify.loadPlayer()',
											message: 'this account does not have a valid Spotify Premium subscription',
											reason: message,
										})
									);
								});
			
								// ready
								player.addListener('ready', function ({device_id}) {
									// returns a WebPlaybackPlayer object which just contains the created device_id
									// https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#object-web-playback-player
			
									spotifyApi.transferMyPlayback([device_id], {}).then(function (resolved) {
										triggerResolve(new sj.Success({
											origin: 'spotify.loadPlayer()',
											message: 'spotify player loaded',
										}));
			
										// TODO updatePlayback(); ?
									}, function (rejected) {
										triggerReject(new sj.Error({
											log: true,
											code: JSON.parse(error.response).error.status,
											origin: 'spotify.loadPlayer()',
											message: 'spotify player could not be loaded',
											reason: JSON.parse(error.response).error.message,
											content: error,
										}));
									}).catch(function (rejected) {
										triggerReject(new sj.Error({
											log: true,
											origin: 'spotify.loadPlayer()',
											message: 'spotify player could not be loaded',
											content: rejected,
										}));
									});
								});
			
								// connect to player
								player.connect().then(function (resolved) {
									// https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-connect
									// returns a promise with a boolean for whether or not the connection was successful
									// if connect() succeeded no action needed, player might still not be ready, will trigger the ready listener when ready
									if (!resolved) {
										triggerReject(new sj.Error({
											log: true,
											origin: 'spotify.loadPlayer()',
											message: 'spotify player failed to connect',
											reason: 'spotify.connect() failed',
										}));
									}
								}, function (rejected) {
									// should not be possible to get here, but handle it either way
									triggerReject(new sj.Error({
										log: true,
										origin: 'spotify.loadPlayer()',
										message: 'spotify player failed to connect',
										reason: 'spotify.connect() failed',
										content: rejected,
									}));
								});
							} catch (e) {
								triggerReject(new sj.Error({
									log: true,
									origin: 'spotify.loadPlayer()',
									message: 'spotify player failed to connect',
									reason: e,
									content: e,
								}));
							}
						}
						
			
						$.getScript('https://sdk.scdn.co/spotify-player.js').catch(function (jqXHR, settings, exception) {
							triggerReject(new sj.Error({
								log: true,
								origin: 'spotify.loadPlayer()',
								message: 'failed to load spotify player',
								reason: exception,
							}));
						});
					});
				*/
			},

			
			//C spotify has a separate updatePlayback action because from events & the awaitState function, the state is already retrieved and doesn't need to be retrieved a second time (except for volume)
			async updatePlayback(context, state) {
				//C formats and commits playback state

				/* //R
					when formattingState and checkState are executed, the track only gets metadata from the api and therefore looses it's playlistId, position, and other custom metadata, how to preserve this data so it can be used to know the currently playing track, playlist, and next/prev tracks

					my issue right now is where to store the app-generated metadata

					because, I want the individual source playbacks to also be able to react to external changes

					maybe just a simple if statement - if the track changes when not commanded to do so by the app, then a foreign track is being played, play history should still be recorded fine, but no playlist in the app would show a track as 'playing', unless the same foreign track is being displayed (like in search results, though this would mean that search results shouldn't be played sequentially in a playlist, which isn't really a necessary behavior) (a foreign track could simply be indicated by a null playlist id)

					so the playlistId/position should hang out on the track until it is either replaced by a new track with its own playlistId/position or wiped out by a track with no playlistId/position
						//? are playlistId and position mutually required? is there a situation where playlistId or position would exist on their own? I don't think so
				*/

				//C formats given state and adds volume from getVolume() to it, commits to state
				const formattedState = context.state.player.formatState(state);
				//C these player functions I'm pretty sure are local and don't send GET requests and therefore don't have rate limits and should be fairly fast
				//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-getvolume
				const volume = await context.state.player.getVolume(); 
				const newState = {...formattedState, volume};
				/*
					console.log(
						'track.name', formattedState.track.name, '\n',
						'track.sourceId', formattedState.track.sourceId, '\n',
						'isPlaying', formattedState.isPlaying, '\n',
						'progress', formattedState.progress,  '\n',
						'timestamp', formattedState.timestamp, '\n',
					);
				*/
				context.commit('setState', newState);
				return new sj.Success({
					origin: 'spotify module command - updatePlayback()',
					message: 'spotify playback updated',
					content: newState,
				});
			},
			async checkPlayback(context) {
				//C retrieves playback from api and updates it

				//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-getcurrentstate
				const state = await context.state.player.getCurrentState().catch(rejected => {
					throw new sj.Error({
						log: true,
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.checkPlayback()',
						message: 'failed to check spotify playback state',
						//reason: JSON.parse(rejected.response).error.message,
						content: rejected,
					});
				});

				await context.dispatch('updatePlayback', state);
				return new sj.Success({
					origin: 'spotify module command - checkPlayback()',
					message: 'spotify playback checked',
					content: context.state,
				});
			},
			
			//G//TODO if a source can't handle redundant requests (like pause when already paused) then a filter needs to be coded into the function itself - ie all the methods should be idempotent (toggle functionality is done client-side so that state is known)
			//G should resolve only when the playback command is applied

			// PLAYBACK COMMANDS
			//G must handle redundant requests (eg. pause when already paused)
			//G must only resolve when the playback state is actually applied (not just on command acknowledgement)
			async start(context, track) {
				const timeBeforeCall = Date.now();
				const result = await context.state.player.awaitState({
					command: async () => await context.state.source.request('PUT', 'me/player/play', {
						uris: [`spotify:track:${track.sourceId}`],
					}),
					stateCondition: state => ( 
						//C track must be playing, near the start (within the time from when the call was made to now), and the same track
						state.isPlaying === true &&
						//state.progress !== context.state.progress && //!
						//state.progress !== 0 && //C track must be actually started
						state.progress <= (Date.now() - timeBeforeCall) / context.state.track.duration &&
						state.track.sourceId === context.state.track.sourceId
					),
					success: {},
					error: {
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.start()',
						message: 'spotify track could not be started',
						//reason: JSON.parse(rejected.response).error.message,
					},
					timeoutError: {
						origin: 'sj.spotify.playback.actions.start()',
					},
				});
				//TODO commands to pause the playback (possibly others too) are ignored by the player when they are called immediately after a track has started. This isn't an issue on my end, but with Spotify. There is some point even after the stateCondition above that the player is able to take more commands, but I cannot figure out what it is. It might be when the progress goes from 0 to not-0, but the second time, because the progress from the previous track lingers when the tracks are switched. So for now I've put a 1 second delay before the start command resolves. Yes its hacky, and it might break on slower connections, but it doesn't fatally break the app.
				await wait(1000);
				return result;
			},
			async pause({state: {player}}) {
				return await player.awaitState({
					command: async () => await player.pause(),
					stateCondition: state => state.isPlaying === false,
					success: {
					},
					error: {
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.pause()',
						message: 'spotify track could not be paused',
						//reason: JSON.parse(rejected.response).error.message,
					},
					timeoutError: {
						origin: 'sj.spotify.playback.actions.pause()',
					},
				});
			},
			async resume({state: {player}}) {
				return await player.awaitState({
					command: async () => await player.resume(),
					stateCondition: state => state.isPlaying === true,
					success: {

					},
					error: {
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.resume()',
						message: 'spotify track could not be resumed',
						//reason: JSON.parse(rejected.response).error.message,
					},
					timeoutError: {
						origin: 'sj.spotify.playback.actions.resume()',
					},
				});
			},
			async seek({state, state: {player, track}}, progress) {
				const ms = progress * track.duration;
				const timeBeforeCall = Date.now();

				return await player.awaitState({
					command: async () => await player.seek(ms),
					//C state.position must be greater than the set position but less than the difference in time it took to call and resolve
					stateCondition: state => state.progress >= progress && state.progress - progress <= (Date.now() - timeBeforeCall) / track.duration,
					success: {

					},
					error: {
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.seek()',
						message: 'spotify track could not be seeked',
						//reason: JSON.parse(rejected.response).error.message,
					},
					timeoutError: {
						origin: 'sj.spotify.playback.actions.seek()',
					},
				});
			},
			async volume({state: player}, volume) {
				return await player.awaitState({
					command: async () => await player.setVolume(volume),
					stateCondition: state => state.volume === volume,
					success: {

					},
					error: {
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.seek()',
						message: 'spotify volume could not be set',
						//reason: JSON.parse(rejected.response).error.message,
					},
					timeoutError: {
						origin: 'sj.spotify.playback.actions.volume()',
					},
				});
			},
		},
	}),
});
sj.youtube = new sj.Source({
	name: 'youtube',
	register: true,
	idPrefix:	'https://www.youtube.com/watch?v=',
	nullPrefix:	'https://www.youtube.com/watch',
	

	async auth() {
		//L example code: https://developers.google.com/youtube/v3/docs/search/list

		//TODO redirect uri has to be whitelisted on https://console.developers.google.com/apis/credentials/oauthclient/575534136905-vgdfpnd34q1o701grha9i9pfuhm1lvck.apps.googleusercontent.com?authuser=1&project=streamlist-184622&supportedpurview=project
		

		//C watch for gapi to be assigned by using a setter with a deferred promise
		//L https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript
		//OLD alternative option was to use waitForCondition({condition: () => window.gapi !== undefined, timeout: sj.Playback.requestTimeout});
		//! in case this is called more than once (where the script won't set gapi a second time), store gapi onto its temporary gapi2
		window.gapi2 = window.gapi;
		const loaded = new Deferred().timeout(sj.Playback.requestTimeout, () => new sj.Error({
			log: false,
			origin: 'sj.youtube.auth()',
			reason: 'gapi loading timed out',
		}));
		Object.defineProperty(window, 'gapi', {
			configurable: true,
			enumerable: true,
			get() {
				return window.gapi2;
			},
			set(value) {
				//R gapi was first going to be stored on sj.youtube, however after gapi.cient.init() is called, gapi gets some cross-origin data defined on it. this is an issue when attempting to copy its data via fClone, as a cross-origin error will be thrown.
				window.gapi2 = value;
				loaded.resolve();
			},
		});

		//C loads gapi into global scope 
		//TODO is there any way to make this more module-like?
		await runHTMLScript('https://apis.google.com/js/api.js');
		//C wait for gapi
		await loaded;

		//C remove the watcher
		Object.defineProperty(window, 'gapi', {
			configurable: true,
			enumerable: true,

			value: window.gapi2,
			writable: true,
		});
		delete window.gapi2;


		//C load client library
		await new Promise((resolve, reject) => {
			//L https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md
			//C first arg is 'A colon (:) separated list of gapi libraries. Ex: "client:auth2"'
			gapi.load('client', {
				callback(args) { //? no idea what the parameters passed here are
					resolve(args);
				},
				onerror(args) {
					reject(args);
				},
				ontimeout(args) {
					reject(args); //TODO probably a custom error here?
				},
				timeout: 60000, //TODO
			});
		});

		//C get apiKey and clientId stored on server
		const {apiKey, clientId} = await serverRequest('GET', `youtube/credentials`);

		//TODO Create specific rules for each API key.
		rules.string.validate(apiKey);
		rules.string.validate(clientId);

		//C loads and performs authorization, short version of the code commented out below
		//R after client is loaded (on its own), gapi.client.init() can load the auth2 api and perform OAuth by itself, it merges the below functions, however I am keeping them separate for better understanding of google's apis, plus, auth2 api may only be initialized once, so it may be problematic to use gapi.client.init() more than once
		await gapi.client.init({
			//L https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--
			//TODO move keys
			apiKey,
			discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
			clientId,

			//https://www.googleapis.com/auth/youtube.force-ssl
			//https://www.googleapis.com/auth/youtube
			scope: 'https://www.googleapis.com/auth/youtube.readonly',
		});


		/* LONG IMPLEMENTATION
			//! 'auth2:client' must be loaded above

			//C init and signIn to OAuth
			const googleAuth = await gapi.auth2.init({
				//! may only be initialized once, and so client_id and scopes cannot be reinitialized
				//L other options: https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig
				client_id: '575534136905-vgdfpnd34q1o701grha9i9pfuhm1lvck.apps.googleusercontent.com', //TODO move
				//L The scopes to request, as a space-delimited string, may also be done in signIn() which adds on top of these scopes
				scope: '', //TODO
			});
			await googleAuth.signIn({
				//L https://developers.google.com/identity/sign-in/web/reference#googleauthsigninoptions
				//L consent, select_account, or none (can fail)
				prompt: 'consent',
			});

			//C init and load client
			gapi.client.setApiKey('key')
			await gapi.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest');
		*/
	},
	async request(method, path, content) {
		//C check that user is authorized (signedIn)
		//TODO how do I check that the client library is loaded?
		if (!window?.gapi?.auth2?.getAuthInstance?.()?.isSignedIn?.get?.()) {
			await this.auth();
		}

		return await new Promise((resolve, reject) => {
			// Wraps goog.Thenable which doesn't support the catch method.
			gapi.client.request({
				method,
				path: `/youtube/v3/${path}`,
				params: content,
			}).then(resolve, reject);
		}).catch((rejected) => {
			if (
				rejected?.code === 403 &&
				rejected?.result?.error?.errors[0]?.message?.startsWith?.('Access Not Configured.')
			) {
				/* The key has probably been invalidated.
					If the API is still enabled, try resetting the API by:
						1. Deleting the API keys.
						2. Disabling the API.
						3. Re-enabling the API.
						4. Creating new keys.
					//L See here: https://stackoverflow.com/a/27491718
				*/
				throw new sj.Error({
					reason: 'API key is invalid.',
					message: 'YouTube credentials are invalid.',
					content: rejected,
				});
			} else {
				throw rejected;
			}
		}).catch(sj.propagate);
	},

	async search({
		term = '',
		startIndex = 0,
		amount = 1,
	}) {
		// VALIDATE
		sj.Rule2.nonEmptyString.validate(term);
		sj.Rule2.nonNegativeInteger.validate(startIndex);
		sj.Rule2.positiveInteger.validate(amount);


		//C amass search result pages until the last requested search index is included
		//! this will drive api quotas up fast if the startIndex or amount are high (n*50)
		//!//TODO the way the search functionality is probably going to work, is when the user scrolls down, more and more searches get queried just with a different startingIndex, however this will drive up the quota cost for youtube since each startingIndex lower on the list will do multi-page searches for that below, maybe find a way to store the next page token for a specific query and then use that on successive searches
		/* //R
			default quota limit is 10 000 units per day (or not? I don't see a limit in the quotas tab of the api dashboard)
			/search costs 100 per page, (so only allowed to search 100 times per day)
			increasing the maxResults doesn't seem to increase the quota cost, but increasing the number of pages per search (by increasing startIndex or amount) will,
			so the best solution to adapting this page system to my start/amount system would be to request the maximum number of results per page (50), then requesting the next page until the last result is retrieved - this will require the minimum number of pages
		*/		

		let limit = 1; //TODO temp safeguard

		const allPageResults  = [];
		let pageToken = null;
		
		while (allPageResults.length < startIndex + amount && limit > 0) {
			const pageResults = await sj.youtube.request('GET', 'search', {
				//L https://developers.google.com/youtube/v3/docs/search/list#parameters
				part: 'snippet',
				type: 'video',
				maxResults: 50,
				q: term,
				//C conditionally add pageToken
				//L https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object/40560953#40560953
				...(pageToken !== null && {pageToken}),
			});
			allPageResults.push(...pageResults.result.items);
			pageToken = pageResults.nextPageToken;

			limit--;
		}
		//C remove the unneeded results
		const searchResults = allPageResults.slice(startIndex, startIndex + amount);


		//C videoResults must also be searched because the contentDetails part is not available for the search request
		//L see search here only has snippet part available: https://developers.google.com/youtube/v3/determine_quota_cost
		const videoResult = await sj.youtube.request('GET', 'videos', {
			//L https://developers.google.com/youtube/v3/docs/videos/list
			//C join the results ids
			id: searchResults.map(item => item.id.videoId).join(','),
			//C only retrieve the contentDetails, as the snippet has already been retrieved, this reduces the request cost
			part: 'contentDetails',
		});
		if (searchResults.length !== videoResult.result.items.length) throw new sj.Error({
			origin: 'youtube.search()',
			reason: 'search result length not equal to video result length',
			content: {
				searchLength: searchResults.length,
				videoLength: videoResult.result.items.length,
			},
		});
		videoResult.result.items.forEach((item, index) => {
			//C ensure that ids line up
			if (searchResults[index].id.videoId !== item.id) throw new sj.Error({
				origin: 'youtube.search()',
				reason: `search and video results at ${index} do not have the same id`,
			});
			//C append contentDetails part to the search results
			searchResults[index].contentDetails = item.contentDetails;
		});

		return searchResults.map(({id: {videoId: id}, snippet, contentDetails}) => new sj.Track({
			source: sj.youtube, //! this is causing issues with fClone, its throwing a cross origin error
			sourceId: id,
			link: sj.youtube.idPrefix + id,
			...this.formatSnippet(snippet),
			...this.formatContentDetails(contentDetails),
		}));
	},

	playback: new sj.Playback({
		actions: {
			async loadPlayer(context) {
				//C load youtube iframe api
				await runHTMLScript('https://www.youtube.com/iframe_api');

				//TODO choose timeout
				const deferred = new Deferred().timeout(sj.Playback.requestTimeout, () => new sj.Error({
					origin: 'sj.youtube loadPlayer()',
					reason: 'youtube iframe player load timed out',
				}));

				window.onYouTubeIframeAPIReady = function () {
					context.commit('setState', {
						player: new YT.Player('youtubeIFrame', { //! this won't throw any error if the element id doesn't exist
							width: '640',
							height: '390',
							//videoId: 'M71c1UVf-VE',
							// host: 'https://www.youtube.com', //? doesn't seem to help
							playerVars: {
								controls: 0,
								disablekb: 1,
								enablejsapi: 1,
								fs: 0,
								iv_load_policy: 3,
								modestbranding: 1,
								// origin: 'http://localhost:3000', //TODO extract as constant //? doesn't seem to help
							},

							//L https://developers.google.com/youtube/iframe_api_reference#Events
							events: {
								async onReady(event) {
									//TODO handle error?
									await context.dispatch('checkPlayback').catch(sj.propagate);
									deferred.resolve(new sj.Success({
										origin: 'sj.youtube loadPlayer()',
										reason: 'youtube iframe player loaded',
									}));
								},
								async onStateChange(event) {
									//! onStateChange event only has the playbackState data, checkPlayback gets this anyways
									await context.dispatch('checkPlayback');
								},
								onError(event) {
									//TODO
									console.error('youtube player onError:', event);
								},
								
							},
						}),
					});
				};

				return await deferred;
			},

			async checkPlayback(context) {
				//TODO catch errors in here

				const state = {};
				const track = {};


				const player = context.state.player;

				track.link = player.getVideoUrl();
				//C remove the idPrefix or nullPrefix from youtube urls
				//! idPrefix must be matched first because it contains nullPrefix (which would escape early and leave ?v=)
				track.sourceId = track.link.replace(
					new RegExp(`${escapeRegExp(sj.youtube.idPrefix)}|${escapeRegExp(sj.youtube.nullPrefix)}`), 
					''
				);

				const playerDuration = player.getDuration();
				//! 'Note that getDuration() will return 0 until the video's metadata is loaded, which normally happens just after the video starts playing.'
				//C if duration is zero, set it to infinity instead, so that the slider stays at the start until the duration is determined
				track.duration = playerDuration === 0 ? Infinity : playerDuration;
				state.progress = player.getCurrentTime() * 1000 / track.duration;

				const playerState = player.getPlayerState();
				state.isPlaying = playerState === 1 || playerState === 3; 
				/* //G
					-1 un-started
					0 ended
					1 playing
					2 paused
					3 buffering - this should be considered as playing, but not influence the progress
					5 video cued
				*/

				//C if muted: volume is 0, convert 0-100 to 0-1 range
				state.volume = player.isMuted() ? 0 : player.getVolume() / 100; //C 

				state.timestamp = Date.now();

				//C get name and artists from current track, starting track, or an api call
				//R cannot scrape name or artists from DOM element because of iframe cross-origin restrictions
				if (track.sourceId === context?.state?.track?.sourceId) {
					track.name = context.state.track.name;
					track.artists = [...context.state.track.artists];
				} else if (track.sourceId === context?.state?.startingTrack?.sourceId) {
					track.name = context.state.startingTrack.name;
					track.artists = [...context.state.startingTrack.artists];
				} else {
					const video = await sj.youtube.request('GET', 'videos', {id: track.sourceId, part: 'snippet'});
					if (video.result.items.length === 1) {
						const formattedSnippet = sj.youtube.formatSnippet(video.result.items[0].snippet);
						track.name = formattedSnippet.name;
						track.artists = formattedSnippet.artists;
					}
				}

				state.track = new sj.Track(track);


				context.commit('setState', state);
				return new sj.Success({
					origin: 'youtube module action - checkPlayback()',
					message: 'youtube playback updated',
					content: state,
				});
			},


			async baseStart({state: {player}, dispatch}, {sourceId}) {
				player.loadVideoById({
					videoId: sourceId,
					//startSeconds
					//endSeconds
					//suggestedQuality
				});
			},

			// async start(context, track) {
			// },
			async pause({state: {player}}) {
				player.pauseVideo();
				//TODO return
			},
			async resume({state: {player}}) {
				player.playVideo();
				//TODO return
			},
			async seek({state: {player}}, progress) {
				const seconds = progress * track.duration * 0.001;
				player.seekTo(seconds, true);
				//TODO return
			},
			async volume({state: player}, volume) {
				player.setVolume(volume * 100);
				player.unMute();
				//TODO return
			},
		},
	}),
});
//TODO move inside
sj.youtube.formatContentDetails = function (contentDetails) {
	const pack = {};
	pack.duration = sj.moment.duration(contentDetails.duration, sj.moment.ISO_8601).asMilliseconds();
	return pack;
},
sj.youtube.formatSnippet = function (snippet) {
	const pack = {};
	if (!sj.isType(snippet, Object)) throw new sj.Error({
		origin: 'sj.youtube.formatSnippet()',
		reason: 'snippet is not an object',
	});

	//C assuming title format of 'Artist - Title'
	//C splits on dash between one or any whitespace
	const splitTitle = snippet.title.split(/(?:\s+[-|]\s+)/g);
	if (splitTitle.length === 2)  { //C if splitTittle has the exact length of two
		//C use the first part as the artists
		//C splits on commas between none or any whitespace, splits on &xX| between one or any whitespace
		//TODO improve
		pack.artists = splitTitle[0].split(/(?:\s*[,]\s*)|(?:\s+[&xX|]\s+)/g);
		//C use the second part as the name
		pack.name = splitTitle[1];
	} else {
		//C use the channel title as the artist
		pack.artists = [snippet.channelTitle];
		//C use the full title as the name
		pack.name = snippet.title;
	}

	//C apparently the titles are html encoded, (possibly the artist names too//?)
	//L using he to decode: https://www.npmjs.com/package/he#hedecodehtml-options
	pack.artists = pack.artists.map(artist => sj.he.decode(artist));
	pack.name = sj.he.decode(pack.name);

	return pack;
};


//  ██████╗ ██╗      █████╗ ██╗   ██╗██████╗  █████╗  ██████╗██╗  ██╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██████╔╝███████║██║     █████╔╝ 
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══██╗██╔══██║██║     ██╔═██╗ 
//  ██║     ███████╗██║  ██║   ██║   ██████╔╝██║  ██║╚██████╗██║  ██╗
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
//   

/* TODO
	behavior: playing in spotify manually, then start up app, previewing a song updates the playback to the current already playing song not the clicked preview song

	sj.Toggle: toggle or resume & pause or both? they all deal with one playback property but toggle out of all the commands is the only one that is dependant on an existing state - how to classify this? when do resume & pause merge into toggle - source, command, or playback level?
*/

/*
	sj.youtube.checkPlayback = async function () {
		// 3 player calls - these are all synchronous - should not return errors, but still check their possible return types
		// 1 api call (track)

		// id?
		// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
		try {
			//https://developers.google.com/youtube/iframe_api_reference#Functions

			// playing
			if (youtubePlayer.getPlayerState() === 1 || youtubePlayer.getPlayerState() === 3) {
				//	Returns the state of the player. Possible values are:
				//	-1 – unstarted, 0 – ended, 1 – playing, 2 – paused, 3 – buffering, 5 – video cued	
				youtube.playback.isPlaying = true;
			} else {
				youtube.playback.isPlaying = false;
			}
			
			// progress
			youtube.playback.progress = youtubePlayer.getCurrentTime() * 1000;
			youtube.playback.timestamp = Date.now();


			var url = youtubePlayer.getVideoUrl(); // !!! can sometimes return undefined
			var id = sj.isType(url, String) ? url.split('v=')[1] : '';
			if (id) {
				// if not empty
				var andPosition = id.indexOf('&'); 
				if (andPosition != -1) { id = id.substring(0, andPosition); }

				return youtube.getTracks([id]).then(function (resolved) {
					if (resolved.content.length === 1) {
						youtube.playback.track = resolved.content[0];

						return new sj.Success({
							log: true,
							origin: 'youtube.checkPlayback()',
							message: 'youtube playback state checked',
						});
					} else {
						throw new sj.Error({
							log: true,
							code: '404',
							origin: 'youtube.checkPlayback()',
							message: 'track not found',
							reason: 'id: ' + id +' was not found',
						});
					}
				}).catch(function (rejected) {
					throw sj.propagate(rejected);
				});
			} else {
				// no track is playing
				return new sj.Success({
					log: true,
					origin: 'youtube.checkPlayback()',
					message: 'youtube playback state checked',
				});
			}
		} catch (e) {
			throw new sj.Error({
				log: true,
				origin: 'youtube.checkPlayback()',
				message: 'could not check youtube playback',
				reason: e,
			});
		}
	};
*/


//   ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     
//  ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     
//  ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     
//  ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     
//  ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗
//   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝

/* //R
	I considered instead of updating playback state in each source function upon sj.Success, to do a second and final checkPlayback() once updatePlayback() succeeds (this would require two api calls, but I thought it could be simpler (but would it?)).
	
	I thought because track info is also needed (in addition to playback state) that a final checkPlayback() would be needed to verify the post-update track info, (this came from not knowing what track was playing when starting one for the first time), however this info should already be known from the fetched and displayed track (object), so all of these functions actually do have the ability to update information when resolved.

	This resolution suggests using track objects everywhere as parameters rather than ids; this should be possible because the user is never going to be blindly playing id strings without the app first searching and tying down its additional metadata.
*/
/* //R
	I considered that setting knownPlayback.progress upon start() (0) and seek() (ms) may wipeout any official information from checkPlayback() or listeners, as any information that arrives between sending and receiving the request will be wiped out upon resolution (with less valuable, inferred information). 
	
	However unless the information is being sent from a synchronous or local source (which actually is likely), that information should not be sent and received between the time-span it takes for the playback request to be sent and received - therefore it must be sent before and therefore less accurate/valuable than even the inferred progress information.

	Then I realized that any checks to playback state will have the same offset error as the playback requests so it makes no sense to even checkPlayback() to get more accurate information.
*/

/*
	sj.youtube.apiStart = async function (track) {
		return new Promise(function (resolve, reject) {
			try {
				youtubePlayer.loadVideoById(track.sourceId);
				youtubePlayer.playVideo();
				youtubePlayer.pauseVideo();

				resolve(new sj.Success({
					log: true,
					origin: 'youtube.start()',
					message: 'track started',
				}));
			} catch (e) {
				reject(new sj.Error({
					origin: 'youtube.start()',
					message: 'failed to start youtube track',
					content: e,
				}));
			}
		});
	};
*/
/*
	sj.youtube.apiResume = async function () {
		return new Promise(function (resolve, reject) {
			try {
				youtubePlayer.playVideo();
				
				resolve(new sj.Success({
					log: true,
					origin: 'youtube.resume()',
					message: 'track started',
				}));
			} catch (e) {
				reject(new sj.Error({
					origin: 'youtube.resume()',
					message: 'failed to resume youtube track',
					content: e,
				}));
			}
		});
	};
*/
/*
	sj.youtube.apiPause = async function () {
		return new Promise(function (resolve, reject) {
			try {
				youtubePlayer.pauseVideo();
				resolve(new sj.Success({
					log: true,
					origin: 'youtube.pause()',
					message: 'track paused',
				}));
			} catch (e) {
				reject(new sj.Error({
					log: true,
					origin: 'youtube.pause()',
					message: 'failed to pause',
					content: e,
				}));
			}
		});
	};
*/
/*
	sj.youtube.apiSeek = async function (ms) {
		return new Promise(function (resolve, reject) {
			try {
				// (seconds - number, allowSeekAhead of loading - boolean)
				youtubePlayer.seekTo(Math.round(ms / 1000), true);

				resolve(new sj.Success({
					log: true,
					origin: 'youtube.seek()',
					message: 'track seeked',
				}));
			} catch (e) {
				reject(new sj.Error({
					log: true,
					origin: 'youtube.seek()',
					message: 'failed to seek',
					content: e,
				}));
			}
		});
	};
*/
/*
	sj.youtube.apiVolume = async function (volume) {
	};
*/


export default sj;



