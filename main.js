//  ████████╗ ██████╗ ██████╗  ██████╗     ██╗     ██╗███████╗████████╗
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗    ██║     ██║██╔════╝╚══██╔══╝
//     ██║   ██║   ██║██║  ██║██║   ██║    ██║     ██║███████╗   ██║   
//     ██║   ██║   ██║██║  ██║██║   ██║    ██║     ██║╚════██║   ██║   
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝    ███████╗██║███████║   ██║   
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝     ╚══════╝╚═╝╚══════╝   ╚═╝   
//                                                                     

// TODO go through and make error handlers for everything, including making callbacks all the way up function trees
// TODO .on() should be bound to the closest non-dynamic element (cause its faster?)
	// .on('click'... is a delegated event (?) and is needed to work on dynamically generated elements
	// .on() needs to bind to the target element, one that is guaranteed to exist on page creation, however the selector then filters for elements which might not exist yet
// TODO maxlength attribute can be used for input elements, use this to get real-time validation checks for max lenth


//   ██████╗ ██╗      ██████╗ ██████╗  █████╗ ██╗     ███████╗
//  ██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔══██╗██║     ██╔════╝
//  ██║  ███╗██║     ██║   ██║██████╔╝███████║██║     ███████╗
//  ██║   ██║██║     ██║   ██║██╔══██╗██╔══██║██║     ╚════██║
//  ╚██████╔╝███████╗╚██████╔╝██████╔╝██║  ██║███████╗███████║
//   ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
//                                                            

var YOUTUBE_ID_PREFIX = 'https://www.youtube.com/watch?v=';


//  ███████╗██████╗ ██████╗  ██████╗ ██████╗ ███████╗
//  ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔════╝
//  █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝███████╗
//  ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗╚════██║
//  ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║███████║
//  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
//                                                   

// test
$("#test").click(function() {

	getUser($('#testInput'));
});

// templates
var successObjectTemplate = {
	// only gets returned when function has no content to return on success
	'objectType': 'success',
	'code': '200',
	'type': '',
	'message': '',
	'origin': '',
	'target': '',
	'class': '',
	'content': '',
}

var errorObjectTemplate = {
	'objectType': 'error',
	'code': '',
	'type': '',
	'message': '',
	'origin': '',
	'target': '',
	'class': '',
}

// display
var elementErrorTemplate = {
	'target': '',
	'storedState': '',

	'class': '',
	'message': '',
}

var elementErrorList = [];

function clearElementError(elementError) {
	//console.log('clearElementError(' + elementError.target + ') called');

	// backwards delete loop
	for (var i = elementErrorList.length - 1; 0 <= i; i--) {
		if (elementError.target === elementErrorList[i].target) {
			elementErrorList.splice(i, 1);
		}
	}
}

function clearElementErrorGroup(elementErrorTargetArray) {
	//console.log('clearElementErrorGroup(' + elementErrorTargetArray + ') called');

	// any call that creates element errors must be responsible for cleaning them up
	elementErrorTargetArray.forEach(function(elementErrorTarget, i) {
		// identifies by id of jQuery DOM element instead of an elementErrorObject
		
		// backwards delete loop
		for (var j = elementErrorList.length - 1; 0 <= j; j--) {
			if (elementErrorTarget.attr('id') === elementErrorList[j].target) {
				elementErrorList.splice(j, 1);
			}
		}
	});
}

function addElementError(elementError) {
	//console.log('addElementError(' + elementError.target + ') called');

	// replace existing with new info
	clearElementError(elementError);
	if (elementErrorList.target !== "") {
		// only push to elementErrorList if the error has a target (and therefore is cleaned by a function)
		elementErrorList.push(elementError);
	}
}

function updateElementErrors() {
	//console.log('updateErrorElements() called');

	// list of all elementErrorClasses TODO keep me updated
	var elementErrorClasses = [
		'inputError',
	];
	
	// remove all error messages
	$('.elementErrorMessage').remove();
		
	// remove all error classes
	elementErrorClasses.forEach(function (elementErrorClass, i) {
		$(document.getElementsByClassName(elementErrorClass)).removeClass(elementErrorClass);
	});

	// add for each
	elementErrorList.forEach(function(elementError, i) {
		$(document.getElementById(elementError.target))
			// class
			.addClass(elementError.class)
			.after(
				// error message
				$('<div/>')
					.text(elementError.message)
					.addClass('elementErrorMessage')
			);
	});
}


