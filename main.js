$(document).ready(function() {
	// initialize

	// https://beta.developer.spotify.com/documentation/web-api/
	var spotifyAPI = new SpotifyWebApi();
	spotifyAPI.setAccessToken(spotifyAccessToken);

	// search object
	var searchResults = {
		// details
		term: '',
		tracksPerSource: 5,
		page: 1,

		// sources
		spotify: [],
		youtube: [],
		soundcloud: [],
	}


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
		// API can make playback requests to the currently active device, but wont do anything if there isn't one active, this launches one
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

	function msFormat(ms) {
		// extract
		var minutes = Math.floor(ms / 60000);
		var seconds = Math.ceil(ms % 60000);

		// format
		seconds = ('0' + seconds).slice(-2);

		// returns ...0:00 format rounded up to the nearest second
		return minutes + ':' + seconds;
	}

	// search
	function search(term) {
		var options = {
			// max number of results to return, min 1, max 50, default 20
			limit: searchResults.tracksPerSource,
			// offset of first result, use with limit to get paged results min 0, max 100 000, default 0
			offset: searchResults.tracksPerSource * (searchResults.page - 1),
		};

		spotifyAPI.searchTracks(term, options, function(error, response) {
			if (error) {
				console.error('search() failure');
				logError(error);
			}

			if (response) {
				console.log('search() success');
				console.log(response);

				// update searchResults
				searchResults.term = term;
				searchResults.spotify = formatSourceResult('spotify', response);

				// update page
				refreshSearchResults();
			}
		});
	}

	function refreshSearchResults() {
		// delete old list
		$(".searchResult").remove();

		// arrange and display new list
		var arrangedList = arrangeResults('mix', ['spotify']);
		displayList(arrangedList);
	}

	function formatSourceResult(source, object) {
		// array of track objects

		var trackList = [];

		// source cases
		if (source == 'spotify') {
			object.tracks.items.forEach(function (track, i) {
				trackList[i] = {
					// core
					source: 'spotify',
					id: track.id,
					artists: [],
					title: track.name,
					duration: track.duration_ms,
					
					// extra
					link: track.external_urls.spotify,
				};	

				track.artists.forEach(function (artist, j) {
					trackList[i].artists[j] = artist.name;
				});
			});

			return trackList;
		}
	}

	function arrangeResults(type, selection) {
		var combinedResults = [];
		var totalLength = searchResults.tracksPerSource * searchResults.page * selection.length;
		
		// [a, b, c, a, b, c]
		if (type == 'mix') {
			// loop for at maximum the amount of tracks requested (incase only one source exists)
			for (var i = 0; i < totalLength; i++) {
				// loop through each source
				selection.forEach(function(source) {
					// if the source has a track at index i
					if (searchResults[source][i]) {
						// push it to combinedResults
						combinedResults.push(searchResults[source][i]);
					}
				});

				// old, not needed anymore, pushed values will be of known length
				// once/if combinedResults is filled with the requested number of tracks, break
				//if (combinedResults.length =< number) { break; }
			}

			return combinedResults;
		}

		// [a, a, b, b, c, c]
		// if (type == 'sequence') {
		// 	var fromEach = floor(number / selection.length);
		// }
	}

	function displayList(trackList) {
		trackList.forEach(function(track, index) {
			$('#list').append(
				$('<li/>')
					.data('data', track)
					.addClass('searchResult' + index)
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
					])
			);
		});
	}

	// .on('click'... is a delegated event (?) and is needed to work on dynamically generated elements
	// .on() needs to bind to the target element, one that is guaranteed to exist on page creation, however the selector then filters for elements which might not exist yet
	// TODO .on() should be bound to the closest non-dynamic element (cause its faster?)
	$(document).on("click", ".searchResultPreview", function() {
		console.log(".searchResultPreview.click() called");

		var id = $(this).parent().data('data').id;

		console.log(id);
		start(id);
	});

	// page

	$("#connectPlayer").click(function() {
		console.log("#connectPlayer.click() called");

		spotifyConnectPlayer();
	});

	$("#search").click(function() {
		console.log("#search.click() called");

		search(getURI());
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

	$("#ajax").click(function() {
		console.log("#ajax.click() called");
	
		$.ajax({
			url: 'request.php',
			type: "POST",
			
			data: {
				request: 'refreshTokens',
				name: 'blah',
				blah: 'name',
			},

			success: function(data){
				console.log('Result: ' + data);
			}
		});
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