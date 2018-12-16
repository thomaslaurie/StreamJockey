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


//  ███████╗██████╗ ██████╗  ██████╗ ██████╗ 
//  ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
//  █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝
//  ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗
//  ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║
//  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝

/*
	// sorting
	function isError(obj) {
		// checks for proper SjObject error types
		if (sj.typeOf(obj) === 'SjError' || sj.typeOf(obj) === 'SjErrorList') {
			return true;
		} else {
			return false;
		}
	}

	function catchUnexpected(obj) {
		// determines type of input, creates, announces, and returns a proper SjError object
		// use in the final Promise.catch() to handle any unexpected variables or errors that haven't been caught yet

		var error = new sj.Error({
			message: 'function received unexpected result',
			content: obj,
		});

		if (sj.typeOf(obj) === 'undefined') {
			error.reason = 'object is undefined';
		} else if (sj.typeOf(obj) === 'null') {
			error.reason = 'object is null';
		} else if (sj.typeOf(obj) === 'object') {
			if (typeof obj.objectType === 'undefined' || typeof obj.objectType === 'null' || obj.objectType.indexOf('Sj') !== 0) {
				error.reason = 'object is a non Sj object';
			} else {
				error.reason = 'object is of unexpected Sj objectType: ' + obj.objectType;
			}
		} else {
			error.reason = 'object is of unexpected type: ' + typeof obj;
		}
		error.announce();
		return error;
	}

	function sj.propagateError(obj) {
		// wrapper code for repeated error handling where: one or many SjObject results are expected, SjErrors are propagated, and anything else needs to be caught and transformed into a proper SjError
		if (sj.isError(obj)) {
			return obj;
		} else {
			return catchUnexpected(obj);
		}
	}

	function sj.filterList(resolvedList, type, resolvedObj, rejectedObj) {
		// used to filter a list of resolved objects from Promise.all(function() {... resolveAll} for a specified resolve type, then returns the list if all are of that type or an SjErrorList with all objects that aren't of that type

		resolvedObj.content = resolvedList;
		rejectedObj.content = [];

		resolvedList.forEach(function (item) {
			if (sj.typeOf(item) !== type) {
				rejectedObj.content.push(sj.propagateError(item));
			}
		});

		return new Promise(function (resolve, reject) {
			if (rejectedObj.content.length === 0) {
				resolvedObj.announce();
				resolve(resolvedObj);
			} else {
				rejectedObj.announce();
				reject(rejectedObj);
			}
		});
	}
*/

// handling
function handleError(error) {
	if (sj.typeOf(error) === 'SjError') {
		console.error(error);
		addElementError(error);
	} else if (sj.typeOf(error) === 'SjErrorList') {
		error.content.forEach(function (item) {
			console.error(error);
			addElementError(error);
		});
	} else {
		var newError = catchUnexpected(error);
		console.error(newError);
		addElementError(newError);
	}
}

// element errors
var elementErrorList = new sj.ErrorList({
	origin: 'global variable elementErrorList',
});

function clearElementError(elementError) {
	// console.log('clearElementError('+elementError.target+') called');

	// reverse deletion loop
	for (var i = elementErrorList.content.length - 1; i >= 0; i--) {
		if (elementError.target === elementErrorList.content[i].target) {
			// remove from array
			elementErrorList.content.splice(i, 1);
		}
	}
}

function clearElementErrorList(elementList) {
	// any call that creates element errors must be responsible for cleaning them up

	// console.log('addElementError('+elementList+') called');
	
	elementList.forEach(function(element, i) {
		// backwards delete loop
		for (var j = elementErrorList.content.length - 1; j >= 0; j--) {
			// identifies by id of jQuery DOM element
			if (element.attr('id') === elementErrorList.content[j].target) {
				// remove from list
				elementErrorList.content.splice(j, 1);
			}
		}
	});
}

function addElementError(elementError) {
	// console.log('addElementError('+elementError.target+') called');

	// if the error has a target
	if (elementError.target !== '') {
		// delete old, push new
		clearElementError(elementError);
		elementErrorList.content.push(elementError);
	}
}