//  ██╗   ██╗████████╗██╗██╗     ██╗████████╗██╗   ██╗
//  ██║   ██║╚══██╔══╝██║██║     ██║╚══██╔══╝╚██╗ ██╔╝
//  ██║   ██║   ██║   ██║██║     ██║   ██║    ╚████╔╝ 
//  ██║   ██║   ██║   ██║██║     ██║   ██║     ╚██╔╝  
//  ╚██████╔╝   ██║   ██║███████╗██║   ██║      ██║   
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝   
//                                                    

function serverCommand(data, callback) {
	console.log("serverCommand("+ data.request + ") called");
	$.ajax({
		// http://api.jquery.com/jquery.ajax/
		"url": "request.php",
		"type": "POST",
		"data": data,
		success: function(data){
			try {
				data = JSON.parse(data);
				console.log("Server data returned: " + data);
			} catch (e) {
				console.error("Parse error on data: " + data);
				console.error(e);
			}
			callback(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			var errorObject = {
				objectType: 'error',
				code: '',
				type: 'Ajax error',
				message: textStatus,
				origin: 'serverCommand()',
				target: '',
				class: '',
			}

			console.log(errorObject.origin + " - " + errorObject.type + ": " + errorObject.message);
			callback(errorObject);
		},
		complete: function(jqXHR, textStatus) {
			// update any displayed errors
			updateElementErrors();
		}
	});
}

function handleError(error) {
	console.log(error);

	var elementError = {
		target: error.target,
		storedState: $(document.getElementById(error.target)).val(),
		class: error.class,
		message: error.message,
	}

	addElementError(elementError);
}

// TODO implement api erros into new error format and handleError()
function logError(error) {
	// TODO update this method to handle errors from different sources
	var response = JSON.parse(error.response);

	var status = response.error.status;
	var message = response.error.message;

	console.error('Status: ' + status);
	console.error('Message: ' + message);
	console.error(error);
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


//   █████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗███████╗
//  ██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝██╔════╝
//  ███████║██║     ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   ███████╗
//  ██╔══██║██║     ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   ╚════██║
//  ██║  ██║╚██████╗╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   ███████║
//  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝
//                                                                       

function register(name, password1, password2, email,) {
	// takes input DOM elements
	var inputs = [
		name,
		password1,
		password2,
		email,
	];
	clearElementErrorGroup(inputs);

	serverCommand({
		'request': 'register',
		'name': name.val(),
		'password1': password1.val(),
		'password2': password2.val(),
		'email': email.val(),
	}, function (data) {
		// !!! is array if validation error
		if (!$.isArray(data)) {
			if (data.objectType == 'success') {
				// TODO handle success
				$('body').append(
					$('<p/>')
						.text(data.message)
				);

				// login (must be before entries are wiped)
				login(name, password1);

				// wipe entries
				inputs.forEach(function(input) {
					input.val('');
				});
			} else if (data.objectType == 'error') {
				handleError(data);
			}
		} else {
			// validation errors
			data.forEach(function (item) {
				handleError(item);
			});
		}
	});
}

function login(name, password) {
	// takes input DOM elements
	var inputs = [
		name,
		password,
	];
	clearElementErrorGroup(inputs);

	serverCommand({
		'request': 'login',
		'name': name.val(),
		'password': password.val(),
	}, function (data) {
		if (data.objectType == 'success') {
			// TODO handle success
			$('body').append(
				$('<p/>')
					.text(data.message)
			);

			// update page status/permissions
			$("#statusUser")
				.text(data.content);

			// wipe entries
			inputs.forEach(function(input) {
				input.val('');
			});
		} else if (data.objectType == 'error') {
			handleError(data);
		}
	});
}

function logout() {
	var inputs = [
	];
	clearElementErrorGroup(inputs);

	serverCommand({
		'request': 'logout',
	}, function (data) {
		if (data.objectType == 'success') {
			// TODO handle success
			$('body').append(
				$('<p/>')
					.text(data.message)
			);

			$("#statusUser")
				.text('Guest');
		} else if (data.objectType == 'error') {
			handleError(data);
		}
	});
}

function getCurrentUser() {
	var inputs = [
	];
	clearElementErrorGroup(inputs);

	serverCommand({
		'request': 'getCurrentUser',
	}, function (data) {
		if (data.objectType == 'success') {
			// TODO handle success
			$('body').append(
				$('<p/>')
					.text(data.message)
			);

			console.log(
				'id: ' + data.id,
				'name: ' + data.name,
				'email: ' + data.email,
			);
		} else if (data.objectType == 'error') {
			handleError(data);
		}
	});
}

function getUser(id) {
	// takes input DOM element
	var inputs = [
		'id'
	];
	clearElementErrorGroup(inputs);

	serverCommand({
		'request': 'getUser',
		'id': id.val(),
	}, function (data) {
		if (data.objectType == 'success') {
			// TODO handle success
			$('body').append(
				$('<p/>')
					.text(data.message)
			);

			console.log(
				'id: ' + data.id,
				'name: ' + data.name,
			);
		} else if (data.objectType == 'error') {
			handleError(data);
		}
	});
}


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗███████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝██╔════╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   ███████╗
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   ╚════██║
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   ███████║
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝
//                                                                       

function addPlaylist(title, visibility, description, color, image) {
	// takes input DOM elements
	var inputs = [
		title,
		visibility,
		description,
		color,
		image,
	];
	clearElementErrorGroup(inputs);

	serverCommand({
		'request': 'addPlaylist',
		'title': title.val(),
		'visibility': visibility.val(),
		'description': description.val(),
		'color': color.val(),
		'image': image.val(),
	}, function (data) {
		if (data.objectType == 'success') {
			// TODO handle success
			$('body').append(
				$('<p/>')
					.text(data.message)
			);

			// wipe entries
			inputs.forEach(function(input) {
				input.val('');
			});
		} else if (data.objectType == 'error') {
			handleError(data);
		}
	});
}

function deletePlaylist(id) {
	// takes input DOM element
	var inputs = [
		id,
	];
	clearElementErrorGroup(inputs);

	serverCommand({
		'request': 'deletePlaylist',
		'id': id.val(),

	}, function (data) {
		if (data.objectType == 'success') {
			// TODO handle success
			$('body').append(
				$('<p/>')
					.text(data.message)
			);

			// wipe entries
			inputs.forEach(function(input) {
				input.val('');
			});
		} else if (data.objectType == 'error') {
			handleError(data);
		}
	});
}

function getPlaylist(id) {
	// takes input DOM element
	var inputs = [
		id,
	];
	clearElementErrorGroup(inputs);

	serverCommand({
		'request': 'getPlaylist',
		'id': id.val(),
	}, function (data) {
		if (data.objectType == 'playlist') {
			// TODO handle success
			console.log(data);

			// wipe entries
			inputs.forEach(function(input) {
				input.val('');
			});
		} else if (data.objectType == 'error') {
			handleError(data);
		}
	});
}

function addTrack(track, playlistId) {
	// takes DOM element that has JQuery .data('track'), and an input for with the playlist Id TODO change this later
	var inputs = [
		playlistId
	];
	clearElementErrorGroup(inputs);
	
	serverCommand({
		'request': 'addTrack',
		'playlistId': playlistId.val(),
		'source': track.data('track').source,
		'id': track.data('track').id,
		'title': track.data('track').title,
		'artists': track.data('track').artists,
		'duration': track.data('track').duration,
	}, function (data) {
		if (data.objectType == 'success') {
			// TODO handle success
			$('body').append(
				$('<p/>')
					.text(data.message)
			);

			console.log('addTrack success');

			// wipe entries
			inputs.forEach(function(input) {
				input.val('');
			});
		} else if (data.objectType == 'error') {
			handleError(data);
		}
	});
}


//  ███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
//  ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
//  ███████╗█████╗  ███████║██████╔╝██║     ███████║
//  ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
//  ███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
//  ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
//                                                  

var searchResults = {
	// details
	'term': "",
	'tracksPerSource': 5,
	'page': 1,

	// sources
	'spotify': [],
	'youtube': [],
	'soundcloud': [],
}

// spotify
// https://beta.developer.spotify.com/documentation/web-api/
var spotifyAPI = new SpotifyWebApi();
spotifyAPI.setAccessToken(spotifyAccessToken);

// youtube
function loadYoutubeDataApi() {
	// https://api.jquery.com/jquery.getscript/
	$.getScript('https://apis.google.com/js/api.js', function() {
		// original code: https://developers.google.com/youtube/v3/docs/search/list
	
		// https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiloadlibraries-callbackorconfig
		// load(libraries, callback{});
		gapi.load('client:auth2', function() {
			// Initialize the gapi.client object, which app uses to make API requests.
			// https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientinitargs
			gapi.client.init({
					'clientId': '575534136905-vgdfpnd34q1o701grha9i9pfuhm1lvck.apps.googleusercontent.com',
					'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
					// at least one scope is needed, this is the bare minimum scope
					'scope': 'https://www.googleapis.com/auth/youtube.readonly'
			}).then(function () {
				console.log('Youtube Data API loaded and initialized')
			});
		});
	});
}

// search

function search(term) {
	// spotify
	var options = {
		// max number of results to return, min 1, max 50, default 20
		limit: searchResults.tracksPerSource,
		// offset of first result, use with limit to get paged results min 0, max 100 000, default 0
		offset: searchResults.tracksPerSource * (searchResults.page - 1),
	};

	spotifyAPI.searchTracks(term, options, function(error, response) {
		if (error) {
			console.error('search() spotify failure');
			logError(error);
		}

		if (response) {
			console.log('search() spotify success');
			console.log(response);

			// update searchResults
			searchResults.term = term;
			formatSourceResult('spotify', response, function(trackList) {
				searchResults.spotify = trackList;

				// update page
				refreshSearchResults();
			});
		}
	});

	// youtube
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

	gapi.client.request(args).then(function(fufilled, rejected) {
		if (fufilled) {
			console.log('search() youtube success');
			console.log(fufilled);

			searchResults.term = term;
			formatSourceResult('youtube', fufilled.result, function(trackList) {
				searchResults.youtube = trackList;

				// update page
				refreshSearchResults();
			});
		} else {
			console.error('search() youtube failure');
			console.error(rejected);
		}
	});	
}

function formatSourceResult(source, object, callback) {
	// source cases
	if (source == 'spotify') {
		getSpotifyTrackDetails(object.tracks.items, function(trackList) {
			callback(trackList);
		});
	} else if (source == 'youtube') {
		// this id array needs to stay outside of youtubeGetTrackDetails() because this function is used elsewhere with a specific id reference
		var idArray = [];

		object.items.forEach(function (track, i) {
			idArray.push(track.id.videoId);
		});

		youtubeGetTrackDetails(idArray, function(trackList) {
			callback(trackList);
		});
	}
}

function getSpotifyTrackDetails(items, callback) {
	// array of track objects
	var trackList = [];

	// takes spotify's response.tracks.items array
	items.forEach(function (track, i) {
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

		// fill array
		track.artists.forEach(function (artist, j) {
			trackList[i].artists[j] = artist.name;
		});
	});

	callback(trackList);
}

function youtubeGetTrackDetails(ids, callback) {
	// array of track objects
	var trackList = [];

	var all = ids.join(",");
	var args = {
		method: 'GET',
		path: '/youtube/v3/videos',
		params: {
			id: all,
			part: 'snippet,contentDetails',
		}
	};

	// https://developers.google.com/youtube/v3/docs/videos/list
	gapi.client.request(args).then(function(fufilled, rejected) {
		if (fufilled) {
			console.log('youtubeGetTrackDetails() success');
			console.log(fufilled);

			fufilled.result.items.forEach(function (track, i) {
				trackList[i] = new Track();

				trackList[i].source = 'youtube';
				trackList[i].id = track.id;

				// convert artist - title format
				// TODO make better regex
				var stringSplit = track.snippet.title.split(/( +- +)/);
				if (stringSplit.length === 2) {
					console.log('split on " - "');
					var artistSplit = stringSplit[0].split(/( +[&x] +)/);
					artistSplit.forEach(function(artist) {
						// fill artists
						trackList[i].artists.push(artist);
					});
					trackList[i].title = stringSplit[1];
				} else {
					trackList[i].artists = [track.snippet.channelTitle];
					trackList[i].title = track.snippet.title;
				}

				// convert ISO_8601 duration to milliseconds
				trackList[i].duration = moment.duration(track.contentDetails.duration, moment.ISO_8601).asMilliseconds();
				trackList[i].link = YOUTUBE_ID_PREFIX + trackList[i].id;	
			});
			
			callback(trackList);
		} else {
			console.error('youtubeGetTrackDetails() failure');
			console.error(rejected);

			callback(false);
		}
	});
}

function refreshSearchResults() {
	console.log('refreshSearchResults() called');

	// delete old list
	$(".searchResult").remove();

	// arrange and display new list
	var arrangedList = arrangeResults('mix', ['spotify', 'youtube']);
	console.log(arrangedList);
	displayList(arrangedList);
}

function arrangeResults(type, selection) {
	console.log('arrangeResults() called');

	var arrangedResults = [];
	var totalLength = searchResults.tracksPerSource * searchResults.page * selection.length;
	
	// [a, b, c, a, b, c]
	if (type == 'mix') {
		// loop for at maximum the amount of tracks requested (incase only one source exists)
		for (var i = 0; i < totalLength; i++) {
			// loop through each source
			selection.forEach(function(source) {
				// if the source has a track at index i
				if (searchResults[source][i]) {
					// push it to arrangedResults
					arrangedResults.push(searchResults[source][i]);
				}
			});

			// old, not needed anymore, pushed values will be of known length
			// once/if arrangedResults is filled with the requested number of tracks, break
			//if (arrangedResults.length =< number) { break; }
		}

		return arrangedResults;
	}

	// [a, a, b, b, c, c]
	// if (type == 'sequence') {
	// 	var fromEach = floor(number / selection.length);
	// }
}

function displayList(trackList) {
	console.log('displayList() called');

	trackList.forEach(function(track, index) {
		$('#list').append(
			$('<li/>')
				.data('track', track)
				.addClass('searchResult')
				.addClass('resultNumber' + index)
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


//  ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗ ███████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗██╔════╝
//  ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝███████╗
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗╚════██║
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║███████║
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝
//                                                           

// spotify
function spotifySetupPlayer() {
	// sets up a local Spotify Connect device, but cannot play or search tracks (limited to modifying playback state, but don't do that here)
	// API can make playback requests to the currently active device, but wont do anything if there isn't one active, this launches one
	// https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-connect

	// TODO requires spotifyAccessToken, if this changes (ie. token frefresh, account swap) how does player get updated? 

	// https://api.jquery.com/jquery.getscript/
	$.getScript('https://sdk.scdn.co/spotify-player.js');
	// must be defined immediately after spotify-player.js, acts as the callback function
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

			console.log('spotify player ready');
			spotifyAPI.transferMyPlayback([device_id], {}, function(error, response) {
				// https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
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
		});

		// connect to player
		player.connect().then(success => {
			if (success) {
				// connection success, but still might not be ready, will trigger the ready listener when ready
				console.log('player.connect() spotify success');
			} else {
				// TODO player connect failed
				console.log('player.connect() spotify failure');
			}
		});
	};
}

// youtube
var youtubePlayer;

// youtubePlayer.destroy() kills the iframe

function youtubeSetupPlayer() {
	console.log('youtubeSetupPlayer() called');

	$.getScript('https://www.youtube.com/iframe_api');
}

// script callback
function onYouTubeIframeAPIReady() {
	console.log('youTubeIframeAPIReady');
	// https://developers.google.com/youtube/iframe_api_reference#Playback_status
	// (DOM element, args)
	youtubePlayer = new YT.Player('youtubePlayer', {
		height: '100%',
		width: '100%',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// player callback
function onPlayerReady(event) {
	console.log('youtubePlayer ready');
}

function onPlayerStateChange(event) {
}

//  ██████╗ ██╗      █████╗ ██╗   ██╗██████╗  █████╗  ██████╗██╗  ██╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██████╔╝███████║██║     █████╔╝ 
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══██╗██╔══██║██║     ██╔═██╗ 
//  ██║     ███████╗██║  ██║   ██║   ██████╔╝██║  ██║╚██████╗██║  ██╗
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
//   

// track object prototype
function Track() {
	this.objectType = 'track';
	this.source = '';
	this.id = '';
	this.artists = [];
	this.title = '';
	this.duration = '';
	this.link = '';
}

var desiredPlayback = {
	'playing': false,
	'progress': 0,
	'track': new Track(),
};

var actualPlayback = {
	'spotify': {
		playing: false,
		progress: 0,
		track: new Track(),
	},
	'youtube': {
		playing: false,
		progress: 0,
		track: new Track(),
	},
};

function checkPlaybackState(callback) {
	// async part counting
	var finished = 0;
	var parts = 2;
	function completeParts() {
		finished++;
		if (finished >= parts) {
			callback();
		}
	}

	// spotify
	spotifyAPI.getMyCurrentPlaybackState({}, function(error, response) {
		if (error) {
			console.error('checkPlaybackState() spotify failure');
			logError(error);

			completeParts();
		} else if (response) {
			console.log('checkPlaybackState() spotify success');

			// TODO will cause an error if no track is playing, will break this entire function
			actualPlayback.spotify.playing = response.is_playing;
			actualPlayback.spotify.progress = response.progress_ms;
			actualPlayback.spotify.track = {
				source: 'spotify',
				id: response.item.id,
				artists: [],
				title: response.item.name,
				duration: response.item.duration_ms,
				link: response.item.external_urls.spotify,
			}

			// fill artists
			response.item.artists.forEach(function (artist, j) {
				actualPlayback.spotify.track.artists[j] = artist.name;
			});
			completeParts();
		}
	});

	// youtube
	var state = youtubePlayer.getPlayerState();
	if (state == 1 || state == 3) {
		// playing or buffering
		actualPlayback.youtube.playing = true;
	} else {
		actualPlayback.youtube.playing = false;
	}
	
	actualPlayback.youtube.progress = youtubePlayer.getCurrentTime() * 1000;

	// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
	var id = youtubePlayer.getVideoUrl().split("v=")[1];
	if (!id) { id = ''; }
	var andPosition = id.indexOf("&"); 
	if (andPosition != -1) { id = id.substring(0, andPosition); }
	console.log('original: ' + youtubePlayer.getVideoUrl() + '\nid: ' + id);

	youtubeGetTrackDetails([id], function(trackList) {
		console.log('checkPlaybackState() youtube success');
		if (trackList.length !== 0) {
			actualPlayback.youtube.track = trackList[0];
		}
		completeParts();
	});
}

function updatePlaybackState() {
	checkPlaybackState(function() {
		// no progress comparison made here
		if (!desiredPlayback.playing) {
			if (actualPlayback.spotify.playing) { pause('spotify'); }
			if (actualPlayback.youtube.playing) { pause('youtube'); }
		} else if (desiredPlayback.playing) {
			if (desiredPlayback.track.source == 'spotify') {
				if (!actualPlayback.spotify.playing) { resume('spotify'); }
				if (actualPlayback.youtube.playing) { pause('youtube'); }

				if (desiredPlayback.track.id != actualPlayback.spotify.track.id) { start('spotify', desiredPlayback.track.id); };
			} else if (desiredPlayback.track.source == 'youtube') {
				if (!actualPlayback.youtube.playing) { resume('youtube'); }
				if (actualPlayback.spotify.playing) { pause('spotify'); }
				console.log('Desired id: ' + desiredPlayback.track.id + 'Actual id: ' + actualPlayback.youtube.track.id);
				if (desiredPlayback.track.id != actualPlayback.youtube.track.id) { start('youtube', desiredPlayback.track.id); };
			}
		}
	});
}


//   ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     
//  ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     
//  ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     
//  ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     
//  ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗
//   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
//                                                               

function start(source, id) {
	if (source == 'spotify') {
		console.log("start('spotify') called");

		spotifyAPI.play({"uris":["spotify:track:" + id]}, function(error, response) {
			if (error) {
				console.error('start() failure');
				logError(error);
			}
	
			if (response) {
				console.log('start() success');
				console.log(response);
			}
		});
	} else if (source == 'youtube') {
		console.log("start('youtube') called");

		youtubePlayer.loadVideoById(id);
		youtubePlayer.playVideo();
	}
}

function resume(source) {
	if (source == 'spotify') {
		console.log("resume('spotify') called");

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
	} else if (source == 'youtube') {
		console.log("resume('youtube') called");

		youtubePlayer.playVideo();
	}
}

function pause(source) {
	if (source == 'spotify') {
		console.log("pause('spotify') called");

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
	} else if (source == 'youtube') {
		console.log("pause('youtube') called");

		youtubePlayer.pauseVideo();
	}
}

function seek(source, ms) {
	if (source == 'spotify') {
		console.log("seek('spotify') called");

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
	} else if (source == 'youtube') {
		console.log("seek('youtube') called");

		// (seconds - number, allowSeekAhead of loading - boolean)
		youtubePlayer.seekTo(Math.round(ms / 1000), true)
	}
}


//  ██████╗  █████╗  ██████╗ ███████╗
//  ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
//  ██████╔╝███████║██║  ███╗█████╗  
//  ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
//  ██║     ██║  ██║╚██████╔╝███████╗
//  ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
//                                   

// list
$(document).on("click", ".searchResultPreview", function() {
	console.log(".searchResultPreview clicked");

	// TODO make a function that does this, and just pass the DOM elemetn that has .data('track'), like .addTrack does

	desiredPlayback.track = $(this).parent().data('track');
	desiredPlayback.playing = true;
	updatePlaybackState();
});

$(document).on("click", ".addTrack", function() {
	console.log(".addTrack clicked");

	addTrack($(this).parent(), $('#playlistId'));
});

// connect
$(document).on("click", "#spotifyConnectAccount", function() {
	console.log("#spotifyConnectAccount clicked");
	//serverCommand({request: 'spotifyConnectAccount'}, function (data) {});
	window.location.href = "auth.php?source=spotify";
});

$(document).on("click", "#connectPlayer", function() {
	console.log("#connectPlayer clicked");

	spotifySetupPlayer();
	youtubeSetupPlayer();
});

// page
$(document).on("click", "#search", function() {
	console.log("#search clicked");

	search($('#uri').val());
});

$(document).on("click", "#toggle", function() {
	console.log("#toggle clicked");

	desiredPlayback.playing = !desiredPlayback.playing;
	updatePlaybackState();
});

$(document).on("click", "#seek", function() {
	console.log("#seek clicked");

	seek(20000);
});

// account
$(document).on("click", "#registerSubmit", function() {
	console.log("#registerSubmit clicked");

	register($('#registerUserName'), $('#registerPassword1'), $('#registerPassword2'), $('#registerEmail'));
});

$(document).on("click", "#loginSubmit", function() {
	console.log("#loginSubmit clicked");

	login($('#loginUserName'), $('#loginPassword'));
});

$(document).on("click", "#logoutSubmit", function() {
	console.log("#logoutSubmit clicked");
	logout();
});

// playlist
$(document).on("click", "#addPlaylistSubmit", function() {
	console.log("#addPlaylistSubmit clicked");
	addPlaylist($('#playlistTitle'), $('#playlistVisibility'), $('#playlistDescription'), $('#playlistColor'), $('#playlistImage'));
});

$(document).on("click", "#deletePlaylistSubmit", function() {
	console.log("#deletePlaylistSubmit clicked");
	deletePlaylist($('#playlistId'));
});

$(document).on("click", "#getPlaylistSubmit", function() {
	console.log("#getPlaylistSubmit clicked");
	getPlaylist($('#playlistId'));
});

