import {
	dynamicClass,
	define, //TODO check if some properties can be made constant
} from './utility/index.js';

export default dynamicClass.create('Playback', {
	instance({
		// NEW
		state,
		actions,
		mutations,
		getters,
		modules,
	}) {
		//C state has to be initialized here because it needs an instanced reference to a state object (cannot pass one as the default or else all instances will refer to the same state object)
		//C because of how constructor defaults work with references, the instanced defaults have to be created in afterInitialize()

		return {
			state:       {...this.constructor.baseState,     ...state},
			actions:     {...this.constructor.baseActions,   ...actions},
			mutation:    {...this.constructor.baseMutations, ...mutations},
			baseGetters: {...this.constructor.baseGetters,   ...getters},
			baseModules: {...this.constructor.baseModules,   ...modules},
		};
	},
	static: () => ({
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

				// console.log('reached');

				// return new sj.Success({
				// 	origin: 'sj.Playback.baseActions.start()',
				// 	reason: 'start command completed',
				// });
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
