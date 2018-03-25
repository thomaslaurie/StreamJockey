$(document).ready(function() {
	var spotifyAPI = new SpotifyWebApi();
	spotifyAPI.setAccessToken(accessToken);

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

	function connectToDevice() {
		spotifyAPI.getMyDevices(function(error, response) {
			if (error) {
				console.error('getMyDevices() failure');
				logError(error);
			}

			if (response) {
				console.log('getMyDevices() success');
				console.log(response);

				var found = false;

				// find the specified device
				response.devices.forEach(function(d) {
					if (d.name == WEB_PLAYER_NAME) {
						found = d;
					}
				});

				// TODO none of these logs are appearing, but the device transfer still works
				if (found) {
					// https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
					spotifyAPI.transferMyPlayback([found.id], {}, function(error, response) {
						if (error) {
							console.error('transferMyPlayback() failure');
							logError(error);
						}

						if (response) {
							console.log('transferMyPlayback() success');
							console.log(response);
						}
					});
				} else {
					console.error('device not found');
				}
			}
		});
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

	$("#connectDevice").click(function() {
		console.log("#connectDevice.click() called");

		connectToDevice();
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
});