function updateElementErrors() {
	// console.log('updateErrorElements() called');

	// list of all elementErrorClasses 
	// TODO keep me updated
	var elementErrorClasses = [
		'inputError',
		'notifyError',
		'notifySuccess', // ??? should notifySuccess go through the same flow as errors?
	];
	
	// remove all error messages
	$('.elementErrorMessage').remove();
		
	// remove all error classes
	elementErrorClasses.forEach(function (elementErrorClass, i) {
		$(document.getElementsByClassName(elementErrorClass)).removeClass(elementErrorClass);
	});

	// add for each
	elementErrorList.content.forEach(function(elementError, i) {
		$(document.getElementById(elementError.target))
			// class
			.addClass(elementError.cssClass)
			.after(
				// error message
				$('<div/>')
					.text(elementError.message)
					.addClass('elementErrorMessage')
			);
	});
}


//  ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
//  ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
//  ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
//  ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
//  ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
//  ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝

async function serverCommand(data) {
	return $.ajax({
		// http://api.jquery.com/jquery.ajax/
		url: 'request.php', // TODO
		type: 'POST',
		data: data,
	}).then(function (data, textStatus, jqXHR) {
		var obj = recreateSjObject(data);

		// TODO handle success messages on successful server commands
		// TODO updateElementErrors() as of now should take a .finally() behavior, but is this really the best way to do that?
		updateElementErrors();

		return obj;
	}, function (jqXHR, textStatus, errorThrown) {
		var temp =  new sj.Error({
			log: true,

			type: 'ajax error',
			origin: 'serverCommand()',

			message: 'could not send command to server',
			reason: textStatus,
			content: errorThrown,

			target: 'notify',
			cssClass: 'notifyError',
		});

		updateElementErrors();

		throw temp;
	});
}


//  ██╗   ██╗███████╗███████╗██████╗ 
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝

/* TODO 
	maxLength attribute can be used for input elements, use this to get real-time validation checks for max length
*/

async function register(name, password1, password2, email) {
	// takes input DOM elements
	var inputs = [
		name,
		password1,
		password2,
		email,
	];
	clearElementErrorList(inputs);

	var registerResult = await serverCommand({
		request: 'register',
		name: name.val(),
		password1: password1.val(),
		password2: password2.val(),
		email: email.val(),
	}).then(function (resolved) {
		// finally, wipe inputs
		inputs.forEach(function(input) {
			input.val('');
		});

		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});

	// TODO rethink this behavior
	// regardless of login's result, resolve registration if successful
	return login(name, password1).then(function (resolved) {
		return registerResult;
	}, function (rejected) {
		return registerResult;
	});
}

