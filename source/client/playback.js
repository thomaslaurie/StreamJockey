/* TODO
	behavior: playing in spotify manually, then start up app, previewing a song updates the playback to the current already playing song not the clicked preview song

	sj.Toggle: toggle or resume & pause or both? they all deal with one playback property but toggle out of all the commands is the only one that is dependant on an existing state - how to classify this? when do resume & pause merge into toggle - source, command, or playback level?

	Not sure if the redundancy in the pause/resume actions is necessary? (They both pause all other sources.)
*/

import {
	Track,
} from './entities/index.js';
import {
	Subscription,
} from '../shared/live-data.js';
import {
	asyncMap,
	clamp,
	wait,
	one,
	repeat,
	rules,
	define,
} from '../shared/utility/index.js';
import {
	CommandQueue,
	PlaybackState,
	Start,
	Toggle,
	Seek,
	Volume,
} from './commands.js';
import {MultipleErrors} from '../shared/errors/index.js';

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
		define.vueConstant(this, {
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
		commandQueue: null,

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
		//G //! As a whole, playback actions should be synchronous. The promise they return indicates if their underlying command has been achieved or failed.
		//G Their triggers may be asynchronous.

		pushCommand(context, command) {
			/* //! This action should be synchronous and be used synchronously.
				//R
				This is partly because the push action is synchronous. (The promise returned instead indicates when the command has completed.)
				This is partly because if two actions are called synchronously where the second depends on the queued command of the first. If the underlying pushCommand action is called asynchronously, it will be executed after the second action, resulting in both actions using the same original state.
				//? Not even sure if converting the CommandQueue to Vuex would solve this. It seems to be an issue with JavaScript's order of execution for synchronous vs asynchronous nested functions.
				Even if the pushCommand function was refactored to return a promise when the command is pushed so that each push itself could be awaited. This would not be compatible with event-listeners (which require a synchronously nested handler) and would require another queue 'above' the asynchronous layer.
				Moving the queue above the Vuex store isn't a good idea because this 'desired' state is heavily depended upon.
			*/

			// Initialize the command queue if it isn't.
			if (!(context.state.commandQueue instanceof CommandQueue)) {
				context.commit('setCommandQueue', new CommandQueue({
					getCurrentState: () => new PlaybackState(context.getters.actualPlayback),
				}));
			}

			return context.state.commandQueue.pushCommand(command);
		},

		// PLAYBACK FUNCTIONS
		//G the main playback module's commands, in addition to mappings for basic playback functions, should store all the higher-level, behavioral playback functions (like toggle)
		async initPlayer(context, source) {
			// Load the player if not loaded.
			if (context.state[source.name].player === null) {
				await context.dispatch(`${source.name}/loadPlayer`);
			}
		},

		// BASIC
		// IDEMPOTENT ?
		start(context, track) {
			const {dispatch, state: {sourceInstances}} = context;
			return dispatch('pushCommand', new Start({
				state: new PlaybackState({
					source: track.source,
					track,
				}),
				async trigger() {
					//TODO Extract this if possible.
					await dispatch('initPlayer', track.source);

					// Pause all.
					await asyncMap(sourceInstances, async (source) => {
						if (context.state[source.name].player !== null) {
							await context.dispatch(`${source.name}/pause`);
						}
					}).catch(MultipleErrors.throw);

					// Change startingTrackSubscription to subscription of the new track.
					context.commit('setStartingTrackSubscription', await context.dispatch('resubscribe', {
						subscription: context.state.startingTrackSubscription,

						Entity: Track,
						query: {id: track.id},
						options: {}, //TODO //?
					}, {
						//L https://vuex.vuejs.org/guide/modules.html#accessing-global-assets-in-namespaced-modules
						root: true,
					}));

					// Start target.
					await context.dispatch(`${track.source.name}/start`, track);

					// Transfer subscription from starting to current.
					context.commit('setCurrentTrackSubscription', context.state.startingTrackSubscription);
					context.commit('setStartingTrackSubscription', null);

					// Change source.
					//R Source is the only playback state property set here because all other properties are internal to their respective source's Vuex store and managed by their own /start action.
					context.commit('setSource', track.source);
				},
			}));
		},
		pause(context) {
			const {dispatch, state: {sourceInstances}} = context;
			const desiredSource = context.state.commandQueue.getDesiredState().source;
			return dispatch('pushCommand', new Toggle({
				state: new PlaybackState({
					//TODO //! Create an 'all sources' default for toggle.
					isPlaying: false,
				}),
				async trigger() {
					await dispatch('initPlayer', desiredSource);

					// Pause all sources if their player is initialized.
					await asyncMap(sourceInstances, async (otherSource) => {
						if (context.state[otherSource.name].player !== null) {
							await context.dispatch(`${otherSource.name}/pause`);
						}
					}).catch(MultipleErrors.throw);
				},
			}));
		},
		resume(context) {
			const {dispatch, state: {sourceInstances}} = context;
			const desiredSource = context.state.commandQueue.getDesiredState().source;
			return dispatch('pushCommand', new Toggle({
				state: new PlaybackState({
					source: desiredSource,
					isPlaying: true,
				}),
				async trigger() {
					await dispatch('initPlayer', desiredSource);

					await asyncMap(sourceInstances, async (otherSource) => {
						if (otherSource === desiredSource) {
							// Resume target if resuming.
							await context.dispatch(`${otherSource.name}/resume`);
						} else if (context.state[otherSource.name].player !== null) {
							// Pause the rest.
							await context.dispatch(`${otherSource.name}/pause`);
						}
					}).catch(MultipleErrors.throw);
				},
			}));
		},
		seek(context, progress) {
			const {dispatch} = context;
			const desiredSource = context.state.commandQueue.getDesiredState().source;
			return dispatch('pushCommand', new Seek({
				state: new PlaybackState({
					source: desiredSource,
					progress,
				}),
				async trigger() {
					await dispatch('initPlayer', desiredSource);

					await context.dispatch(`${desiredSource.name}/seek`, progress);
				},
			}));
		},
		volume(context, volume) {
			const {dispatch, state: {sourceInstances}} = context;
			const desiredSource = context.state.commandQueue.getDesiredState().source;
			return dispatch('pushCommand', new Volume({
				state: new PlaybackState({
					source: desiredSource,
					volume,
				}),
				async trigger() {
					await dispatch('initPlayer', desiredSource);

					// Adjust volume on all sources.
					await asyncMap(sourceInstances, async (otherSource) => {
						if (context.state[otherSource.name].player !== null) {
							await context.dispatch(`${otherSource.name}/volume`, volume);
						}
					}).catch(MultipleErrors.throw);
				},
			}));
		},

		// HIGHER LEVEL
		// NON-IDEMPOTENT
		toggle(context) {
			//! //R Desired state cannot be accessed by a Vuex getter because its non-reactive data and isn't visible to Vuex.
			const desiredIsPlaying = context.state.commandQueue.getDesiredState().isPlaying;
			return desiredIsPlaying
				? context.dispatch('pause')
				: context.dispatch('resume');
		},
		// The playback module has no knowledge of 'playlists', anything that depends on that should pass that info in or handled externally.
		startOffset(context, [offset, playlistTracks]) {
			rules.integer.validate(offset);
			const tracks = playlistTracks ?? []; // Null may be passed here.

			const desiredTrack = context.state.commandQueue.getDesiredState().track;
			const desiredIndex = tracks.findIndex(track => track.id === desiredTrack?.id);

			// Defaults to null if desired track or desired offset track aren't found.
			const offsetDesiredTrack = (desiredIndex === -1)
				? null
				: (tracks[desiredIndex + offset] ?? null);

			return context.dispatch('start', offsetDesiredTrack);
		},
		next(context, playlistTracks) {
			return context.dispatch('startOffset', [1, playlistTracks]);
		},
		prev(context, playlistTracks) {
			return context.dispatch('startOffset', [-1, playlistTracks]);
		},

		// CLOCK
		startClock(context) {
			context.dispatch('stopClock');
			const clockRefreshRate = 100;
			const id = setInterval(() => context.commit('updateClock'), clockRefreshRate);
			context.commit('setClockIntervalId', id);
		},
		stopClock(context) {
			clearInterval(context.state.clockIntervalId);
			context.commit('setClockIntervalId', null);
		},
	}),
	universalMutations: () => ({
		setCommandQueue(state, commandQueue) {
			state.commandQueue = commandQueue;
		},

		// CLOCK
		updateClock(state) {
			state.clock = Date.now();
		},
		setClockIntervalId(state, id) {
			state.clockIntervalId = id;
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

		commandQueue: state => state.commandQueue,

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
			// If the source track matches the current or starting track (by sourceId), return the current or starting track instead, so that it may be reactive to any data changes.
			const sourceOrBaseTrack = getters.sourceOrBase('track');
			if (sourceOrBaseTrack?.sourceId === getters.currentTrack?.sourceId) {
				return getters.currentTrack;
			}
			if (sourceOrBaseTrack?.sourceId === getters.startingTrack?.sourceId) {
				return getters.startingTrack;
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

		// LOCAL TRACKS
		currentTrack:  (state, getters, rootState, rootGetters) => {
			if (state.currentTrackSubscription instanceof Subscription) {
				return one(rootGetters.getLiveData(state.currentTrackSubscription));
			}
			return null;
		},
		startingTrack: (state, getters, rootState, rootGetters) => {
			if (state.startingTrackSubscription instanceof Subscription) {
				return one(rootGetters.getLiveData(state.startingTrackSubscription));
			}
			return null;
		},
	}),

	createUniversalModule(playbacks) {
		// Add source instance playback modules as sub-module of the universal module.
		const modules = {};
		const sourceInstances = [];
		for (const playback of playbacks) {
			const source = playback.state.source;
			modules[source.name] = {
				...playback,
				namespaced: true,
			};
			sourceInstances.push(source);
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
