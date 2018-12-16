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

import sj from './global.mjs';


//  ███████╗ ██████╗ ██╗   ██╗██████╗  ██████╗███████╗
//  ██╔════╝██╔═══██╗██║   ██║██╔══██╗██╔════╝██╔════╝
//  ███████╗██║   ██║██║   ██║██████╔╝██║     █████╗  
//  ╚════██║██║   ██║██║   ██║██╔══██╗██║     ██╔══╝  
//  ███████║╚██████╔╝╚██████╔╝██║  ██║╚██████╗███████╗
//  ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚══════╝

sj.spotify = new sj.Source({
	name: 'spotify',
});
sj.youtube = new sj.Source({
	name: 'youtube',
	idPrefix: 'https://www.youtube.com/watch?v=',
});

// auth
sj.spotify.auth = async function () {
    let authRequestWindow;
    
    //C request authURL & authKey
    return fetch(`http://localhost:3000/api/spotify/startAuthRequest`).then(resolved => {
        return resolved.json();
    }).then(resolved => {
        //C open spotify auth request window
        //L https://www.w3schools.com/jsref/met_win_open.asp
        authRequestWindow = window.open(resolved.authRequestURL);
        
        return resolved;
    }).then(resolved => {
        //TODO there is a chance to miss the event if the window is resolved before the fetch request reaches the server
        return fetch(`http://localhost:3000/api/spotify/endAuthRequest`,  {
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
        throw sj.propagateError(rejected);
    });
}
sj.youtube.auth = async function () {
    //TODO
    return new sj.Error({
        log: true,
        origin: 'youtube.auth()',
        message: 'this function is not yet implemented',
    });
}

// api
sj.spotify.loadApi = async function () {
	return new Promise(function (resolve, reject) {
		try {
			// https://beta.developer.spotify.com/documentation/web-api/
			// https://doxdox.org/jmperez/spotify-web-api-js

			// window is basically the global object and is how to define variables within a function
			window.spotifyApi = new SpotifyWebApi();
			spotifyApi.setAccessToken(spotifyAccessToken);

			resolve(new sj.Success({
				log: true,
				origin: 'spotify.loadApi()',
				message: 'spotify api ready',
			}));
		} catch (e) {
			reject(new sj.Error({
				log: true,
				origin: 'spotify.loadApi()',
				message: 'spotify api failed to load',
				reason: e,
				content: e,
			}));
		}
	});
}
sj.youtube.loadApi = async function () {
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
}

// player
sj.spotify.loadPlayer = async function () {
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
					spotify.playback.timeStamp = state.timestamp;
					spotify.playback.playing = !state.paused;
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
							log: true,
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
}
sj.youtube.loadPlayer = function () {
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
			youtube.playback.playing = true;
		} else {
			youtube.playback.playing = false;
		}

		// nothing other than playing is given information here, however because the api functions are synchronous (except for the track) could we not just call them here too? even though the actions of play/pause and seeking are infrequent enough to warrant checking every time - theres a triple state change (2, 3, 1) when just seeking so there would have to be check to limit the check to one time

		// progress
		if (event.data === 1 || event.data === 2) {
			youtube.playback.progress = youtubePlayer.getCurrentTime() * 1000;
			youtube.playback.timeStamp = Date.now();
		}
	}

	window.onPlayerError = function (event) {
		console.error(event);
	}

	// youtubePlayer.destroy() kills the iframe
}


export default sj;