async function login(name, password) {
	// takes input DOM elements
	var inputs = [
		name,
		password,
	];
	clearElementErrorList(inputs);

	return serverCommand({
		request: 'login',
		name: name.val(),
		password: password.val(),
	}).then(function (resolved) {
		// update page status/permissions
		$("#statusUser")
			.text(resolved.content);

		// finally, wipe inputs
		inputs.forEach(function(input) { input.val(''); });
		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}

async function logout() {
	var inputs = [
	];
	clearElementErrorList(inputs);

	return serverCommand({
		request: 'logout',
	}).then(function (resolved) {
		$("#statusUser")
				.text('Guest');
		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}

async function getCurrentUser() {
	var inputs = [
	];
	clearElementErrorList(inputs);

	return serverCommand({
		request: 'getCurrentUser',
	}).then(function (resolved) {
		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}

async function getUser(id) {
	// takes input DOM element
	var inputs = [
		id
	];
	clearElementErrorList(inputs);

	return serverCommand({
		request: 'getUser',
		id: id.val(),
	}).then(function (resolved) {
		// finally, wipe inputs
		inputs.forEach(function(input) { input.val(''); });

		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝   

// playlists
async function addPlaylist(title, visibility, description, color, image) {
	// takes input DOM elements
	var inputs = [
		title,
		visibility,
		description,
		color,
		image,
	];
	clearElementErrorList(inputs);

	return serverCommand({
		request: 'addPlaylist',
		title: title.val(),
		visibility: visibility.val(),
		description: description.val(),
		color: color.val(),
		image: image.val(),
	}).then(function (resolved) {
		// finally, wipe inputs
		inputs.forEach(function(input) { input.val(''); });

		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}

async function getPlaylist(id) {
	// takes input DOM element
	var inputs = [
		id,
	];
	clearElementErrorList(inputs);

	return serverCommand({
		request: 'getPlaylist',
		id: id.val(),
	}).then(function (resolved) {
		// finally, wipe inputs
		inputs.forEach(function(input) { input.val(''); });
		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}

async function deletePlaylist(id) {
	// takes input DOM element
	var inputs = [
		id,
	];
	clearElementErrorList(inputs);

	return serverCommand({
		request: 'deletePlaylist',
		id: id.val(),
	}).then(function (resolved) {
		// finally, wipe inputs
		inputs.forEach(function(input) { input.val(''); });

		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}

async function orderPlaylist(id) {
	// takes input DOM element
	var inputs = [
		id,
	];
	clearElementErrorList(inputs);

	return serverCommand({
		request: 'orderPlaylist',
		id: id.val(),
	}).then(function (resolved) {
		// finally, wipe inputs
		inputs.forEach(function(input) { input.val(''); });

		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}

// tracks
async function addTrack(track, playlistId) {
	// takes DOM element.data('track'), and an input for with the playlist Id
	var inputs = [
		playlistId
	];
	clearElementErrorList(inputs);
	
	return serverCommand({
		request: 'addTrack',
		playlistId: playlistId.val(),
		source: track.source.name,
		sourceId: track.sourceId,
		title: track.title,
		artists: track.artists,
		duration: track.duration,
	}).then(function (resolved) {
		// finally, wipe inputs
		inputs.forEach(function(input) { input.val(''); });

		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}

async function deleteTrack(playlistId, position) {
	// takes input DOM element
	var inputs = [
		playlistId,
		position
	];
	clearElementErrorList(inputs);

	return serverCommand({
		request: 'deleteTrack',
		playlistId: playlistId.val(),
		position: position.val(),
	}).then(function (resolved) {
		// finally, wipe inputs
		inputs.forEach(function(input) { input.val(''); });

		return resolved;
	}).catch(function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}

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
//TODO make this async
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


//  ███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
//  ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
//  ███████╗█████╗  ███████║██████╔╝██║     ███████║
//  ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
//  ███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
//  ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝

var searchResults = {
	// details
	'term': '',
	'tracksPerSource': 5,
	'page': 1,

	// sources
	'spotify': new SjPlaylist({origin: 'searchResults',}),
	'youtube': new SjPlaylist({origin: 'searchResults',}),

	'all': new SjPlaylist({origin: 'searchResults',}),
}

// search
async function search(term) {
	return Promise.all(sj.sourceList.map(function (source) {
		return source.search(term).then(resolveBoth);
	})).then(function (resolved) {
		return sj.filterList(resolved, sj.Success, new sj.Success({
			origin: 'search()',
			message: 'search succeeded',
		}), new sj.ErrorList( {
			origin: 'search()',
			message: 'search failed',
		}));
	}).then(function (resolved) {
		refreshSearchResults();
		return resolved;
	}, function (rejected) {
		handleError(rejected);
		throw rejected;
	});
}

spotify.search = async function (term) {
	var options = {
		// max number of results to return, min 1, max 50, default 20
		limit: searchResults.tracksPerSource,
		// offset of first result, use with limit to get paged results min 0, max 100 000, default 0
		offset: searchResults.tracksPerSource * (searchResults.page - 1),
	};

	return spotifyApi.searchTracks(term, options).catch(function (rejected) {
		throw new sj.Error({
			log: true,
			code: JSON.parse(rejected.response).error.status,
			origin: 'spotify.search()',
			message: 'tracks could not be retrieved',
			reason: JSON.parse(rejected.response).error.message,
			content: rejected,
		});
	}).then(function (resolved) {
		// save term
		searchResults.term = term;

		// retrieve track data
		return spotify.getTracks(resolved.tracks.items);
	}).then(function (resolved) {
		// save SjPlaylist
		searchResults.spotify = resolved;

		return new sj.Success({
			log: true,
			origin: 'spotify.search()',
			message: 'tracks retrieved',
		});
	}).catch(function (rejected) {
		throw sj.propagateError(rejected);
	});
}

spotify.getTracks = async function (items) {
	// TODO add a case that can be used to getTracks for a list of ids as well
	// takes spotify's resolved.tracks.items array
	// !!! doesn't actually get tracks, just converts tracks from spotify.search

	// array of track objects
	var playlist = new SjPlaylist({
		origin: 'spotify.getTracks()',
	});

	items.forEach(function (track, i) {
		playlist.content[i] = new SjTrack({
			source: spotify,
			sourceId: track.id,
			title: track.name,
			duration: track.duration_ms,
			link: track.external_urls.spotify,
		});

		// fill artists
		track.artists.forEach(function (artist, j) {
			playlist.content[i].artists[j] = artist.name;
		});
	});

	playlist.announce();
	return playlist;
}

youtube.search = async function (term) {
	var args = {
		method: 'GET',
		path: '/youtube/v3/search',
		params: {
			// https://developers.google.com/youtube/v3/docs/search/list#parameters
			part: 'snippet',
			type: 'video',

			// min 0, max 50, default 5
			maxResults: searchResults.tracksPerSource,
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
		searchResults.term = term;

		// create list of ids
		var ids = [];
		resolved.result.items.forEach(function (track, i) {
			ids[i] = track.id.videoId;
		});

		return youtube.getTracks(ids);
	}).then(function (resolved) {
		// save SjPlaylist
		searchResults.youtube = resolved;
		return new sj.Success({
			log: true,
			origin: 'youtube.search()',
			message: 'tracks retrieved',
			content: resolved,
		});
	}).catch(function (rejected) {
		throw sj.propagateError(rejected);
	});
}

youtube.getTracks = async function (ids) {
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
		var playlist = new SjPlaylist({
			origin: 'youtube.getTracks()',
		});

		resolved.result.items.forEach(function (track, i) {
			playlist.content[i] = new SjTrack({});

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
		throw sj.propagateError(rejected);
	});
}

// display
function refreshSearchResults() {
	// console.log('refreshSearchResults() called');

	// arrange and display
	searchResults.all = arrangeResults('mix', ['spotify', 'youtube']);
	displayList(searchResults.all);
}

function arrangeResults(type, selection) {
	// TODO update this with the new source object model

	var arrangedResults = new SjPlaylist({
		origin: 'arrangeResults()',
		// no id or database relevant properties
		title: 'Search Results',
		visibility: 'public',
	});
	var totalLength = searchResults.tracksPerSource * searchResults.page * selection.length;
	
	// [a, b, c, a, b, c]
	if (type == 'mix') {
		// loop for at maximum the amount of tracks requested (incase only one source exists)
		for (var i = 0; i < totalLength; i++) {
			// loop through each source
			selection.forEach(function(source) {
				// if the source has a track at index i
				if (searchResults[source].content[i]) {
					// push it to arrangedResults
					arrangedResults.content.push(searchResults[source].content[i]);
				}
			});

			// old, not needed anymore, pushed values will be of known length
			// once/if arrangedResults is filled with the requested number of tracks, break
			//if (arrangedResults.length =< number) { break; }
		}

		arrangedResults.announce();
		return arrangedResults;
	}

	// [a, a, b, b, c, c]
	// if (type == 'sequence') {
	// 	var fromEach = floor(number / selection.length);
	// }
}

function displayList(playlist) {
	// delete old list
	$(".searchResult").remove();

	// append new one
	playlist.content.forEach(function(track, i) {
		$('#list').append(
			$('<li/>')
				.data('track', track)
				.addClass('searchResult')
				.addClass('resultNumber' + i)
				.append([
					$('<span/>')
						.addClass('searchResultArtists')
						.text(track.artists.join(', ')),
					$('<span/>')
						.addClass('searchResultTitle')
						.text(track.title),
					$('<span/>')
						.addClass('searchResultDuration')
						.text(msFormat(track.duration)),
					$('<button/>')
						.addClass('searchResultPreview')
						.text('Preview'),
					$('<button/>')
						.addClass('addTrack')
						.text('Add'),
				])
		);
	});
}


//  ██████╗ ██╗      █████╗ ██╗   ██╗██████╗  █████╗  ██████╗██╗  ██╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██████╔╝███████║██║     █████╔╝ 
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══██╗██╔══██║██║     ██╔═██╗ 
//  ██║     ███████╗██║  ██║   ██║   ██████╔╝██║  ██║╚██████╗██║  ██╗
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
//   

/* TODO
	behavior: playing in spotify manually, then start up app, previewing a song updates the playback to the current already playing song not the clicked preview song

	SjToggle: toggle or resume & pause or both? they all deal with one playback property but toggle out of all the actions is the only one that is dependant on an existing state - how to classify this? when do resume & pause merge into toggle - source, action, or playback level?
*/

var desiredPlayback = new SjPlayback({
	/* 
		desiredPlayback properties reflect CURRENT user desires and the interface state.
		The state of these properties are copied to SjActions which are then added to the queue
	*/
});

desiredPlayback.start = async function (track) {
	this.track = track;
	this.playing = true;
	this.progress = 0; // I didn't have this here before here before, why not???

	// Set slider range to track duration
	$('#progressBar').slider('option', 'max', this.track.duration); // TODO should this be put somewhere else?
	playbackQueue.push(new SjStart({}));
}

desiredPlayback.toggle = async function () {
	this.playing = !this.playing;
	playbackQueue.push(new SjToggle({}));
}

desiredPlayback.seek = function (ms) {
	this.progress = ms;
	playbackQueue.push(new SjSeek({}));
}

desiredPlayback.volume = function (volume) {
	this.volume = volume;
	playbackQueue.push(new SjVolume({}));
}

desiredPlayback.current = function () {
	// shorthand
	return desiredPlayback.track.source.playback;
}

async function checkPlayback() {
	return Promise.all(sj.sourceList.map(function (source) {
		return source.checkPlayback().then(resolveBoth);
	})).then(function (resolved) {
		return sj.filterList(resolved, sj.Success, new sj.Success({
			origin: 'checkPlayback()',
			message: 'checked playback state',
		}), new sj.ErrorList({
			origin: 'checkPlayback()',
			message: 'failed to check playback state',
		}));
	}).then(function (resolved) {
		return resolved; //TODO what is this
	}, function (rejected) {
		throw rejected;
	});
}

// !!! checkPlayback functions must save timeStamp immediately after progress is available, however playing is one property type
spotify.checkPlayback = async function () {
	// 1 api call (all)

	return spotifyApi.getMyCurrentPlaybackState({}).catch(function (rejected) {
		throw new sj.Error({
			log: true,
			code: JSON.parse(rejected.response).error.status,
			origin: 'spotify.checkPlayback()',
			message: 'failed to check spotify playback state',
			reason: JSON.parse(rejected.response).error.message,
			content: rejected,
		});
	}).then(function (resolved) {
		spotify.playback.track = {
			source: spotify,
			id: resolved.item.id,
			artists: [],
			title: resolved.item.name,
			duration: resolved.item.duration_ms,
			link: resolved.item.external_urls.spotify,
		}

		// fill artists
		resolved.item.artists.forEach(function (artist, j) {
			spotify.playback.track.artists[j] = artist.name;
		});

		spotify.playback.playing = resolved.is_playing; // TODO will cause an error if no track is playing, will break this entire function

		spotify.playback.progress = resolved.progress_ms;
		spotify.playback.timeStamp = resolved.timestamp;

		return new sj.Success({
			log: true,
			origin: 'spotify.checkPlayback()',
			message: 'spotify playback state checked',
		});
	}).catch(function (rejected) {
		throw sj.propagateError(rejected);
	});
}

youtube.checkPlayback = async function () {
	// 3 player calls - these are all synchronous - should not return errors, but still check their possible return types
	// 1 api call (track)

	// id?
	// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
	try {
		//https://developers.google.com/youtube/iframe_api_reference#Functions

		// playing
		if (youtubePlayer.getPlayerState() === 1 || youtubePlayer.getPlayerState() === 3) {
			/*	Returns the state of the player. Possible values are:
				-1 – unstarted, 0 – ended, 1 – playing, 2 – paused, 3 – buffering, 5 – video cued	*/
			youtube.playback.playing = true;
		} else {
			youtube.playback.playing = false;
		}
		
		// progress
		youtube.playback.progress = youtubePlayer.getCurrentTime() * 1000;
		youtube.playback.timeStamp = Date.now();


		var url = youtubePlayer.getVideoUrl(); // !!! can sometimes return undefined
		var id = sj.typeOf(url) === 'string' ? url.split('v=')[1] : '';
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
				throw sj.propagateError(rejected);
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
}

/*
function SjAction(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjAction';
	this.state = typeof obj.state === 'undefined' ? undefined : obj.state;

	// action comparisons
	this.isSimilarAction = function (item) {
		if (this.objectType === item.objectType) {
			return true;
		} else {
			return false;
		}
	}
	this.isIdenticalAction = function (item) {
		// TODO image could be different but that shouldn't matter because in: toggle > track > toggle, track should remove the first toggle
		if (this.isSimilarAction(item) && this.state === item.state) {
			return true;
		} else {
			return false;
		}
	}
	this.isParentAction = function (item) {
		return false;
	}

	// queue management
	this.removeOld = function (queue) {
		// backwards deletion loop
		for (var i = queue.length - 1; i > -1; i--) {
			if (this.isSimilarAction(queue[i]) || this.isParentAction(queue[i])) {
				queue.splice(i, 1);
			}
		}
	}

	// action
	this.trigger = async function () {
		return new Promise(resolve => {
			resolve(new sj.Success({
				log: true,
				origin: 'SjAction.trigger',
			}));
		});
	}

	this.onCreate();
}

function SjStart(obj) {
	// super
	SjAction.call(this, obj);

	this.objectType = 'SjStart';
	this.state = desiredPlayback.track;
	this.source = desiredPlayback.track.source;

	this.isParentAction = function (item) {
		if (item.objectType === 'SjToggle' || item.objectType === 'SjSeek') {
			return true;
		} else {
			return false;
		}
	}

	this.trigger = async function () {
		return Promise.all(sj.sourceList.map(source => {
			// pause all
			return source.pause().then(resolveBoth);
		})).then(resolved => {
			// filter errors
			return sj.filterList(resolved, sj.Success, new sj.Success({
				origin: 'SjStart.trigger()',
				message: 'changed track',
			}), new sj.ErrorList({
				origin: 'SjStart.trigger()',
				message: 'failed to change track',
			}));
		}).then(resolved => {
			// start
			return this.source.start(this.state);
		}).then(resolved => {
			return resolved;
		}, rejected => {
			throw sj.propagateError(rejected);
		});
	}

	this.onCreate();
}

function SjToggle(obj) {
		// super
	SjAction.call(this, obj);

	// overwritten properties
	this.objectType = 'SjToggle';
	this.state = desiredPlayback.playing;
	this.source = desiredPlayback.track.source;
	
	this.trigger = async function () {
		if (this.state) {
			return Promise.all(sj.sourceList.map(source => {
				if (source === this.source) {
					// resume desired source
					return source.resume().then(resolveBoth);
				} else {
					// pause all other sources
					return source.pause().then(resolveBoth);
				}
			})).then(resolved => {
				return sj.filterList(resolved, sj.Success, new sj.Success({
					origin: 'SjToggle.trigger()',
					message: 'playing updated',
				}), new sj.ErrorList({
					origin: 'SjToggle.trigger()',
					message: 'playing failed to update',
				}));
			}).then(resolved => {
				return resolved;
			}, rejected => {
				throw sj.propagateError(rejected);
			});
		} else {
			return Promise.all(sj.sourceList.map(source => {
				// pause all sources
				return source.pause().then(resolveBoth);
			})).then(resolved => {
				return sj.filterList(resolved, sj.Success, new sj.Success({
					origin: 'updatePlaybackPlaying()',
					message: 'playing updated',
				}), new sj.ErrorList({
					origin: 'updatePlaybackPlaying()',
					message: 'playing failed to update',
				}));
			}).then(resolved => {
				return resolved;
			}, rejected => {
				throw sj.propagateError(rejected);
			});
		}
	}

	this.onCreate();
}

function SjSeek(obj) {
	// super
	SjAction.call(this, obj);

	this.objectType = 'SjSeek';
	this.state = desiredPlayback.progress;
	this.source = desiredPlayback.track.source;

	this.trigger = async function () {
		return this.source.seek(this.state).then(resolved => {
			return new sj.Success({
				log: true,
				origin: 'SjSeek.trigger()',
				message: 'playback progress changed',
			});
		}).catch(rejected => {
			throw sj.propagateError(rejected);
		});
	}

	this.onCreate();
}

function SjVolume(obj) {
	// super
	SjAction.call(this, obj);

	this.objectType = 'SjVolume';
	this.state = desiredPlayback.volume;
	this.source = desiredPlayback.track.source;

	this.trigger = async function () {
		// TODO
	}

	this.onCreate();
}
*/

var playbackQueue = {
	sent: noAction,
	queue: [],

	push: async function (action) {
		// redundancy checks
		action.removeOld(this.queue);
		
		// count parents in queue
		var parents = 0;
		this.queue.forEach(function (item) {
			if (item.isParentAction(action)) {
				parents++;
			}
		});

		// push only if action has a parent in the way or if action is different from sentAction
		if (parents !== 0 || !action.isIdenticalAction(this.sent)) {
			this.queue.push(action);
			this.sendNext();
		}
	},

	/* REFLECTION
		Problem:	Starting a spotify and youtube track rapidly would cause both to play at the same time
		Symptom:	Spotify then Youtube -> checkPlayback() was setting spotify.playing to false immediately after spotify.start() resolved
					Youtube then Spotify -> youtube.pause() would not stick when called immediately after youtube.start() resolved
		Cause:		It was discovered through immediate checkPlayback() calls that the api playback calls don't resolve when the desired playback is achieved but only when the call is successfully received
		Solution:	Playback functions need a different way of verifying their success if they are going to work how I originally imagined they did. Try verifying playback by waiting for event listeners?
					Putting a short delay between playbackQueue calls gives enough time for the apis to sort themselves out.
	*/

	sendNext: async function () {
		// restart if finished sent action && queue not empty
		if (this.sent === noAction && this.queue.length > 0) {
			this.sent = this.queue[0];
			this.queue.splice(0, 1);

			// TODO checkPlaybackState every action just like before, find a better way
			// TODO in queue system, when to checkPlaybackState? only when conflicts arise?
			// (maybe also: if the user requests the same thing thats happening, insert a check to verify that the playback information is correct incase the user has more recent information), 
			checkPlayback().then(resolved => {
				// !!! why arrow functions? because of lexical scoping, this is able to refer to playbackQueue not just the function's body
				return this.sent.trigger();
			}).then(resolved => {
				// TODO temporary delay - see reflection
				return delay(500);
			}).then(resolved => {
				// TODO handle resolved, nothing needed to be handled before???
				this.sent = noAction;
				this.sendNext();
			}, rejected => {
				// TODO handle action rejected

				/* 	Action Failure Handling 
					!!! old, meant for individual action types

				send action, change pendingAction to true, wait
					if success: change pendingAction to false
						if queuedAction exists: change action to queuedAction, clear queued action, repeat...
						else: nothing
					if failure: 
						if queuedAction exists: change pendingAction to false, change action to queuedAction, clear queued action, repeat... // pendingActions aren't desired if queuedActions exist, and therefore are only waiting for resolve to be overwritten (to avoid sending duplicate requests)
						else: trigger auto-retry process
							if success: repeat...
							if failure: change pendingAction to false, trigger manual-retry process which basically sends a completely new request...

				*/

				handleError(rejected);
				this.sent = noAction;
			});
		}
	},

	hasObject: function (type) {
		if (sent.objectType === type) {
			return true;
		} else {
			this.queue.forEach(function (item) {
				if (item.objectType === type) {
					return true;
				}
			});
			return false;
		}
	},
}


//   ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     
//  ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     
//  ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     
//  ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     
//  ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗
//   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝

/* //R
	I considered instead of updating playback state in each source function upon SjSuccess, to do a second and final checkPlayback() once updatePlayback() succeeds (this would require two api calls, but I thought it could be simpler (but would it?)).
	
	I thought because track info is also needed (in addition to playback state) that a final checkPlayback() would be needed to verify the post-update track info, (this came from not knowing what track was playing when starting one for the first time), however this info should already be known from the fetched and displayed track (object), so all of these functions actually do have the ability to update information when resolved.

	This resolution suggests using track objects everywhere as parameters rather than ids; this should be possible because the user is never going to be blindly playing id strings without the app first searching and tying down its additional metadata.
*/


/* //R
	I considered that setting knownPlayback.progress upon start() (0) and seek() (ms) may wipeout any official information from checkPlayback() or listeners, as any information that arrives between sending and receiving the request will be wiped out upon resolution (with less valuable, inferred information). 
	
	However unless the information is being sent from a synchronous or local source (which actually is likely), that information should not be sent and received between the time-span it takes for the playback request to be sent and received - therefore it must be sent before and therefore less accurate/valuable than even the inferred progress information.

	Then I realized that any checks to playback state will have the same offset error as the playback requests so it makes no sense to even checkPlayback() to get more accurate information.
*/

spotify.apiStart = async function (track) {
	return spotifyApi.play({"uris":["spotify:track:" + track.sourceId]}).then(function (resolved) {
		return new sj.Success({
			log: true,
			origin: 'spotify.start()',
			message: 'track started',
			content: resolved,
		});
	}, function (rejected) {
		throw new sj.Error({
			log: true,
			code: JSON.parse(rejected.response).error.status,
			origin: 'spotify.start()',
			message: 'spotify track could not be started',
			reason: JSON.parse(rejected.response).error.message,
			content: rejected,
		});
	}).catch(function (rejected) {
		throw sj.propagateError(rejected);
	});
}
youtube.apiStart = async function (track) {
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
}

spotify.apiResume = async function () {
	return spotifyApi.play({}).then(function (resolved) {
		return new sj.Success({
			log: true,
			origin: 'spotify.resume()',
			message: 'track resumed',
			content: resolved,
		});
	}, function (rejected) {
		throw new sj.Error({
			log: true,
			code: JSON.parse(rejected.response).error.status,
			origin: 'spotify.resume()',
			message: 'spotify track could not be resumed',
			reason: JSON.parse(rejected.response).error.message,
			content: rejected,
		});
	}).catch(function (rejected) {
		throw sj.propagateError(rejected);
	});
}
youtube.apiResume = async function () {
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
}

spotify.apiPause = async function () {
	return spotifyApi.pause({}).then(function (resolved) {
		return new sj.Success({
			log: true,
			origin: 'spotify.pause()',
			message: 'track paused',
			content: resolved,
		});
	}, function (rejected) {
		throw new sj.Error({
			log: true,
			code: JSON.parse(rejected.response).error.status,
			origin: 'spotify.pause()',
			message: 'spotify track could not be paused',
			reason: JSON.parse(rejected.response).error.message,
			content: rejected,
		});
	}).catch(function (rejected) {
		throw sj.propagateError(rejected);
	});
}
youtube.apiPause = async function () {
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
}

spotify.apiSeek = async function (ms) {
	return spotifyApi.seek(ms, {}).then(function (resolved) {
		return new sj.Success({
			log: true,
			origin: 'spotify.seek()',
			message: 'track seeked',
			content: resolved,
		});
	}, function (rejected) {
		throw new sj.Error({
			log: true,
			code: JSON.parse(rejected.response).error.status,
			origin: 'spotify.seek()',
			message: 'spotify track could not be seeked',
			reason: JSON.parse(rejected.response).error.message,
			content: rejected,
		});
	}).catch(function (rejected) {
		throw sj.propagateError(rejected);
	});
}
youtube.apiSeek = async function (ms) {
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
}

spotify.apiVolume = async function (volume) {
}
youtube.apiVolume = async function (volume) {
}


export default sj;