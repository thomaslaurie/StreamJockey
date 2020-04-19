import {
	dynamicClass,
	define,
	rules,
} from './utility/index.js';
import Source from './source.base.js';
import Playback from './playback.js';
import Subscription from './subscription.base.js';

import {
	Start, 
	Toggle, 
	Seek, 
	Volume,
} from './commands.js';

const Playback = dynamicClass.augment(Source, {
	instance({
		//TODO create strict defaults
		auth,
		request,
		getRequestToken,
		search,
		player,
		loadPlayer,
		playback,
	} = {}) {
		playback.state.source = this;

		//C push own playback module to main playback modules
		Playback.module.modules[this.name] = {
			...playback,
			namespaced: true,
		};

		return {
			auth,
			request,
			getRequestToken,
			search,
			player,
			loadPlayer,
			playback,
		};
	},
});

Playback.module = new sj.Playback({
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

		// PLAYBACK FUNCTIONS //----------
		//G the main playback module's commands, in addition to mappings for basic playback functions, should store all the higher-level, behavioral playback functions (like toggle)
		// BASIC
		async start({dispatch}, track) {
			return await dispatch('pushCommand', new Start({
				source: track.source, //! uses track's source
				track,
			}));
		},
		async pause({dispatch, getters: {desiredSource: source}}) {
			return await dispatch('pushCommand', new Toggle({
				source, //! other non-start basic playback functions just use the current desiredPlayback source
				isPlaying: false,
			}));
		},
		async resume({dispatch, getters: {desiredSource: source}}) {
			return await dispatch('pushCommand', new Toggle({
				source,
				isPlaying: true,
			}));
		},
		async seek({dispatch, getters: {desiredSource: source}}, progress) {
			return await dispatch('pushCommand', new Seek({
				source,
				progress,
			}));
		},
		async volume({dispatch, getters: {desiredSource: source}}, volume) {
			//TODO volume should change volume on all sources
			return await dispatch('pushCommand', new Volume({
				source,
				volume,
			}));
		},
		// HIGHER LEVEL
		async toggle({dispatch, getters: {desiredSource: source, desiredIsPlaying: isPlaying}}) {
			return await dispatch('pushCommand', new Toggle({
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
		sourceOrBase: (state, getters) => key => {
			if (state.source === null) return Playback.baseState[key];
			else return state[state.source.name][key];
		},
		
		actualSource: (state, getters) => {
			return state.source;
		},
		actualTrack:  (state, getters, rootState, rootGetters) => {
			const sourceOrBaseTrack = getters.sourceOrBase('track');
			if (sourceOrBaseTrack instanceof sj.Track) {
				//C if the source track matches the current or starting track (by sourceId), return the current or starting track instead, so that it may be reactive to any data changes
				if (
					// Ensure track exists, but don't match undefined.
					getters.currentTrack?.sourceId !== undefined &&
					getters.currentTrack.sourceId === sourceOrBaseTrack.sourceId
				) {
					return getters.currentTrack;
				}
				if (
					getters.startingTrack?.sourceId !== undefined &&
					getters.startingTrack.sourceId === sourceOrBaseTrack.sourceId
				) {
					return getters.startingTrack;
				}
			}
			
			return sourceOrBaseTrack;
		},
		actualIsPlaying: (state, getters) => getters.sourceOrBase('isPlaying'),
		actualProgress:  (state, getters) => {
			let progress = getters.sourceOrBase('progress');

			if (
				rules.object.test(state.source) &&
				rules.object.test(state[state.source.name]) &&
				rules.object.test(state[state.source.name].track) && 
				state[state.source.name].isPlaying
			) {
				//C if playing, return inferred progress
				const elapsedTime = state.clock - state[state.source.name].timestamp;
				const elapsedProgress = elapsedTime / state[state.source.name].track.duration;
				progress = clamp(state[state.source.name].progress + elapsedProgress, 0, 1);
			}

			return progress;
		},
		actualVolume:   (state, getters) => getters.sourceOrBase('volume'),

		actualPlayback:	(state, getters) => ({
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
			if (state.setCommand?.[key] !== undefined) {
				value = state.sentCommand[key];
			}
			//C then if defined, each queuedCommand
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
			if (state.currentTrackSubscription instanceof Subscription) {
				return one(rootGetters.getLiveData(state.currentTrackSubscription));
			} else {
				return null;
			}
		},
		startingTrack: (state, getters, rootState, rootGetters) => {
			if (state.startingTrackSubscription instanceof Subscription) {
				return one(rootGetters.getLiveData(state.startingTrackSubscription));
			} else {
				return null;
			}
		},
	},
});

export default Playback;