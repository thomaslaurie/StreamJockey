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

// builtin

// internal
import sj from './global.mjs';


// external
//import './spotify-player.js'; //! creates window.onSpotifyWebPlaybackSDKReady and window.Spotify, this is supposed to be imported dynamically from https://sdk.scdn.co/spotify-player.js, it may change without notice, wont work here because onSpotifyWebPlaybackSDKReady is undefined
//import SpotifyWebApi from './spotify-web-api.mjs'; //L api endpoint wrapper: https://github.com/jmperez/spotify-web-api-js


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   


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
		async edit() {
			return await this.constructor.edit(this);
		},
		async remove() {
			return await this.constructor.remove(this);
		},
	}),
	staticProperties: parent => ({
		async add(query) {
			return await sj.request('POST', `${sj.API_URL}/${this.table}`, sj.shake(sj.any(query), this.filters.addIn));
		},
		async get(query) {
			return await sj.request('GET', `${sj.API_URL}/${this.table}?${sj.encodeList(sj.shake(sj.any(query), this.filters.getIn))}`);
		},
		async edit(query) {
			return await sj.request('PATCH', `${sj.API_URL}/${this.table}`, sj.shake(sj.any(query), this.filters.editIn));
		},
		async remove(query) {
			return await sj.request('DELETE', `${sj.API_URL}/${this.table}`, sj.shake(query, this.filters.removeIn));
		},
	}),
});

