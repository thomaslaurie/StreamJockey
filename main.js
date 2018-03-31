$(document).ready(function() {
	// initialize

	// https://beta.developer.spotify.com/documentation/web-api/
	var spotifyAPI = new SpotifyWebApi();
	spotifyAPI.setAccessToken(spotifyAccessToken);


	// functions

	function logError(error) {
		var response = JSON.parse(error.response);

		var status = response.error.status;
		var message = response.error.message;

		console.error('Status: ' + status);
		console.error('Message: ' + message);
		console.error(error);
	}

	function getURI() {
		//Get
		var uri = $('#uri').val();
		return uri;

		// //Set
		// $('#txt_name').val(bla);
	}


	function spotifyConnectPlayer() {
		// sets up a local Spotify Connect device, but cannot play or search tracks (limited to modifying playback state, but don't do that here)
		// https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-connect

		// TODO requires spotifyAccessToken, if this changes (ie. token frefresh, account swap) how does player get updated? 

		$.getScript('https://sdk.scdn.co/spotify-player.js');

		// this method must be defined immediately after spotify-player.js
		window.onSpotifyWebPlaybackSDKReady = () => {
			// stuff inside here is optional though

			// initialize
			var player = new Spotify.Player({
				name: WEB_PLAYER_NAME,
				getOAuthToken: cb => { cb(spotifyAccessToken); }
			});

			// configure listeners
			// error handling
			player.addListener('initialization_error', ({message}) => { console.error(message); });
			player.addListener('authentication_error', ({message}) => { console.error(message); });
			player.addListener('account_error', ({message}) => { console.error(message); });
			player.addListener('playback_error', ({message}) => { console.error(message); });

			// playback status updates
			player.addListener('player_state_changed', state => { 
				// console.log(state); 
			});

			// ready
			player.addListener('ready', ({device_id}) => {
				// returns a WebPlaybackPlayer object which just contains the created device_id
				// https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#object-web-playback-player

				console.log('player ready');
				spotifyConnectAPI(device_id);
			});

			// connect to player
			player.connect().then(success => {
				if (success) {
					// connection success, but still might not be ready, will trigger the ready listener when ready
					console.log('player.connect() success');
				} else {
					// TODO player connect failed
					console.log('player.connect() failure');
				}
			});
		};
	}

	function spotifyConnectAPI(deviceID) {
		// https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
		spotifyAPI.transferMyPlayback([deviceID], {}, function(error, response) {
			// this function doesn't send a callback, is that a bug or intentional?
			
			// if (error) {
			// 	console.error('transferMyPlayback() failure');
			// 	logError(error);
			// }

			// if (response) {
			// 	console.log('transferMyPlayback() success');
			// 	console.log(response);
			// }
		});


		// old flow for connecting to the device by WEB_PLAYER_NAME, doesn't use deviceID parameter

		// spotifyAPI.getMyDevices(function(error, response) {
		// 	if (error) {
		// 		console.error('getMyDevices() failure');
		// 		logError(error);
		// 	}

		// 	if (response) {
		// 		console.log('getMyDevices() success');
		// 		console.log(response);

		// 		var found = false;

		// 		// find the specified device
		// 		response.devices.forEach(function(d) {
		// 			if (d.name == WEB_PLAYER_NAME) {
		// 				found = d;
		// 			}
		// 		});

		// 		// TODO none of these logs are appearing, but the device transfer still works
		// 		if (found) {
		// 			// https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
		// 			spotifyAPI.transferMyPlayback([found.id], {}, function(error, response) {
		// 				if (error) {
		// 					console.error('transferMyPlayback() failure');
		// 					logError(error);
		// 				}

		// 				if (response) {
		// 					console.log('transferMyPlayback() success');
		// 					console.log(response);
		// 				}
		// 			});
		// 		} else {
		// 			console.error('device not found');
		// 		}
		// 	}
		// });
	}


	// playback control

	function start(uri) {
		spotifyAPI.play({"uris":["spotify:track:" + uri]}, function(error, response) {
			if (error) {
				console.error('start() failure');
				logError(error);
			}

			if (response) {
				console.log('start() success');
				console.log(response);
			}
		});
	}

	function resume() {
		spotifyAPI.play({}, function(error, response) {
			if (error) {
				console.error('resume() failure');
				logError(error);
			}

			if (response) {
				console.log('resume() success');
				console.log(response);
			}
		});
	}

	function pause() {
		spotifyAPI.pause({}, function(error, response) {
			if (error) {
				console.error('pause() failure');
				logError(error);
			}

			if (response) {
				console.log('pause() success');
				console.log(response);
			}
		});
	}

	function toggle() {
		// https://beta.developer.spotify.com/documentation/web-api/reference/player/get-information-about-the-users-current-playback/
		spotifyAPI.getMyCurrentPlaybackState({}, function(error, response) {
			if (error) {
				console.error('toggle() failure');
				logError(error);
			}

			if (response) {
				console.log('toggle() success');
				console.log(response);

				if (response.is_playing) {
					pause();
				} else {
					resume();
				}
			}
		});
	}

	function seek(ms) {
		spotifyAPI.seek(ms, function(error, response) {
			if (error) {
				console.error('seek() failure');
				logError(error);
			}

			if (response) {
				console.log('seek() success');
				console.log(response);
			}
		});
	}


	// page

	$("#connectPlayer").click(function() {
		console.log("#connectPlayer.click() called");

		spotifyConnectPlayer();
	});

	$("#change").click(function() {
		console.log("#change.click() called");

		start(getURI());
	});

	$("#toggle").click(function() {
		console.log("#toggle.click() called");

		toggle();
	});

	$("#seek").click(function() {
		console.log("#seek.click() called");
	
		seek(20000);
	});


	// old

	// $("#reload").click(function() {
	// 	console.log("#reload.click() called");

	// 	window.location.reload();
	// });

	// $("#connectDevice").click(function() {
	// 	console.log("#connectDevice.click() called");

	// 	spotifyConnectAPI();
	// });
});