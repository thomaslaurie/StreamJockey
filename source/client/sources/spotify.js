//import './vendor/spotify-player.js'; //! creates window.onSpotifyWebPlaybackSDKReady and window.Spotify, this is supposed to be imported dynamically from https://sdk.scdn.co/spotify-player.js, it may change without notice, wont work here because onSpotifyWebPlaybackSDKReady is undefined
//import SpotifyWebApi from './vendor/spotify-web-api.js'; //L api endpoint wrapper: https://github.com/jmperez/spotify-web-api-js

import {
	wait,
	repeat,
	rules,
} from '../../shared/utility/index.js';
import request from '../../shared/request.js';
import serverRequest from '../server-request.js';
import { 
	AuthRequired, 
	Unreachable,
	Timeout,
	Err,
} from '../../shared/legacy-classes/error.js';
import {
	Success,
} from '../../shared/legacy-classes/success.js';
import {
	Track,
} from '../../client/entities/index.js';
import {
	default as propagate,
	returnPropagate,
} from '../../shared/propagate.js';
import {
	JSON_HEADER,
	APP_NAME,
} from '../../shared/constants.js';
import isInstanceOf from '../../shared/is-instance-of.js';
import Source from '../source.js';
import Playback from '../playback.js';

const spotify = new Source({
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
		const requestCredentials = await serverRequestRequest('GET', 'spotify/authRequestStart');
	
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
	
		return new Success({
			origin: 'sj.spotify.auth()',
			message: 'authorized spotify',
		});
		
		//TODO there needs to be a scopes (permissions) check in here somewhere
	
		/* //OLD
			//C request authURL & authKey
			return fetch(`${API_URL}/spotify/startAuthRequest`).then(resolved => {
				//C open spotify auth request window
				//L https://www.w3schools.com/jsref/met_win_open.asp
				authRequestWindow = window.open(resolved.authRequestURL);
				return resolved;
			}).then(resolved => {
				//TODO there is a chance to miss the event if the window is resolved before the fetch request reaches the server
				return fetch(`${API_URL}/spotify/endAuthRequest`,  {
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
				throw propagate(rejected);
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
			...JSON_HEADER,
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
			let result = await serverRequest('GET', `spotify/refreshToken`).catch(returnPropagate);
			if (isInstanceOf(result, AuthRequired, 'AuthRequired')) {
				//C call auth() if server doesn't have a refresh token
				await that.auth();
			} else if (result instanceof Err) {
				throw propagate(result);
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
});

// External due to spotify self reference.
spotify.search = async function ({
	term = '',
	startIndex = 0,
	amount = 1,
}) {
	// VALIDATE
	rules.visibleString.validate(term);
	rules.nonNegativeInteger.validate(startIndex);
	rules.positiveInteger.validate(amount);

	const result = await spotify.request('GET', 'search', {
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
		return new Track({
			source: spotify,
			sourceId: track.id,
			name: track.name,
			duration: track.duration_ms,
			link: track.external_urls.spotify,
			artists: track.artists.map(artist => artist.name),
		});
	});
};
spotify.playback = new Playback({
	//G source-specific playback should be the basic playback functions that connects this app to the source's api
	state: {
		source: spotify,
	},
	actions: {
		async loadPlayer(context) {
			return await new Promise((resolve, reject) => {
				//C this is a callback that the SpotifyWebPlaybackSDK module calls when it is ready
				window.onSpotifyWebPlaybackSDKReady = function () {
					const player = new window.Spotify.Player({ 
						//C "The name of the Spotify Connect player. It will be visible in other Spotify apps."
						name: APP_NAME,
						getOAuthToken: async callback => {
							let token = await spotify.getAccessToken();
							callback(token);
						},
						//volume: 1, //TODO initialize with a custom volume (default is 1)
					});
					player.formatState = function (state) {
						//TODO state could be anything from the callback, better validate it somehow
						if (!rules.object.test(state)) return {};
						const t = state.track_window.current_track; 
						return {
							track: new Track({
								source: spotify,
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
									resolve(new Success(success));
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
									reject(new Err({...error, content: rejected}));
									resolved = true;
								}
							});

							//C if playback is already in the proper state, resolve but don't update
							//! this check is required because in this case spotify wont trigger a 'player_state_changed' event
							await context.dispatch('checkPlayback');
							if (!resolved && stateCondition(context.state)) {
								this.removeListener('player_state_changed', callback);
								resolve(new Success(success));
								resolved = true;
							}
							
							//C if timed out, reject
							await wait(Playback.requestTimeout);
							if (!resolved) {
								this.removeListener('player_state_changed', callback);
								reject(new Timeout(timeoutError));
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
						await spotify.request('PUT', 'me/player', {
							device_ids: [device_id],
							play: false, // keeps current playback state
						}).catch(rejected => {
							reject(new Err({
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
							return await spotify.request('Get', 'me/player').catch(rejected => {
								reject(new Err({
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
									rules.object.test(result) 		 &&
									rules.object.test(result.device) &&
									result.device.id === device_id
								);
							},
							timeout: Playback.requestTimeout * 2,
						});

						//C check playback state //? this was commented out earlier and after pause, was this causing issues?
						await context.dispatch('checkPlayback');

						//C ensure that playback is not playing
						await context.dispatch('pause');

						resolve(new Success({
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
						reject(new Err({
							log: true,
							origin: 'spotify.loadPlayer()',
							message: 'spotify player encountered an initialization error',
							reason: message,
						}));
					});
					player.on('authentication_error', ({message}) => {
						//C 'Emitted when the Spotify.Player fails to instantiate a valid Spotify connection from the access token provided to getOAuthToken.'
						reject(new Err({
							log: true,
							origin: 'spotify.loadPlayer()',
							message: 'spotify player encountered an authentication error',
							reason: message,
						}));
					});
					player.on('account_error', ({message}) => {
						//C 'Emitted when the user authenticated does not have a valid Spotify Premium subscription.'
						reject(new Err({
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
						if (!resolved) reject(new Err({
							origin: 'spotify.loadPlayer()',
							message: 'spotify player failed to connect',
							reason: 'spotify.connect() failed',
						}));
					}, rejected => {
						reject(new Unreachable({ //C a rejection shouldn't be possible here
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
				import(/* webpackChunkName: 'spotify-player' */ `../vendor/spotify-player.js`);
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
								triggerReject(new Err({
										log: true,
										origin: 'spotify.loadPlayer()',
										message: 'spotify player encountered an initialization error',
										reason: message,
									})
								);
							});
		
							player.addListener('authentication_error', function ({message}) { 
								// 'Emitted when the Spotify.Player fails to instantiate a valid Spotify connection from the access token provided to getOAuthToken.'
								triggerReject(new Err({
										log: true,
										origin: 'spotify.loadPlayer()',
										message: 'spotify player encountered an authentication error',
										reason: message,
									})
								);
							});
		
							player.addListener('account_error', function ({message}) {
								// 'Emitted when the user authenticated does not have a valid Spotify Premium subscription.'
								triggerReject(new Err({
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
									triggerResolve(new Success({
										origin: 'spotify.loadPlayer()',
										message: 'spotify player loaded',
									}));
		
									// TODO updatePlayback(); ?
								}, function (rejected) {
									triggerReject(new Err({
										log: true,
										code: JSON.parse(error.response).error.status,
										origin: 'spotify.loadPlayer()',
										message: 'spotify player could not be loaded',
										reason: JSON.parse(error.response).error.message,
										content: error,
									}));
								}).catch(function (rejected) {
									triggerReject(new Err({
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
									triggerReject(new Err({
										log: true,
										origin: 'spotify.loadPlayer()',
										message: 'spotify player failed to connect',
										reason: 'spotify.connect() failed',
									}));
								}
							}, function (rejected) {
								// should not be possible to get here, but handle it either way
								triggerReject(new Err({
									log: true,
									origin: 'spotify.loadPlayer()',
									message: 'spotify player failed to connect',
									reason: 'spotify.connect() failed',
									content: rejected,
								}));
							});
						} catch (e) {
							triggerReject(new Err({
								log: true,
								origin: 'spotify.loadPlayer()',
								message: 'spotify player failed to connect',
								reason: e,
								content: e,
							}));
						}
					}
					
		
					$.getScript('https://sdk.scdn.co/spotify-player.js').catch(function (jqXHR, settings, exception) {
						triggerReject(new Err({
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
			return new Success({
				origin: 'spotify module command - updatePlayback()',
				message: 'spotify playback updated',
				content: newState,
			});
		},
		async checkPlayback(context) {
			//C retrieves playback from api and updates it

			//L https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-getcurrentstate
			const state = await context.state.player.getCurrentState().catch(rejected => {
				throw new Err({
					log: true,
					//code: JSON.parse(rejected.response).error.status,
					origin: 'spotify.checkPlayback()',
					message: 'failed to check spotify playback state',
					//reason: JSON.parse(rejected.response).error.message,
					content: rejected,
				});
			});

			await context.dispatch('updatePlayback', state);
			return new Success({
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
});

export default spotify;

