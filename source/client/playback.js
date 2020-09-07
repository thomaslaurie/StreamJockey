/* TODO
	behavior: playing in spotify manually, then start up app, previewing a song updates the playback to the current already playing song not the clicked preview song

	sj.Toggle: toggle or resume & pause or both? they all deal with one playback property but toggle out of all the commands is the only one that is dependant on an existing state - how to classify this? when do resume & pause merge into toggle - source, command, or playback level?
*/

import {
	Track,
} from './entities/index.js';
import {
	Subscription,
} from '../shared/live-data.js';
import {
	clamp,
	capitalizeFirstCharacter,
	wait,
	one,
	repeat,
	rules,
	define,
} from '../shared/utility/index.js';
import isInstanceOf from '../shared/is-instance-of.js';
import {
	Start,
	Toggle,
	Seek,
	Volume,
} from './commands.js';

export default class Playback {
	constructor(options = {}) {
		const {
			state,
			actions,
			mutations,
			getters,
			modules,
		} = options;

		//! New property objects must be created here so that instances do not all use the same reference.
		define.constant(this, {
			state:     {...this.constructor.baseState,     ...state},
			actions:   {...this.constructor.baseActions,   ...actions},
			mutations: {...this.constructor.baseMutations, ...mutations},
			getters:   {...this.constructor.baseGetters,   ...getters},
			modules:   {...this.constructor.baseModules,   ...modules},
		});
	}
}
define.constant(Playback, {
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
				const deferred = new Deferred().timeout(sj.Playback.requestTimeout, () => new Err({
					origin: 'sj.Playback.baseActions.start()',
					reason: 'start state timed out',
				}));

				const unwatch = context.watch(
					// pack desired state
					({state: {isPlaying, progress}}, {sourceId}) => ({sourceId, isPlaying, progress}),
					// evaluate state conditions
					({sourceId, isPlaying, progress}) => {
						if (
							// track must have the right id, be playing, near the start (within the time from when the call was made to now)
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

			// Trigger api.
			await dispatch('baseStart', track);

			/* //TODO same here
				// wait for desired state
				await deferred;
				unwatch();
			*/
			// Wait for the desired state.
			await repeat.async(async () => {
				const waitInterval = 100;
				await wait(waitInterval);
				return {
					sourceId:  getters.sourceId,
					isPlaying: state.isPlaying,
					progress:  state.progress,
					duration:  state.track.duration,
				};
			}, {
				until({sourceId, isPlaying, progress, duration}) {
					// Track must have the right id, be playing, near the start (within the time from when the call was made to now).
					return (
						   sourceId  === track.sourceId
						&& isPlaying === true
						&& progress  <=  (Date.now() - timeBefore) / duration
					);
				},
			});
		},

		/* //OLD
			async preserveLocalMetadata(context, track) {
				if (!sj.isType(track, Track)) throw new Err({
					origin: 'preserveLocalMetadata()',
					reason: 'track is not an Track',
				});

				// default local metadata as foreign track
				let local = Track.filters.localMetadata.reduce((obj, key) => {
					obj[key] = null;
					return obj;
				}, {});

				// set local as current or starting track if matching
				if (sj.isType(context.state.track, Object) &&
				track.sourceId === context.state.track.sourceId)			local = context.state.track;
				else if (sj.isType(context.state.startingTrack, Object) &&
				track.sourceId === context.state.startingTrack.sourceId)	local = context.state.startingTrack;

				// return new track with localMetadata properties replaced
				return new Track({...track, ...sj.shake(local, Track.filters.localMetadata)});
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
		removeStartingTrack(state) {
			state.startingTrack = null;
		},
	},
	baseGetters: {
		// Safe getters for track properties.
		sourceId: state => state?.track?.sourceId,
		duration: state => state?.track?.duration,

		// State conditions for command resolution.
		isStarted:	(state, {sourceId, duration}) => (id, timeBefore) => (
			sourceId === id
			&& state.isPlaying === true
			&& state.progress <= (Date.now() - timeBefore) / duration //TODO Extract to function, theres another place where this is done.
		),

		//TODO
		// isPaused:
		// isResumed:
		// isSeeked:
		// isVolumed:
	},
	baseModules: {
	},

	universalState: sourceInstances => ({
		// CLOCK
		// Basically a reactive Date.now(), so far just used for updating playback progress.
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
		// Source is used to select the proper playback state for actualPlayback.
		source: null,
		// List of active source instances for actions to modify the playback of.
		sourceInstances,

		// LOCAL TRACKS
		currentTrackSubscription: null,
		startingTrackSubscription: null,
	}),
	universalActions:   () => ({
		// CLOCK
		async startClock(context) {
			await context.dispatch('stopClock');
			const clockRefreshRate = 100;
			const id = setInterval(() => context.commit('updateClock'), clockRefreshRate);
			context.commit('setClockIntervalId', id);
		},
		async stopClock(context) {
			clearInterval(context.state.clockIntervalId);
			context.commit('setClockIntervalId', null);
		},

		// QUEUE
		//TODO there seems to be a bug in the command queue where eventually an command will stall until (either it or something ahead of it, im not sure which) times out, upon which the command in question will be fulfilled
		async pushCommand(context, command) {
			// Attempts to push a new command the current command queue. Will collapse and/or annihilate commands ahead of it in the queue if conditions are met. Command will not be pushed if it annihilates or if it is identical to the sent command or if there is no sent command and it is identical to the current playback state.

			let push = true;

			// Remove redundant commands if necessary.
			const compact = function (i) {
				if (i >= 0) {
					//R collapse is required to use the new command rather than just using the existing command because sj.Start collapses different commands than itself
					if (command.collapseCondition(context.state.commandQueue[i])) {
						// If last otherCommand collapses, this command gets pushed.
						push = true;
						// Store otherCommand on this command.
						command.collapsedCommands.unshift(context.state.commandQueue[i]);
						// Remove otherCommand.
						context.commit('removeQueuedCommand', i);
						// Analyze next otherCommand.
						compact(i - 1);
					} else if (command.annihilateCondition(context.state.commandQueue[i])) {
						// If last otherCommand annihilates, this command doesn't get pushed.
						push = false;
						command.collapsedCommands.unshift(context.state.commandQueue[i]);
						context.commit('removeQueuedCommand', i);
						compact(i - 1);
					}
					// If otherCommand does not collapse or annihilate, escape.
				}
			};
			compact(context.state.commandQueue.length - 1);

			if (( // If there is a sent command and identical to the sent command,
				context.state.sentCommand !== null
				&& command.identicalCondition(context.state.sentCommand)
			) || ( // or if there isn't a sent command and identical to the actual playback.
				context.state.sentCommand === null
				&& command.identicalCondition(context.getters.actualPlayback)
			)) {
				// Don't push.
				push = false;
			}

			// Route command resolve/reject to this result promise.
			const resultPromise = new Promise((resolve, reject) => {
				command.resolve = resolve;
				command.reject = reject;
			});

			// Push command to the queue or resolve it (because it has been collapsed).
			if (push) {
				context.commit('pushQueuedCommand', command);
			} else {
				command.fullResolve();
			}

			// Send next command.
			//! Do not await because the next command might not be this command, this just ensures that the nextCommand cycle is running every time a new command is pushed.
			context.dispatch('nextCommand');

			// Await for the command to resolve.
			return resultPromise;
		},
		async nextCommand(context) {
			// Don't do anything if another command is still processing or if no queued commands exist.
			if (context.state.sentCommand !== null || context.state.commandQueue.length <= 0) return;

			// Move the command from the queue to sent.
			context.commit('setSentCommand', context.state.commandQueue[0]);
			context.commit('removeQueuedCommand', 0);

			// Trigger and resolve the command.
			await context.state.sentCommand.trigger(context).then(
				resolved => context.state.sentCommand.fullResolve(resolved),
				rejected => context.state.sentCommand.fullReject(rejected),
			);

			// Mark the sent command as finished.
			context.commit('removeSentCommand');
			// Send next command //! do not await, this just restarts the nextCommand cycle.
			context.dispatch('nextCommand');
		},

		// PLAYBACK FUNCTIONS
		//G the main playback module's commands, in addition to mappings for basic playback functions, should store all the higher-level, behavioral playback functions (like toggle)
		// BASIC
		async start({dispatch, state: {sourceInstances}}, track) {
			return dispatch('pushCommand', new Start({
				source: track.source, //! Uses track's source.
				sourceInstances,
				track,
			}));
		},
		async pause({dispatch, getters: {desiredSource: source}, state: {sourceInstances}}) {
			return dispatch('pushCommand', new Toggle({
				source, //! other non-start basic playback functions just use the current desiredPlayback source
				sourceInstances,
				isPlaying: false,
			}));
		},
		async resume({dispatch, getters: {desiredSource: source}, state: {sourceInstances}}) {
			return dispatch('pushCommand', new Toggle({
				source,
				sourceInstances,
				isPlaying: true,
			}));
		},
		async seek({dispatch, getters: {desiredSource: source}, state: {sourceInstances}}, progress) {
			return dispatch('pushCommand', new Seek({
				source,
				sourceInstances,
				progress,
			}));
		},
		async volume({dispatch, getters: {desiredSource: source}, state: {sourceInstances}}, volume) {
			//TODO Volume should change volume on all sources.
			return dispatch('pushCommand', new Volume({
				source,
				sourceInstances,
				volume,
			}));
		},
		// HIGHER LEVEL
		async toggle({dispatch, getters: {desiredSource: source, desiredIsPlaying: isPlaying}, state: {sourceInstances}}) {
			return dispatch('pushCommand', new Toggle({
				source,
				sourceInstances,
				isPlaying: !isPlaying,
			}));
		},
	}),
	universalMutations: () => ({
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
	}),
	universalGetters:   () => ({
		/*
			// PLAYBACK STATE
			actualPlayback(state, getters) {
				// return null playback state if no source
				if (state.source === null) return {...sj.Playback.baseState};

				// get the source state
				const sourceState = state[state.source.name];

				// use inferredProgress or regular progress depending on isPlaying
				//G//! anytime isPlaying is changed, the progress and timestamp (and probably track & volume) must be updated
				if (sourceState.isPlaying) return {...sourceState, progress: getters.inferredProgress};
				else return sourceState;
			},
			inferredProgress(state) {
				if (state.source === null) return -1;
				// this is detached from actualPlayback() so that it's extra logic isn't repeated x-times per second every time inferredProgress updates
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
		sourceOrBase: state => (key) => {
			if (state.source === null) {
				return Playback.baseState[key];
			}
			return state[state.source.name][key];
		},

		actualSource:    (state) => {
			return state.source;
		},
		actualTrack:     (state, getters) => {
			const sourceOrBaseTrack = getters.sourceOrBase('track');
			if (isInstanceOf(sourceOrBaseTrack, Track, 'Track')) {
				// If the source track matches the current or starting track (by sourceId), return the current or starting track instead, so that it may be reactive to any data changes.
				if (isInstanceOf(getters.currentTrack, Track, 'Track') && getters.currentTrack.sourceId === sourceOrBaseTrack.sourceId) return getters.currentTrack;
				if (isInstanceOf(getters.startingTrack, Track, 'Track') && getters.startingTrack.sourceId === sourceOrBaseTrack.sourceId) return getters.startingTrack;
			}

			return sourceOrBaseTrack;
		},
		actualIsPlaying: (state, getters) => getters.sourceOrBase('isPlaying'),
		actualProgress:  (state, getters) => {
			let progress = getters.sourceOrBase('progress');

			const source = state?.[state?.source?.name];
			if (rules.object.test(source?.track) && source?.isPlaying) {
				// If playing, return inferred progress.
				const elapsedTime = state.clock - state[state.source.name].timestamp;
				const elapsedProgress = elapsedTime / state[state.source.name].track.duration;
				progress = clamp(state[state.source.name].progress + elapsedProgress, 0, 1);
			}

			return progress;
		},
		actualVolume:    (state, getters) => getters.sourceOrBase('volume'),

		actualPlayback: (state, getters) => ({
			//! this will update as fast as progress does
			source:		getters.actualSource,
			track:		getters.actualTrack,
			isPlaying:	getters.actualIsPlaying,
			progress:	getters.actualProgress,
			volume:		getters.actualVolume,
		}),


		// DESIRED
		flattenPlayback: (state, getters) => (key) => {
			// Value starts as the actualValue.
			let value = getters[`actual${capitalizeFirstCharacter(key)}`];
			// Then if defined, sentCommand.
			if (rules.object.test(state.sentCommand) && state.sentCommand[key] !== undefined) {
				value = state.sentCommand[key];
			}
			// Then if defined, each queuedCommand.
			for (const queuedCommand of state.commandQueue) {
				if (queuedCommand[key] !== undefined) value = queuedCommand[key];
			}

			return value;
		},

		desiredSource:    (state, getters) => getters.flattenPlayback('source'),
		desiredTrack:     (state, getters) => getters.flattenPlayback('track'),
		desiredIsPlaying: (state, getters) => getters.flattenPlayback('isPlaying'),
		desiredProgress:  (state, getters) => getters.flattenPlayback('progress'),
		desiredVolume:    (state, getters) => getters.flattenPlayback('volume'),

		desiredPlayback: (state, getters) => ({
			source:		getters.actualSource,
			track:		getters.desiredTrack,
			isPlaying:	getters.desiredIsPlaying,
			progress:	getters.desiredProgress,
			volume:		getters.desiredVolume,
		}),


		// LOCAL TRACKS
		currentTrack:  (state, getters, rootState, rootGetters) => {
			if (isInstanceOf(state.currentTrackSubscription, Subscription, 'Subscription')) {
				return one(rootGetters.getLiveData(state.currentTrackSubscription));
			}
			return null;
		},
		startingTrack: (state, getters, rootState, rootGetters) => {
			if (isInstanceOf(state.startingTrackSubscription, Subscription, 'Subscription')) {
				return one(rootGetters.getLiveData(state.startingTrackSubscription));
			}
			return null;
		},
	}),

	createUniversalModule(sourceInstances) {
		// Add source instance playback modules as sub-module of the universal module.
		const modules = {};
		for (const sourceInstance of sourceInstances) {
			modules[sourceInstance.name] = {
				...sourceInstance.playback,
				namespaced: true,
			};
		}

		return new Playback({
			//G Main playback module for app.
			modules,

			state:     this.universalState(sourceInstances),
			actions:   this.universalActions(),
			mutations: this.universalMutations(),
			getters:   this.universalGetters(),
		});
	},
});