// PLAYBACK //G tightly integrated with VueX
sj.Action = sj.Base.makeClass('Action', sj.Base, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			if (!sj.isType(accessory.options.source, sj.Source)) throw new sj.Error({
				origin: 'sj.Action.beforeInitialize()',
				reason: 'sj.Action instance.source must be an sj.Source',
				content: accessory.options.source,
			});
		},
		defaults: {
			source: undefined,
		},
	}),
	prototypeProperties: parent => ({
		identicalCondition(otherAction) {
			return sj.isType(otherAction, Object) 
			//C these should essentially be the action-specific state defaults
			&& otherAction.source === this.source;
		}, 
		collapseCondition(otherAction) {
			return this.identicalCondition(otherAction);
		},
		annihilateCondition: otherAction => false,
		trigger: async () => {
			throw new sj.Error({
				origin: 'sj.Action.trigger()',
				reason: 'no trigger function has been set for this action',
			});
		},
	}),
});
sj.Start = sj.Base.makeClass('Start', sj.Action, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
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
		identicalCondition(otherAction) {
			return parent.prototype.identicalCondition.call(this, otherAction) 
			&& sj.isType(otherAction.track, sj.Track)
			&& otherAction.track.sourceId === this.track.sourceId //! compare tracks by their sourceId not by their reference
			&& otherAction.isPlaying === this.isPlaying
			&& otherAction.progress === this.progress;
		},
		collapseCondition(otherAction) {
			//C extend by collapsing sj.Resume, sj.Pause, & sj.Seek too
			const c = otherAction.constructor;
			return parent.collapseCondition.call(this, otherAction) || c === sj.Resume || c === sj.Pause || c === sj.Seek;
		},
		async trigger({dispatch, commit}) {
			//C pause all
			await sj.asyncForEach(sj.Source.instances, async source => {
				await dispatch(`${source.name}/pause`);
			});
			//C start target
			await dispatch(`${this.source.name}/start`, this.track);

			//C change source
			commit('setSource', this.source);
			commit(`${this.source.name}/setPlayback`, {
				track: this.track,
				isPlaying: true,
				progress: 0,
			});
		},
	}),
});
sj.Toggle = sj.Base.makeClass('Toggle', sj.Action, {
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//C validate
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
		identicalCondition(otherAction) {
			return parent.prototype.identicalCondition.call(this, otherAction)
			&& otherAction.isPlaying === this.isPlaying;
		},
		annihilateCondition(otherAction) {
			return parent.prototype.identicalCondition.call(this, otherAction)
			&& otherAction.isPlaying === !this.isPlaying
			&& otherAction.constructor === this.constructor; //! both must be sj.Toggle	
		},
		async trigger({dispatch, commit}) {
			if (this.isPlaying) {
				//C resume target source, pause other sources
				console.log('resume toggle');
				await sj.asyncForEach(sj.Source.instances, async source => {
					if (source === this.source) {
						await dispatch(`${source.name}/resume`);
						commit(`${source.name}/setPlayback`, {
							isPlaying: true,
						});
					} else {
						await dispatch(`${source.name}/pause`);
						commit(`${source.name}/setPlayback`, {
							isPlaying: false,
						});
					}
				});
			} else {
				//C pause all
				console.log('pause toggle');
				await sj.asyncForEach(sj.Source.instances, async source => {
					await dispatch(`${source.name}/pause`);
					commit(`${source.name}/setPlayback`, {
						isPlaying: false,
					});
				});
			}
		},
	}),
});
sj.Seek = sj.Base.makeClass('Seek', sj.Action, {
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//C validate
			if (0 <= options.progress && options.progress <= 1) throw new sj.Error({
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
		identicalCondition(otherAction) {
			return parent.prototype.identicalCondition.call(this, otherAction)
			&& otherAction.progress === this.progress;
		},
		async trigger({dispatch}) {
			await dispatch(`${this.source.name}/seek`, this.progress);
			commit(`${this.source.name}/setPlayback`, {
				progress: this.progress,
			});
		},
	}),
});
sj.Volume = sj.Base.makeClass('Volume', sj.Action, {
	constructorParts: parent => ({
		beforeInitialize({options}) {
			//C validate
			if (0 <= options.volume && options.volume <= 1) throw new sj.Error({
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
		identicalCondition(otherAction) {
			return parent.prototype.identicalCondition.call(this, otherAction)
			&& otherAction.volume === this.volume;
		},
		async trigger({dispatch}) {
			//C adjust volume on all sources
			await sj.asyncForEach(sj.Source.instances, async source => {
				await dispatch(`${source.name}/volume`, this.volume);
				commit(`${source.name}/setPlayback`, {
					volume: this.volume,
				});
			});
		},
	}),
});

sj.Playback = sj.Base.makeClass('Playback', sj.Base, {
	constructorParts(parent) { return {
		beforeInitialize() {
			//C must be initialized here because the property requires a reference to 'this'
			this.state = this.constructor.state;
		},
		defaults: {
			// NEW
			state: this.state,
			actions: {},
			mutations: {},
			getters: {},
			modules: {},
		},
	}; },
	staticProperties: parent => ({
		state: {
			source: null,

			definite: { //C for the literal state received from the source API
				track: null,
				isPlaying: false,
				progress: 0,
				volume: 1,

				timestamp: Date.now(),
			},
			inferred: { //C for all inferred values made by the app for a smoother/more-efficient experience
				track: null,
				isPlaying: false,
				progress: 0,
				volume: 1,

				intervalId: null,
			},
		},
	}),
});
sj.Playback.module = new sj.Playback({
	//G main playback module for app
	modules: {},

	state: {
		/* Old Queue Thought Process
				//  //R
			// 	Problem:	Starting a spotify and youtube track rapidly would cause both to play at the same time
			// 	Symptom:	Spotify then Youtube -> checkPlayback() was setting spotify.isPlaying to false immediately after spotify.start() resolved
			// 				Youtube then Spotify -> youtube.pause() would not stick when called immediately after youtube.start() resolved
			// 	Cause:		It was discovered through immediate checkPlayback() calls that the api playback calls don't resolve when the desired playback is achieved but only when the call is successfully received
			// 	Solution:	Playback functions need a different way of verifying their success if they are going to work how I originally imagined they did. Try verifying playback by waiting for event listeners?
			// 				Putting a short delay between sj.Playback.queue calls gives enough time for the apis to sort themselves out.

			TODO checkPlaybackState every action just like before, find a better way
				// TODO in queue system, when to checkPlaybackState? only when conflicts arise?
				// (maybe also: if the user requests the same thing thats happening, insert a check to verify that the playback information is correct incase the user has more recent information), 

			Action Failure Handling 
				// 	!!! old, meant for individual action types

				// send action, change pendingAction to true, wait
				// 	if success: change pendingAction to false
				// 		if queuedAction exists: change action to queuedAction, clear queued action, repeat...
				// 		else: nothing
				// 	if failure: 
				// 		if queuedAction exists: change pendingAction to false, change action to queuedAction, clear queued action, repeat... // pendingActions aren't desired if queuedActions exist, and therefore are only waiting for resolve to be overwritten (to avoid sending duplicate requests)
				// 		else: trigger auto-retry process
				// 			if success: repeat...
				// 			if failure: change pendingAction to false, trigger manual-retry process which basically sends a completely new request...
		*/
		actionQueue: [],
		sentAction: null,

		source: null,
		
		//TODO figure out how volume should work since it is consistent across sources

		// actualPlayback: {
		// 	source: null,
		// 	track: null,
		// 	isPlaying: false,
		// 	progress: 0,
		// 	volume: 1,
		// 	timestamp: Date.now(),
		// }, //Object.create(sj.Playback.state), //? why does this cause issues? (pause then play again)
	},
	actions: {
		//C dispatched playback actions should record for what desired source they were created for
		async start({dispatch, commit}, track) {
			await dispatch('pushAction', new sj.Start({
				source: track.source,
				track,
			}));
		},
		async pause({dispatch, getters: {desiredPlayback: {source}}}) {
			await dispatch('pushAction', new sj.Toggle({
				source,
				isPlaying: false,
			}));
		},
		async resume({dispatch, getters: {desiredPlayback: {source}}}) {
			await dispatch('pushAction', new sj.Toggle({
				source,
				isPlaying: true,
			}));
		},

		async toggle({dispatch, getters: {desiredPlayback: {source, isPlaying}}}) {
			await dispatch('pushAction', new sj.Toggle({
				source,
				isPlaying: !isPlaying,
			}));
		},
		async seek({dispatch, getters: {desiredPlayback: {source}}}, progress) {
			await dispatch('pushAction', new sj.Seek({
				source,
				progress,
			}));
		},
		async volume({dispatch, getters: {desiredPlayback: {source}}}, volume) {
			await dispatch('pushAction', new sj.Volume({
				//TODO
				source,
				volume,
			}));
		},

		async checkPlayback({dispatch}) {
			await sj.asyncForEach(sj.Source.instances, async source => {
				await dispatch(`${source.name}/checkPlayback`);
			});
		},

		async pushAction(context, action) {
			let push = true;

			//C remove redundant actions if necessary
			const compact = function (i) {
				if (i >= 0) {
					//R collapse is required to keep the new action rather than just leaving the existing because sj.Start collapses different actions than itself
					if (action.collapseCondition(context.state.actionQueue[i])) {
						push = true;
						context.commit('removeQueuedAction', i);
						compact(i-1);
					} else if (action.annihilateCondition(context.state.actionQueue[i])) {
						push = false;
						context.commit('removeQueuedAction', i);
						compact(i-1);
					} else {
						return;
					}
				}
			};
			compact(context.state.actionQueue.length-1);

			//C don't push new action if is identical to a sent action
			if (context.state.sentAction !== null && action.identicalCondition(context.state.sentAction)) push === false;
			//C don't push new action if no sent action exists and is identical to the actual playback 
			if (context.state.sentAction === null && action.identicalCondition(context.getters.actualPlayback)) push === false;

			//C push action the queue and restart the queue if not already processing
			if (push) context.commit('addQueuedAction', action);
			context.dispatch('nextAction');
		},
		async nextAction(context) {
			//C return if action is still processing or if no queued actions exist
			if (context.state.sentAction !== null || context.state.actionQueue.length <= 0) return;


			//C move the action from the queue to sent
			context.commit('setSentAction', context.state.actionQueue[0]);
			context.commit('removeQueuedAction', 0);
			
			//C trigger the action
			await context.state.sentAction.trigger(context); //TODO what happens on failure?
			//TODO set timestamp on update of source playback state

			console.log('actualPlayback after:', sj.image(context.getters.actualPlayback));

			//C mark the sent action as finished, start next action
			context.commit('removeSentAction');
			context.dispatch('nextAction');
		},
	},
	mutations: {
		setSource(state, source) {
			state.source = source;
		},
		setDesiredPlayback(state, playbackValues) {
			Object.assign(state.desiredPlayback, playbackValues);
		},
		// setActualPlayback(state, playbackValues) {
		// 	Object.assign(state.actualPlayback, playbackValues);
		// },
		addQueuedAction(state, action) {
			state.actionQueue.push(action);
		},
		removeQueuedAction(state, index) {
			state.actionQueue.splice(index, 1);
		},
		setSentAction(state, action) {
			state.sentAction = action;
		},
		removeSentAction(state) {
			state.sentAction = null;
		},
	},
	getters: {
		actualPlayback(state) {
			//C get current source state or null state
			let s;
			if (state.source !== null) s = state[state.source.name];
			else s = Object.create(sj.Playback.state);

			//C remove unneeded state properties
			const {intervalId, ...inferredState} = s.inferred;
			return inferredState;
		},
		desiredPlayback: ({sentAction, actionQueue}, {actualPlayback}) => Object.assign({}, actualPlayback, sentAction, ...actionQueue),
	},
});

// SOURCE
sj.Source.augmentClass({
	constructorParts(parent) {
		const oldAfterInitialize = sj.Source.afterInitialize;

		return {
			defaults: {
				auth: undefined,
				getAccessToken: undefined,
				request: undefined,
	
	
				player: undefined,
				loadPlayer: undefined,
				playback: new sj.Playback(),
			},
			afterInitialize() {
				oldAfterInitialize.call(this);

				this.playback.state.source = this;
	
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
	return await sj.request('POST', `${sj.API_URL}/session`, new sj.User(user));
	//TODO reconnect socket subscriptions to update subscriber info
};
sj.session.get = async function () {
    return await sj.request('GET', `${sj.API_URL}/session`);
};
sj.session.logout = async function () {
	return await sj.request('DELETE', `${sj.API_URL}/session`);
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
*/

// global source objects
sj.spotify = new sj.Source({
	name: 'spotify',
	
	//TODO make apiReady and playerReady checks

	async auth() {
		//C prompts the user to accept permissions in a new window, then receives an auth code from spotify
		/* //R
			this was split in to multiple parts on the client side to have an automatically closing window
			//L https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
			//! cannot load this url in an iframe as spotify has set X-Frame-Options to deny, loading this in a new window is probably the best idea to not interrupt the app
	
		*/
	
		//C request url
		let requestCredentials = await sj.request('GET', `${sj.API_URL}/spotify/authRequestStart`);
	
		//C open spotify auth request window
		//L https://www.w3schools.com/jsref/met_win_open.asp
		let authWindow = window.open(requestCredentials.authRequestURL);
	
		//C listen for response from spotify
		//TODO there is a chance to miss the event if the window is resolved before the fetch request reaches the server
		let authCredentials = await sj.request('POST', `${sj.API_URL}/spotify/authRequestEnd`, requestCredentials);
	
		//C automatically close window when data is received
		authWindow.close();
	
		//C exchange auth code for tokens
		let tokens = await sj.request('POST', `${sj.API_URL}/spotify/exchangeToken`, authCredentials);
		this.credentials.accessToken = tokens.accessToken;
		this.credentials.expires = tokens.accessToken;
		this.credentials.scopes = tokens.scopes; //TODO scopes wont be refreshed between sessions
	
		return new sj.Success({
			origin: 'sj.spotify.auth()',
			message: 'authorized spotify',
		});
		
		//TODO there needs to be a scopes (permissions) check in here somewhere
	
		/* old
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
	async getAccessToken() {
		//C gets the api access token, handles all refreshing, initializing, errors, etc.
		//C doing this here is useful because it removes the need to check on init, and only prompts when it is needed
	
		//TODO must respond to denials by spotify too
	
		//C refresh
		let that = this;
		let refresh = async function (that) {
			let result = await sj.request('GET', `${sj.API_URL}/spotify/refreshToken`).catch(sj.andResolve);
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
		if (sj.isEmpty(this.credentials.accessToken) || this.credentials.expires <= Date.now()) {
			await refresh(that);
		}
		//C if token is soon to expire, refresh in the background, return the existing token
		if (this.credentials.expires <= Date.now() + this.refreshBuffer) {
			refresh(that);
		}
	
		return this.credentials.accessToken;
	},
	async request(method, path, body) {
		//C wrapper for sj.request() meant for spotify-web-api requests, automatically gets the accessToken and applies the correct header, and url prefix
		let urlPrefix = 'https://api.spotify.com/v1';
		let token = await this.getAccessToken();
		let header = {
			...sj.JSON_HEADER,
			Authorization: `Bearer ${token}`,
		};
	
		return await sj.request(method, `${urlPrefix}/${path}`, body, header);
	},


	async loadPlayer() {
		let that = this;
		let result = await new Promise((resolve, reject) => {
			window.onSpotifyWebPlaybackSDKReady = function () { // this can be async if needed
				const player = new window.Spotify.Player({
					name: 'StreamJockey', //TODO make global //C "The name of the Spotify Connect player. It will be visible in other Spotify apps."
					getOAuthToken: async callback => {
						let token = await that.getAccessToken();
						callback(token);
					},
					//volume: 1, //C initialize with a custom volume (default is 1)
				});
				
	
				//C events
				//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#events
				player.on('ready', async ({device_id}) => {
					//C 'Emitted when the Web Playback SDK has successfully connected and is ready to stream content in the browser from Spotify.'
					//L returns a WebPlaybackPlayer object with just a device_id property: https://developer.spotify.com/documentation/web-playback-sdk/reference/#object-web-playback-player
	
					//L transfer playback: https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-transfer-a-users-playback
					await that.request('PUT', 'me/player', {
						device_ids: [device_id],
						play: true, //? check desired behavior ('ensure playback happens on new device' or 'keep the current playback state')
					}).catch(rejected => {
						reject(new sj.Error({
							log: true,
							//code: JSON.parse(error.response).error.status,
							origin: 'spotify.loadPlayer()',
							message: 'spotify player could not be loaded',
							//reason: JSON.parse(error.response).error.message,
							content: rejected,
						}));
					});
	
					resolve(new sj.Success({
						log: true,
						origin: 'spotify.loadPlayer()',
						message: 'spotify player loaded',
						content: player,
					}));
	
					/* old
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
					*/
				});
				player.on('not_ready', ({device_id}) => {
					//? don't know what to do here
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
					/* 
						//C emits a WebPlaybackState object when the state of the local playback has changed. It may be also executed in random intervals.
						//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#object-web-playback-state
						{
							context: {
								uri: 'spotify:album:xxx', // The URI of the context (can be null)
								metadata: {},             // Additional metadata for the context (can be null)
							},
							disallows: {                // A simplified set of restriction controls for
								pausing: false,           // The current track. By default, these fields
								peeking_next: false,      // will either be set to false or undefined, which
								peeking_prev: false,      // indicates that the particular operation is
								resuming: false,          // allowed. When the field is set to `true`, this
								seeking: false,           // means that the operation is not permitted. For
								skipping_next: false,     // example, `skipping_next`, `skipping_prev` and
								skipping_prev: false      // `seeking` will be set to `true` when playing an
														// ad track.
							},
							paused: false,  // Whether the current track is paused.
							position: 0,    // The position_ms of the current track.
							repeat_mode: 0, // The repeat mode. No repeat mode is 0,
											// once-repeat is 1 and full repeat is 2.
							shuffle: false, // True if shuffled, false otherwise.
							track_window: {
								current_track: <WebPlaybackTrack>,                              // The track currently on local playback
								previous_tracks: [<WebPlaybackTrack>, <WebPlaybackTrack>, ...], // Previously played tracks. Number can vary.
								next_tracks: [<WebPlaybackTrack>, <WebPlaybackTrack>, ...]      // Tracks queued next. Number can vary.
							}
						}
					*/
		
					//console.log('STATE: ', state);
		
					that.playback.timestamp = state.timestamp;
					that.playback.isPlaying = !state.paused;
					that.playback.progress = state.position;
		
					//TODO check these
					that.playback.track = {
						source: that,
						sourceId: state.track_window.current_track.id,
						artists: [],
						title: state.track_window.current_track.name,
						duration: state.track_window.current_track.duration_ms,
					}
					// fill artists
					state.track_window.current_track.artists.forEach(function (artist, i) {
						that.playback.track.artists[i] = artist.name;
					});
				});
				player.on('playback_error', ({message}) => {
					//TODO this should be a listener, and not resolve or reject
				});
	
	
				//C connect player
				player.connect().then(resolved => {
					//C 'returns a promise with a boolean for whether or not the connection was successful'
					//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-connect
					//! do not resolve here, the player will trigger the 'ready' event when its truly ready
					if (!resolved) {
						reject(new sj.Error({
							log: true,
							origin: 'spotify.loadPlayer()',
							message: 'spotify player failed to connect',
							reason: 'spotify.connect() failed',
						}));
					}
				}, rejected => {
					//! a rejection shouldn't be possible here
					reject(new sj.Error({
						log: true,
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
			}
	
			//C dynamic import spotify's sdk
			//! I downloaded this file for module use, however spotify says to import from the url: https://sdk.scdn.co/spotify-player.js
			import(/* webpackChunkName: 'spotify-player' */ `./spotify-player.js`);
		});

		return result;
	
		/* old
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

	playback: new sj.Playback({
		actions: {
			async startInfer(context) {
				await context.dispatch('stopInfer');

				const intervalId = setInterval(() => {
					const elapsedTime = Date.now() - context.state.definite.timestamp;
					const elapsedProgress = elapsedTime / context.state.definite.track.duration;
					const inferredProgress = sj.clamp(context.state.definite.progress + elapsedProgress, 0, 1);
					context.commit('setInferredState', {progress: inferredProgress});
				}, 100); //TODO progress update rate
				
				context.commit('setInferredState', {intervalId});
			},
			async stopInfer(context) {
				clearInterval(context.state.inferred.intervalId);
				context.commit('setPlayback', {intervalId: null});
			},

			async checkPlayback({commit, state, state: {source}}) {
				//TODO test that this works if no track is loaded

				//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-getvolume
				const currentVolume = await source.player.getVolume(); 
				//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-getcurrentstate
				const currentState = await source.player.getCurrentState().catch(rejected => {
					throw new sj.Error({
						log: true,
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.checkPlayback()',
						message: 'failed to check spotify playback state',
						//reason: JSON.parse(rejected.response).error.message,
						content: rejected,
					});
				});
				//C shorthand
				const t = currentState.track_window.current_track; 
				const formattedState = {
					track: new sj.Track({
						source: source,
						sourceId: t.id,
						name: t.name,
						duration: t.duration_ms,
						artists: t.artists.map(artist => artist.name),
						//TODO link: t.uri,
					}),
					isPlaying: !currentState.paused,
					progress: currentState.position / t.duration_ms,
					volume: currentVolume,
				};
	
				commit('setDefiniteState', {...formattedState, timestamp: currentState.timestamp});
				commit('setInferredState', formattedState);
	
				return new sj.Success({
					log: true,
					origin: 'spotify module action - checkPlayback()',
					message: 'spotify playback checked',
					content: state.definite,
				});
			},
			
			//G//TODO if a source can't handle redundant requests (like pause when already paused) then a filter needs to be coded into the function itself - ie all the methods should be idempotent (toggle functionality is done client-side so that state is known)
			//TODO probably put state updates in here too
			async start({dispatch, state: {source}}, track) {
				await source.request('PUT', 'me/player/play', {
					uris: [`spotify:track:${track.sourceId}`],
				}).catch(rejected => {
					throw new sj.Error({
						log: true,
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.start()',
						message: 'spotify track could not be started',
						//reason: JSON.parse(rejected.response).error.message,
						content: rejected,
					});
				});
				await dispatch('checkPlayback'); //TODO or should listeners be relied on instead?, also, these are in almost every function, how to DRY ?
				await dispatch('startInfer');
			},
			async pause({state: {source}}) {
				await source.player.pause().catch(rejected => {
					throw new sj.Error({
						log: true,
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.pause()',
						message: 'spotify track could not be paused',
						//reason: JSON.parse(rejected.response).error.message,
						content: rejected,
					});
				});
				await dispatch('checkPlayback');
				await dispatch('stopInfer');
			},
			async resume({state: {source}}) {
				console.log('resume called');
				await source.player.resume().catch(rejected => {
					throw new sj.Error({
						log: true,
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.resume()',
						message: 'spotify track could not be resumed',
						//reason: JSON.parse(rejected.response).error.message,
						content: rejected,
					});
				});
				await dispatch('checkPlayback');
				await dispatch('startInfer');
			},
			async seek({state: {source, duration}}, progress) {
				const ms = progress * duration;
				await source.player.seek(ms).catch(rejected => {
					throw new sj.Error({
						log: true,
						//code: JSON.parse(rejected.response).error.status,
						origin: 'spotify.seek()',
						message: 'spotify track could not be seeked',
						//reason: JSON.parse(rejected.response).error.message,
						content: rejected,
					});
				});
				await dispatch('checkPlayback');
			},
			async volume({state: {source}}, volume) {
				await source.player.setVolume(volume);
				await dispatch('checkPlayback');
			},
		},
		mutations: {
			setDefiniteState(state, playbackValues) {
				Object.assign(state, playbackValues);
			},
			setInferredState(state, playbackValues) {
				Object.assign(state, playbackValues);
			},
		},
	}),
});


//TODO youtube
/*
	sj.youtube = new sj.Source({
		name: 'youtube',
		idPrefix: 'https://www.youtube.com/watch?v=',
	});
*/
// auth
/*
	sj.youtube.auth = async function () {
		//TODO
		return new sj.Error({
			log: true,
			origin: 'youtube.auth()',
			message: 'this function is not yet implemented',
		});
	};
*/
/*
	sj.youtube.loadApi = async function () { //TODO
		// Get Script
		// https://api.jquery.com/jquery.getscript/
		return $.getScript('https://apis.google.com/js/api.js').then(function (data, textStatus, jqXHR) {
			// Load libraries
			// https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiloadlibraries-callbackorconfig
			// original code: https://developers.google.com/youtube/v3/docs/search/list
			return new Promise(function(resolve, reject) {
				gapi.load('client:auth2', {
					callback: function() {
						// Initialize the gapi.client object, which app uses to make API requests.
						// https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientinitargs
						// Promises: https://developers.google.com/api-client-library/javascript/features/promises
						gapi.client.init({
							apiKey: 'AIzaSyA8XRqqzcwUpMd5xY_S2l92iduuUMHT9iY',
							clientId: '575534136905-vgdfpnd34q1o701grha9i9pfuhm1lvck.apps.googleusercontent.com',
							discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
							// at least one scope is needed, this is the bare minimum scope
							scope: 'https://www.googleapis.com/auth/youtube.readonly'
						}).then(function (resolved) {
							resolve(new sj.Success({
								log: true,
								origin: 'youtube.loadApi()',
								message: 'youtube api ready',
							}));
						}, function (rejected) {
							reject(new sj.Error({
								log: true,
								origin: 'youtube.loadApi()',
								message: 'failed to load youtube api',
								reason: 'client initialization failed',
								content: rejected,
							}));
						});
					},
					onerror: function() {
						reject(new sj.Error({
							log: true,
							origin: 'youtube.loadApi()',
							message: 'failed to load youtube libraries',
							reason: 'gapi.load error',
							content: reason,
						}));
					},
					// TODO timeout
					//timeout: 5000, // 5 seconds.
					//ontimeout: function() {
					// Handle timeout.
					//alert('gapi.client could not load in a timely manner!');
				});
			});
		}, function (jqxhr, settings, exception) {
			throw new sj.Error({
				log: true,
				origin: 'youtube.loadApi()',
				message: 'failed to load youtube api',
				reason: exception,
			});
		});
	};
*/
// player
/*
	sj.youtube.loadPlayer = function () { //TODO
		//TODO make this async

		$.getScript('https://www.youtube.com/iframe_api').fail(function (jqxhr, settings, exception) {
			callback(new sj.Error({
				log: true,
				origin: 'youtube.loadPlayer()',
				message: 'failed to load youtube player',
				reason: exception,
				content: exception,
			}));
		});

		// callback
		window.onYouTubeIframeAPIReady = function () {
			// https://developers.google.com/youtube/iframe_api_reference#Playback_status
			// (DOM element, args)
			window.youtubePlayer = new YT.Player('youtubePlayer', {
				height: '100%',
				width: '100%',
				events: {
					onReady: onPlayerReady,
					onStateChange: onPlayerStateChange,
					onError: onPlayerError,
				}
			});
		}

		// player callback
		window.onPlayerReady = function (event) {
			var result = new sj.Success({
				log: true,
				origin: 'youtube.loadPlayer()',
				message: 'youtube player loaded',
			});

			// TODO updatePlayback();
		}

		window.onPlayerStateChange = function (event) {
			// TODO 3 - buffering counts as 'playing' for play/pause but should count as paused for progression, need to figure out out to handle this as right now it always counts as playing

			// playing
			if (event.data === 1 || event.data === 3) {
				youtube.playback.isPlaying = true;
			} else {
				youtube.playback.isPlaying = false;
			}

			// nothing other than playing is given information here, however because the api functions are synchronous (except for the track) could we not just call them here too? even though the actions of play/pause and seeking are infrequent enough to warrant checking every time - theres a triple state change (2, 3, 1) when just seeking so there would have to be check to limit the check to one time

			// progress
			if (event.data === 1 || event.data === 2) {
				youtube.playback.progress = youtubePlayer.getCurrentTime() * 1000;
				youtube.playback.timestamp = Date.now();
			}
		}

		window.onPlayerError = function (event) {
			console.error(event);
		}

		// youtubePlayer.destroy() kills the iframe
	};
*/


//  ███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
//  ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
//  ███████╗█████╗  ███████║██████╔╝██║     ███████║
//  ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
//  ███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
//  ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝

//TODO move these into source / vuex

sj.searchResults = {
	// details
	'term': '',
	'tracksPerSource': 5,
	'page': 0,

	// sources
	'spotify': new sj.Playlist({origin: 'searchResults',}),
	'youtube': new sj.Playlist({origin: 'searchResults',}),

	'all': new sj.Playlist({origin: 'searchResults',}),
};

// search
sj.spotify.search = async function (term) {
	let result = await sj.spotify.request('GET', 'search', {
		q: term,
		//C 'A comma-separated list of item types to search across. Valid types are: album , artist, playlist, and track.'
		type: ['track'].join(','), 
		//C ' An ISO 3166-1 alpha-2 country code or the string from_token. If a country code is specified, only artists, albums, and tracks with content that is playable in that market is returned. Note: Playlist results are not affected by the market parameter. If market is set to from_token, and a valid access token is specified in the request header, only content playable in the country associated with the user account, is returned. Users can view the country that is associated with their account in the account settings. A user must grant access to the user-read-private scope prior to when the access token is issued.
		market: 'from_token',
		//C Maximum number of results to return. Default: 20, Minimum: 1, Maximum: 50, //! Note: The limit is applied within each type, not on the total response. For example, if the limit value is 3 and the type is artist,album, the response contains 3 artists and 3 albums.
		limit: sj.searchResults.tracksPerSource,
		//C The index of the first result to return. Default: 0 (the first result). Maximum offset (including limit): 10,000. Use with limit to get the next page of search results.
		offset: sj.searchResults.tracksPerSource * sj.searchResults.page,
		//C Possible values: audio. If include_external=audio is specified the response will include any relevant audio content that is hosted externally. By default external content is filtered out from responses.
		// include_external: 'audio', 
	});

	return new sj.Playlist({
		origin: 'spotify.search()',
		content: result.tracks.items.map(track => {
			return new sj.Track({
				source: sj.spotify,
				sourceId: track.id,
				name: track.name,
				duration: track.duration_ms,
				link: track.external_urls.spotify,
				artists: track.artists.map(artist => artist.name),
			});
		}),
	});
};

/*
	sj.youtube.search = async function (term) {
		var args = {
			method: 'GET',
			path: '/youtube/v3/search',
			params: {
				// https://developers.google.com/youtube/v3/docs/search/list#parameters
				part: 'snippet',
				type: 'video',

				// min 0, max 50, default 5
				maxResults: sj.searchResults.tracksPerSource,
				// nextPageToken (and prevPageToken) are returned with each search result, fill this in to get to other pages
				//pageToken: token,

				q: term,
			}
		};

		return new Promise(function (resolve, reject) {
			// convert gapi.client.request() to promise
			gapi.client.request(args).then(function (resolved) {
				resolve(resolved);
			}, function (rejected) {
				reject(new sj.Error({
					log: true, 
					origin: 'youtube.search()',
					message: 'tracks could not be retrieved',
					reason: 'gapi request was rejected',
					content: rejected,
				}));
			});
		}).then(function (resolved) {
			// save term
			sj.searchResults.term = term;

			// create list of ids
			var ids = [];
			resolved.result.items.forEach(function (track, i) {
				ids[i] = track.id.videoId;
			});

			return youtube.getTracks(ids);
		}).then(function (resolved) {
			// save sj.Playlist
			sj.searchResults.youtube = resolved;
			return new sj.Success({
				log: true,
				origin: 'youtube.search()',
				message: 'tracks retrieved',
				content: resolved,
			});
		}).catch(function (rejected) {
			throw sj.propagate(rejected);
		});
	};
	sj.youtube.getTracks = async function (ids) {
		// takes list of ids from youtube's resolved.result.items.id.videoId

		// prepare args
		var args = {
			method: 'GET',
			path: '/youtube/v3/videos',
			params: {
				id: ids.join(','),
				part: 'snippet,contentDetails',
			}
		};

		// https://developers.google.com/youtube/v3/docs/videos/list
		return new Promise(function (resolve, reject) {
			// convert gapi.client.request() to promise
			gapi.client.request(args).then(function (resolved) {
				resolve(resolved);
			}, function (rejected) {
				reject(new sj.Error({
					log: true, 
					origin: 'youtube.getTracks() gapi.client.request().then()',
					message: 'tracks could not be retrieved',
					reason: 'gapi request was rejected',
					content: rejected,
				}));
			});
		}).then(function(resolved) {
			// array of track objects
			var playlist = new sj.Playlist({
				log: false,
				origin: 'youtube.getTracks()',
			});

			resolved.result.items.forEach(function (track, i) {
				playlist.content[i] = new sj.Track({});

				playlist.content[i].source = youtube;
				playlist.content[i].sourceId = track.id;

				// convert artist - title format
				// TODO make better regex
				var stringSplit = track.snippet.title.split(/( +- +)/);
				if (stringSplit.length === 2) {
					var artistSplit = stringSplit[0].split(/( +[&x] +)/);
					artistSplit.forEach(function(artist) {
						// fill artists
						playlist.content[i].artists.push(artist);
					});
					playlist.content[i].title = stringSplit[1];
				} else {
					playlist.content[i].artists = [track.snippet.channelTitle];
					playlist.content[i].title = track.snippet.title;
				}

				// convert ISO_8601 duration to milliseconds
				playlist.content[i].duration = moment.duration(track.contentDetails.duration, moment.ISO_8601).asMilliseconds();
				playlist.content[i].link = youtube.idPrefix + playlist.content[i].id;	
			});

			playlist.announce();
			return playlist;
		}).catch(function (rejected) {
			throw sj.propagate(rejected);
		});
	};
*/


//  ██████╗ ██╗      █████╗ ██╗   ██╗██████╗  █████╗  ██████╗██╗  ██╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██████╔╝███████║██║     █████╔╝ 
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══██╗██╔══██║██║     ██╔═██╗ 
//  ██║     ███████╗██║  ██║   ██║   ██████╔╝██║  ██║╚██████╗██║  ██╗
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
//   

/* TODO
	behavior: playing in spotify manually, then start up app, previewing a song updates the playback to the current already playing song not the clicked preview song

	sj.Toggle: toggle or resume & pause or both? they all deal with one playback property but toggle out of all the actions is the only one that is dependant on an existing state - how to classify this? when do resume & pause merge into toggle - source, action, or playback level?
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



