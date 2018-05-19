//  ████████╗ ██████╗ ██████╗  ██████╗     ██╗     ██╗███████╗████████╗
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗    ██║     ██║██╔════╝╚══██╔══╝
//     ██║   ██║   ██║██║  ██║██║   ██║    ██║     ██║███████╗   ██║   
//     ██║   ██║   ██║██║  ██║██║   ██║    ██║     ██║╚════██║   ██║   
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝    ███████╗██║███████║   ██║   
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝     ╚══════╝╚═╝╚══════╝   ╚═╝   
//                                                                     

// TODO break every part of the code, see if errors are handled properly
// TODO go through and make error handlers for everything, including making callbacks all the way up function trees
// TODO .on() should be bound to the closest non-dynamic element (cause its faster?)
	// .on('click'... is a delegated event (?) and is needed to work on dynamically generated elements
	// .on() needs to bind to the target element, one that is guaranteed to exist on page creation, however the selector then filters for elements which might not exist yet
// TODO maxlength attribute can be used for input elements, use this to get real-time validation checks for max lenth
// TODO the property objectType may not be needed??? as there might be functions to access the name of the class already, but im not sure
// TODO handle success messages on successful server commands

// TODO some playback/control errors probably to do with the checking
// TODO playback and control conversion and testing

// TODO maybe make source objects with all their respective functions so that they can be called dynamically: globalSourceObject[source].play(callback);

// test
$("#test").click(function() {
	getCurrentUser();
});


//   ██████╗ ██╗      ██████╗ ██████╗  █████╗ ██╗     
//  ██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔══██╗██║     
//  ██║  ███╗██║     ██║   ██║██████╔╝███████║██║     
//  ██║   ██║██║     ██║   ██║██╔══██╗██╔══██║██║     
//  ╚██████╔╝███████╗╚██████╔╝██████╔╝██║  ██║███████╗
//   ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
//                                                    

// constants

// globals
var spotify = new SjSource({
//	name: 'spotify',
});

var youtube = new SjSource({
//	name: 'youtube',
});

// reference is required here because these SjSource objects can be accessed either through the sourceList or by their own name
var sourceList = {
	// TODO requires no prototype properties, or else will require different loop interactions
	'spotify': spotify,
	'youtube': youtube,
};

youtube.idPrefix = 'https://www.youtube.com/watch?v=';

// data objects
function SjObject(obj) {
	this.objectType = 'SjObject';

	// debug
	// include log: true, in parameter list if object should be announced on creation, else just call obj.announce if wanted at a later time, this essentially replaces need for console.log in functions (still one line) - but with additional capability to get information from an anonymous class (return new SjObject()), doing it the other way (boolean for not annoucning on create) creats more problems and still requires writing lines and patches ---> its just better to do a positive action
	this.log = typeof obj.log === 'undefined' ? false : obj.log;
	this.announce = function () {
		//var string = 'origin:\n     ' +this.origin +'\nobjectType:\n     ' +this.objectType +'\nreason:\n     ' +this.reason;
		var string = this.origin +'\n' +this.objectType +'\n' +this.reason;
		if (isError(this)) {
			console.error(string);
		} else {
			console.log(string);
		}
	}

	this.onCreate = function () {
		if (this.log === true) {
			this.announce();
		}
	}

	// what
	this.code = typeof obj.code === 'undefined' ? '' : obj.code;
	this.type = typeof obj.type === 'undefined' ? '' : obj.type;
	this.origin = typeof obj.origin === 'undefined' ? '' : obj.origin;

	// return
	this.message = typeof obj.message === 'undefined' ? '' : obj.message;
	// if no reason is given, reason is the same as the message
	this.reason = typeof obj.reason === 'undefined' ? this.message : obj.reason; 
	this.content = typeof obj.content === 'undefined' ? '' : obj.content;

	// element
	this.target = typeof obj.target === 'undefined' ? '' : obj.target;
	this.class = typeof obj.class === 'undefined' ? '' : obj.class;

	// all child objects should call SjObject.call(this, obj);, this is like calling the super constructor
	// "The call() method calls a function with a given this value and arguments provided individually."	
}

function SjSuccess(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjSuccess';

	// what
	this.code = typeof obj.code === 'undefined' ? '200' : obj.code;
	this.type = typeof obj.type === 'undefined' ? 'Ok' : obj.type;

	// return
	this.reason = typeof obj.reason === 'undefined' ? '' : obj.reason;

	this.onCreate();
}

function SjError(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjError';

	// what
	this.code = typeof obj.code === 'undefined' ? '400' : obj.code;
	this.type = typeof obj.type === 'undefined' ? 'Bad Request' : obj.type;

	this.onCreate();
}

function SjErrorList(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjErrorList';

	// what
	this.code = typeof obj.code === 'undefined' ? '400' : obj.code;
	this.type = typeof obj.type === 'undefined' ? 'Bad Request' : obj.type;

	// return
	this.reason = typeof obj.reason === 'undefined' ? 'One or more errors from multiple parts' : obj.reason;
	this.content = typeof obj.content === 'undefined' ? [] : obj.content;

	this.onCreate();
}

function SjTrack(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjTrack';

	// what
	this.code = typeof obj.code === 'undefined' ? '200' : obj.code;
	this.type = typeof obj.type === 'undefined' ? 'Ok' : obj.type;

	// new properties
	this.playlistId = typeof obj.playlistId === 'undefined' ? '' : obj.playlistId;
	this.position = typeof obj.position === 'undefined' ? '' : obj.position;
	this.source = typeof obj.source === 'undefined' ? '' : obj.source;
	this.id = typeof obj.id === 'undefined' ? '' : obj.id; // !!! assumes ids are unique, even across all sources
	this.artists = typeof obj.artists === 'undefined' ? [] : obj.artists;
	this.title = typeof obj.title === 'undefined' ? '' : obj.title;
	this.duration = typeof obj.duration === 'undefined' ? '' : obj.duration;
	this.link = typeof obj.link === 'undefined' ? '' : obj.link;

	this.onCreate();
}

function SjPlaylist(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjPlaylist';

	// what
	this.code = typeof obj.code === 'undefined' ? '200' : obj.code;
	this.type = typeof obj.type === 'undefined' ? 'Ok' : obj.type;

	// return
	this.content = typeof obj.content === 'undefined' ? [] : obj.content;

	// new properties
	this.id = typeof obj.id === 'undefined' ? '' : obj.id;
	this.userId = typeof obj.userId === 'undefined' ? '' : obj.userId;
	this.title = typeof obj.title === 'undefined' ? '' : obj.title;
	this.visibility = typeof obj.visibility === 'undefined' ? '' : obj.visibility;
	this.description = typeof obj.description === 'undefined' ? '' : obj.description;
	this.color = typeof obj.color === 'undefined' ? '' : obj.color;
	this.image = typeof obj.image === 'undefined' ? '' : obj.image;

	this.onCreate();
}

function SjUser(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjUser';

	// what
	this.code = typeof obj.code === 'undefined' ? '200' : obj.code;
	this.type = typeof obj.type === 'undefined' ? 'Ok' : obj.type;

	// new properties
	this.id = typeof obj.id === 'undefined' ? '' : obj.id;
	this.name = typeof obj.name === 'undefined' ? '' : obj.name;
	this.email = typeof obj.email === 'undefined' ? '' : obj.email;

	this.onCreate();
}

function SjSource(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjSource';

	// new properties
	//this.name = typeof obj.name === 'undefined' ? '' : obj.name;
	this.idPrefix = typeof obj.name ==='undefined' ? '' : obj.idPrefix;
	
	// api
	this.loadApi = typeof obj.loadApi === 'undefined' ? function (){} : obj.loadApi;
	this.loadPlayer = typeof obj.loadPlayer === 'undefined' ? function (){} : obj.loadPlayer;

	// search
	this.search = typeof obj.search === 'undefined' ? function (){} : obj.search;
	this.getTracks = typeof obj.getTracks === 'undefined' ? function (){} : obj.getTracks;

	// playback
	this.checkPlayback = typeof obj.checkPlayback === 'undefined' ? function (){} : obj.checkPlayback;
	this.start = typeof obj.start === 'undefined' ? function (){} : obj.start;
	this.resume = typeof obj.resume === 'undefined' ? function (){} : obj.resume;
	this.pause = typeof obj.pause === 'undefined' ? function (){} : obj.pause;
	this.seek = typeof obj.seek === 'undefined' ? function (){} : obj.seek;

	this.onCreate();
}

// function objects
function AsyncList(obj) {
	// counts completed async functions, when all are finished callsback a function that passes the result which is either a SjSuccess object (if all succeeded) or an SjErrorList object (if some failed)
	// don't need to set log: true, for success and errorList objects, they are announced on completion

	// TODO add timeout?

	this.count = 0;
	this.totalCount = typeof obj.totalCount === 'undefined' ? 0 : obj.totalCount;
	this.success = typeof obj.success === 'undefined' ? new SjSuccess({}) : obj.success;
	this.errorList = typeof obj.errorList === 'undefined' ? new SjErrorList({}) : obj.errorList;
	this.callback = typeof obj.callback === 'undefined' ? function (result) {} : obj.callback;

	this.addIfError = function (obj) {
		if (isError(obj)) {
			this.errorList.content.push(obj);
		}
	}

	this.isComplete = function () {
		if (this.count >= this.totalCount) {
			return true;
		} else {
			return false;
		}
	}

	this.result = function () {
		if (this.errorList.content.length === 0) {
			this.success.announce();
			return this.success;
		} else {
			this.errorList.announce();
			return this.errorList;
		}
	}

	this.endPart = function () {
		this.count++;
		if (this.isComplete) {
			this.callback(this.result);
		}
	}
}


//  ███████╗██████╗ ██████╗  ██████╗ ██████╗ 
//  ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
//  █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝
//  ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗
//  ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║
//  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
//                                           

// top level error handling, only call after error has propegated to a top level function
function handleError(error) {
	if (matchType(error, 'SjError')) {
		console.error(error);
		addElementError(error);
	} else if (matchType(error, 'SjErrorList')) {
		error.content.forEach(function (item) {
			console.error(error);
			addElementError(error);
		});
	} else {
		console.error(catchUnexpected(error));
		addElementError(catchUnexpected(error));
	}
}

function propagateError(obj) {
	// wrapper code for repeated error handling where: one or many SjObject results are expected, SjErrors are propagated, and anything else needs to be caught and transformed into a proper SjError
	if (isError(obj)) {
		return obj;
	} else {
		return catchUnexpected(obj);
	}
}

function catchUnexpected(obj) {
	// determines type of input, creates, announces, and returns a proper SjError object
	// use in final else {} to catch any objects(or variables) that havent been caught yet (those that are unexpected)

	var error = new SjError({
		message: 'function received unexpected result',
		content: obj,
	});

	if (matchType(obj, 'undefined')) {
		error.reason = 'object is undefined';
	} else if (matchType(obj, 'null')) {
		error.reason = 'object is null';
	} else if (matchType(obj), 'object') {
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

function isError(obj) {
	// checks for proper SjObject error types
	if (matchType(obj, 'SjError') || matchType(obj, 'SjErrorList')) {
		return true;
	} else {
		return false;
	}
}

// element errors
var elementErrorList = new SjErrorList({
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

	// list of all elementErrorClasses TODO keep me updated
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
				// TODO convert data objects from php to javascript
				console.log("data successfully returned and parsed: " + data);
				callback(data);
			} catch (e) {
				var error = new SjError({
					log: true,

					type: 'parse error',
					origin: 'serverCommand()',

					message: 'server error occured',
					reason: e,
					content: data,

					target: 'notify',
					class: 'notifyError',
				});
				console.log(data);
				callback(error);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			var error = new SjError({
				log: true,

				type: 'ajax error',
				origin: 'serverCommand()',

				message: 'could not send command to server',
				reason: textStatus,

				target: 'notify',
				class: 'notifyError',
			});

			callback(errorObject);
		},
		complete: function(jqXHR, textStatus) {
			// update any element errors
			updateElementErrors();
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

function matchType(input, match) {
	// this function is needed for convinience and to catch undefined variables, simply checking obj.objectType === 'Sj___' does not catch unexpected variables (such as non-SJ objects or just non-objects, let alone possible undefined variables)

	if (typeof input === match) {
		// if base object type is matched
		return true;
	} else if (typeof input.objectType === 'string') {
		// if input has an objectType property
		if (input.objectType === match) {
			// if objectType is matched
			return true;
		} else {
			// if objectType cannot be matched
			return false;
		}
	} else {
		// if base type cannot be matched and has no objectType
		return false;
	}
};

//  ██╗   ██╗███████╗███████╗██████╗ 
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
//                                   

function register(name, password1, password2, email,) {
	// takes input DOM elements
	var inputs = [
		name,
		password1,
		password2,
		email,
	];
	clearElementErrorList(inputs);

	serverCommand({
		'request': 'register',
		'name': name.val(),
		'password1': password1.val(),
		'password2': password2.val(),
		'email': email.val(),
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);

			// login
			login(name, password1);

			// finally, wipe inputs
			inputs.forEach(function(input) { input.val(''); });
		} else {
			handleError(data);
		}

		return data;
	});
}

function login(name, password) {
	// takes input DOM elements
	var inputs = [
		name,
		password,
	];
	clearElementErrorList(inputs);

	serverCommand({
		'request': 'login',
		'name': name.val(),
		'password': password.val(),
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);

			// update page status/permissions
			$("#statusUser")
				.text(data.content);

			// finally, wipe inputs
			inputs.forEach(function(input) { input.val(''); });
		} else {
			handleError(data);
		}

		return data;
	});
}

function logout() {
	var inputs = [
	];
	clearElementErrorList(inputs);

	serverCommand({
		'request': 'logout',
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);

			$("#statusUser")
				.text('Guest');
		} else {
			handleError(data);
		}

		return data;
	});
}

function getCurrentUser() {
	var inputs = [
	];
	clearElementErrorList(inputs);

	serverCommand({
		'request': 'getCurrentUser',
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);
		} else {
			handleError(data);
		}

		return data;
	});
}

function getUser(id) {
	// takes input DOM element
	var inputs = [
		id
	];
	clearElementErrorList(inputs);

	serverCommand({
		'request': 'getUser',
		'id': id.val(),
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);

			// finally, wipe inputs
			inputs.forEach(function(input) { input.val(''); });
		} else {
			handleError(data);
		}

		return data;
	});
}


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝   
//                                                               

// playlists
function addPlaylist(title, visibility, description, color, image) {
	// takes input DOM elements
	var inputs = [
		title,
		visibility,
		description,
		color,
		image,
	];
	clearElementErrorList(inputs);

	serverCommand({
		'request': 'addPlaylist',
		'title': title.val(),
		'visibility': visibility.val(),
		'description': description.val(),
		'color': color.val(),
		'image': image.val(),
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);

			// finally, wipe inputs
			inputs.forEach(function(input) { input.val(''); });
		} else {
			handleError(data);
		}

		return data;
	});
}

function getPlaylist(id) {
	// takes input DOM element
	var inputs = [
		id,
	];
	clearElementErrorList(inputs);

	serverCommand({
		'request': 'getPlaylist',
		'id': id.val(),
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);

			// finally, wipe inputs
			inputs.forEach(function(input) { input.val(''); });
		} else {
			handleError(data);
		}

		return data;
	});
}

function deletePlaylist(id) {
	// takes input DOM element
	var inputs = [
		id,
	];
	clearElementErrorList(inputs);

	serverCommand({
		'request': 'deletePlaylist',
		'id': id.val(),
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);

			// finally, wipe inputs
			inputs.forEach(function(input) { input.val(''); });
		} else {
			handleError(data);
		}

		return data;
	});
}

function orderPlaylist(id) {
	// takes input DOM element
	var inputs = [
		id,
	];
	clearElementErrorList(inputs);

	serverCommand({
		'request': 'orderPlaylist',
		'id': id.val(),
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);

			// finally, wipe inputs
			inputs.forEach(function(input) { input.val(''); });
		} else {
			handleError(data);
		}

		return data;
	});
}

// tracks
function addTrack(track, playlistId) {
	// takes DOM element that has JQuery .data('track'), and an input for with the playlist Id TODO change this later
	var inputs = [
		playlistId
	];
	clearElementErrorList(inputs);
	
	serverCommand({
		'request': 'addTrack',
		'playlistId': playlistId.val(),
		'source': track.data('track').source,
		'id': track.data('track').id,
		'title': track.data('track').title,
		'artists': track.data('track').artists,
		'duration': track.data('track').duration,
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);

			// finally, wipe inputs
			inputs.forEach(function(input) { input.val(''); });
		} else {
			handleError(data);
		}

		return data;
	});
}

function deleteTrack(playlistId, position) {
	// takes input DOM element
	var inputs = [
		playlistId,
		position
	];
	clearElementErrorList(inputs);

	serverCommand({
		'request': 'deleteTrack',
		'playlistId': playlistId.val(),
		'position': position.val(),
	}, function (data) {
		if (matchType(data, 'SjSuccess')) {
			console.log('Success: ' + data);

			// finally, wipe inputs
			inputs.forEach(function(input) { input.val(''); });
		} else {
			handleError(data);
		}

		return data;
	});
}


//   █████╗ ██████╗ ██╗
//  ██╔══██╗██╔══██╗██║
//  ███████║██████╔╝██║
//  ██╔══██║██╔═══╝ ██║
//  ██║  ██║██║     ██║
//  ╚═╝  ╚═╝╚═╝     ╚═╝
//                     

// api
spotify.loadApi = function () {
	// https://beta.developer.spotify.com/documentation/web-api/

	// window is basically the global object and is how to define variables within a function
	window.spotifyApi = new SpotifyWebApi();
	spotifyApi.setAccessToken(spotifyAccessToken);
}

youtube.loadApi = function () {
	// https://api.jquery.com/jquery.getscript/
	$.getScript('https://apis.google.com/js/api.js', function() {
		// original code: https://developers.google.com/youtube/v3/docs/search/list
	
		// https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiloadlibraries-callbackorconfig
		// load(libraries, callback{});
		gapi.load('client:auth2', function() {
			// Initialize the gapi.client object, which app uses to make API requests.
			// https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientinitargs
			gapi.client.init({
					'apiKey': 'AIzaSyA8XRqqzcwUpMd5xY_S2l92iduuUMHT9iY',
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

// player
spotify.loadPlayer = function () {
	// sets up a local Spotify Connect device, but cannot play or search tracks (limited to modifying playback state, but don't do that here)
	// API can make playback requests to the currently active device, but wont do anything if there isn't one active, this launches one
	// https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-connect

	// TODO requires spotifyAccessToken, if this changes (ie. token frefresh, account swap) how does player get updated? 

	// https://api.jquery.com/jquery.getscript/
	$.getScript('https://sdk.scdn.co/spotify-player.js');
	// must be defined immediately after spotify-player.js, acts as the callback function
	window.onSpotifyWebPlaybackSDKReady = function () {
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
			spotifyApi.transferMyPlayback([device_id], {}, function(error, result) {
				// https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
				// this function doesn't send a callback, is that a bug or intentional?
		
				// if (error) {
				// 	console.error('transferMyPlayback() failure');
				// 	logError(error);
				// }
		
				// if (result) {
				// 	console.log('transferMyPlayback() success');
				// 	console.log(result);
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

youtube.loadPlayer = function () {
	console.log('youtubeSetupPlayer() called');

	$.getScript('https://www.youtube.com/iframe_api');

	// callback
	window.onYouTubeIframeAPIReady = function () {
		console.log('youTubeIframeAPIReady');
		// https://developers.google.com/youtube/iframe_api_reference#Playback_status
		// (DOM element, args)
		window.youtubePlayer = new YT.Player('youtubePlayer', {
			height: '100%',
			width: '100%',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	// player callback
	window.onPlayerReady = function (event) {
		console.log('youtubePlayer ready');
	}

	window.onPlayerStateChange = function (event) {
	}

	// youtubePlayer.destroy() kills the iframe
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
	'term': '',
	'tracksPerSource': 5,
	'page': 1,

	// sources
	'spotify': new SjPlaylist({origin: 'searchResults',}),
	'youtube': new SjPlaylist({origin: 'searchResults',}),
	'soundcloud': new SjPlaylist({origin: 'searchResults',}),

	'all': new SjPlaylist({origin: 'searchResults',}),
}

// search
function search(term) {
	var asyncList = new AsyncList({
		totalCount: Object.keys(sourceList).length,
		success: new SjSuccess({
				origin: 'search()',
			}),
		errorList: new SjErrorList({
				origin: 'search()',
			}),
		callback: function (result) {
			if (matchType(result, 'SjSuccess')) {
				console.log('search() success');
			} else {
				handleError(result);
			}
		},
	});

	for (var key in sourceList) {
		sourceList[key].search(term, function(result) {
			asyncList.addIfError(result);
			asyncList.endPart();
		});
	}
}

spotify.search = function (term, callback) {
	var options = {
		// max number of results to return, min 1, max 50, default 20
		limit: searchResults.tracksPerSource,
		// offset of first result, use with limit to get paged results min 0, max 100 000, default 0
		offset: searchResults.tracksPerSource * (searchResults.page - 1),
	};

	spotifyApi.searchTracks(term, options, function(error, result) {
		if (result) {
			// update searchResults
			searchResults.term = term;

			spotify.getTracks(result.tracks.items, function(result) {
				if (matchType(result, 'SjPlaylist')) {
					searchResults.spotify = result;
					refreshSearchResults();

					callback(new SjSuccess({
						log: true,
						origin: 'spotify.search()',
						message: 'tracks retrieved',
					}));
				} else {
					callback(propagateError(result));
				}
			});
		} else if (error) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'spotify.search()  spotifyApi.searchTracks()',

				message: 'tracks could not be retrieved',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		}
	});
}

youtube.search = function (term, callback) {
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
			// update searchResults
			searchResults.term = term;

			// create idArray
			var idList = [];
			fufilled.result.items.forEach(function (track, i) {
				idList.push(track.id.videoId);
			});

			youtube.getTracks(idList, function(result) {
				if (matchType(result, 'SjPlaylist')) {
					searchResults.youtube = result;
					refreshSearchResults();

					callback(new SjSuccess({
						log: true,
						origin: 'youtube.search()',
						message: 'tracks retrieved',
					}));
				} else {
					callback(propagateError(result));
				}
			});
		} else {
			callback(new SjError({
				log: true, 
				origin: 'youtube.search() gapi.client.request().then()',
				message: 'tracks could not be retrieved',
				// TODO get actual reason and code from rejected object
				reason: 'gapi request was rejected',
				content: rejected,
			}));
		}
	});	
}

spotify.getTracks = function (items, callback) {
	// takes spotify's result.tracks.items array
	// !!! doesnt actually get tracks, just converts tracks from spotify.search

	// array of track objects
	var playlist = new SjPlaylist({
		origin: 'spotify.getTracks()',
	});

	items.forEach(function (track, i) {
		playlist.content[i] = new SjTrack({
			source: 'spotify',
			id: track.id,
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
	callback(playlist);
}

youtube.getTracks = function (ids, callback) {
	// takes array of youtube video ids

	// prepare args
	var args = {
		method: 'GET',
		path: '/youtube/v3/videos',
		params: {
			id: ids.join(","),
			part: 'snippet,contentDetails',
		}
	};

	// https://developers.google.com/youtube/v3/docs/videos/list
	gapi.client.request(args).then(function(fufilled, rejected) {
		if (fufilled) {
			console.log('youtube.getTracks() success');

			// array of track objects
			var playlist = new SjPlaylist({
				origin: 'youtube.getTracks() gapi.client.request().then()',
			});

			fufilled.result.items.forEach(function (track, i) {
				playlist.content[i] = new SjTrack({});

				playlist.content[i].source = 'youtube';
				playlist.content[i].id = track.id;

				// convert artist - title format
				// TODO make better regex
				var stringSplit = track.snippet.title.split(/( +- +)/);
				if (stringSplit.length === 2) {
					console.log('split on " - "');
					var artistSplit = stringSplit[0].split(/( +[&x] +)/);
					artistSplit.forEach(function(artist) {
						// fill artists
						playlist.content[i].artists.push(artist);
					});
					tplaylist.content[i].title = stringSplit[1];
				} else {
					playlist.content[i].artists = [track.snippet.channelTitle];
					playlist.content[i].title = track.snippet.title;
				}

				// convert ISO_8601 duration to milliseconds
				playlist.content[i].duration = moment.duration(track.contentDetails.duration, moment.ISO_8601).asMilliseconds();
				playlist.content[i].link = youtube.idPrefix + playlist.content[i].id;	
			});
			
			playlist.announce();
			callback(playlist);
		} else {
			callback(new SjError({
				log: true, 
				origin: 'youtube.getTracks() gapi.client.request().then()',
				message: 'tracks could not be retrieved',
				// TODO get actual reason and code from rejected object
				reason: 'gapi request was rejected',
				content: rejected,
			}));
		}
	});
}


function refreshSearchResults() {
	console.log('refreshSearchResults() called');

	// arrange and display
	searchResults.all = arrangeResults('mix', ['spotify', 'youtube']);
	displayList(searchResults.all);
}

function arrangeResults(type, selection) {
	console.log('arrangeResults() called');

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

var desiredPlayback = {
	track: new SjTrack({}),
	playing: false,
	progress: 0,
};

// TODO 
// seek issue: there will be a discrepancy between the api progress (actual) and the calculated desired progress, and when updatePlaybackState() is called, if they are different then seek() will be called - this will cause a stutter in the track, which we dont want.
// how do we signal when we want seek to update and when we dont? (we dont want to simply not call seek() if the two values are close enough because then clicking the same spot on the seek bar multiple times would loose feedback and only trigger a re-wind once every x times when the actualPlayback gets far enough away) - is this an issue specific to seek()???
// also mayb emake a playback object???

var actualPlayback = {
	spotify: {
		track: new SjTrack({}),
		playing: false,
		progress: 0,
	},
	youtube: {
		track: new SjTrack({}),
		playing: false,
		progress: 0,
	},
};

function checkPlaybackState(callback) {
	// TODO result is not passed in callback, deal with this
	var asyncList = new AsyncList({
		totalCount: Object.keys(sourceList).length,
		success: new SjSuccess({
				origin: 'checkPlaybackState()',
				message: 'checked playback state',
			}),
		errorList: new SjErrorList({
				origin: 'checkPlaybackState()',
				message: 'failed to check playback state',
			}),
		callback: function (result) {
			callback(result);
		},
	});

	for (var key in sourceList) {
		sourceList[key].checkPlayback(function(result) {
			asyncList.addIfError(result);
			asyncList.endPart();
		});
	}
}

spotify.checkPlayback = function (callback) {
	// 1 api call

	spotifyApi.getMyCurrentPlaybackState({}, function(error, result) {
		if (result) {
			console.log('checkPlaybackState() spotify success');

			// TODO will cause an error if no track is playing, will break this entire function
			actualPlayback.spotify.playing = result.is_playing;
			actualPlayback.spotify.progress = result.progress_ms;
			actualPlayback.spotify.track = {
				source: 'spotify',
				id: result.item.id,
				artists: [],
				title: result.item.name,
				duration: result.item.duration_ms,
				link: result.item.external_urls.spotify,
			}

			// fill artists
			result.item.artists.forEach(function (artist, j) {
				actualPlayback.spotify.track.artists[j] = artist.name;
			});

			callback(new SjSuccess({
				log: true,
				origin: 'spotify.checkPlayback() spotifyApi.getMyCurrentPlaybackState()',
				message: 'spotify playback state checked',
			}));
		} else if (error) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'spotify.checkPlayback() spotifyApi.getMyCurrentPlaybackState()',

				message: 'failed to check spotify playback state',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		}
	});

}

youtube.checkPlayback = function (callback) {
	// 3 player calls - these are all synchronous - should not return errors, but still check their possible return types
	// 1 api call

	//https://developers.google.com/youtube/iframe_api_reference#Functions

	// playing?
	if (youtubePlayer.getPlayerState() == 1 || youtubePlayer.getPlayerState() == 3) {
		/*	Returns the state of the player. Possible values are:
			-1 – unstarted, 0 – ended, 1 – playing, 2 – paused, 3 – buffering, 5 – video cued	*/
		actualPlayback.youtube.playing = true;
	} else {
		actualPlayback.youtube.playing = false;
	}
	
	// progress?
	actualPlayback.youtube.progress = youtubePlayer.getCurrentTime() * 1000;

	// id?
	// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
	var id = youtubePlayer.getVideoUrl().split("v=")[1];
	if (id) {
		// if not empty
		var andPosition = id.indexOf('&'); 
		if (andPosition != -1) { id = id.substring(0, andPosition); }
		//console.log('original: ' + youtubePlayer.getVideoUrl() + '\nid: ' + id);

		youtube.getTracks([id], function(result) {
			if (matchType(result, 'SjPlaylist')) {
				if (result.length === 1) {
					actualPlayback.youtube.track = result[0];

					callback(new SjSuccess({
						log: true,
						origin: 'youtube.checkPlayback() youtube.getTracks()',
						message: 'youtube playback state checked',
					}));
				} else {
					console.log(actualPlayback);
					callback(new SjError({
						log: true,
						code: '404',
						origin: 'youtube.checkPlayback() youtube.getTracks()',
						message: 'track not found',
						reason: 'id: ' +id +' was not found',
					}));
				}
			} else {
				callback(propagateError(result));
			}	
		});
	} else {
		// no track is playing
		callback(new SjSuccess({
			log: true,
			origin: 'youtube.checkPlayback()',
			message: 'youtube playback state checked',
		}));
	}

}

// TODO --------- rework all of this
function updatePlaybackState(callback) {
	checkPlaybackState(function(result) {
		if (!isError(result)) {
			// TODO asynclist here for updating multiple playback state types at a time
			// TODO update track progress

			// play/pause & track selection
			if (desiredPlayback.playing) {
				// if play is desired
				for (var key in sourceList) {
					// loop through all sources
					if (key === desiredPlayback.track.source) {
						// play desired source
						if (desiredPlayback.track.id === actualPlayback[key].track.id) {
							// resume if same track loaded
							resume(key, function (result) {
								// TODO ...
							});
						} else {
							// start if different track
							start(key, desiredPlayback.track.id, function (result) {
								// TODO ...
							});
						}
					} else {
						// pause all other sources
						pause(key, function (result) {
							// TODO ...
						});
					}
				}
			} else {
				// pause is desired, pause everything
				for (var key in sourceList) {
					pause(key, function (result) {
						// TODO ...
					});
				}
			}


		} else {
			// TODO make better handling of checkPlaybackState, maybe keep a list of all unknown states based on the SjErrorList? then only fail if the desired state requires knowing one of the unknowns
			callback(propagateError(result));
		}
	});
}

// TODO -----------

// check proper track 
// then
// check proper playing state ( toggle)
// then
// check proper progress

function checkPlaybackTrack(callback) {
	// switch
	if (desiredPlayback.track.id === actualPlayback[key].track.id) {
		callback(new SjSuccess({
			log: true,
			origin: 'checkPlaybackTrack()',
			message: 'track is same',
		}));
	} else {
		// start if different track
		start(desiredPlayback.track.source, desiredPlayback.track.id, function (result) {
			if (matchType(result, 'SjSuccess')) {
				callback(new SjSuccess({
					log: true,
					origin: 'checkPlaybackTrack()',
					message: 'track changed',
				}));
			} else {
				callback(propagateError(result));
			}
		});	
	}
}

// same for these two 

function checkPlaybackPlaying(callback) {
	// TODO async list here

	if (desiredPlayback.playing) {
		for (var key in sourceList) {
			if (key === desiredPlayback.track.source) {
				// resume desired source
				resume(key, function (result) {
					// TODO ...
				});
			} else {
				// pause all other sources
				pause(key, function (result) {
					// TODO ...
				});
			}
		}
	} else {
		// pause all sources
		for (var key in sourceList) {
			pause(key, function (result) {
				// TODO ...
			});
		}
	}
}

function checkPlaybackProgress() {

}


//   ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     
//  ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     
//  ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     
//  ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     
//  ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗
//   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
//                                                               

// SjSource control functions do not check against redundant calls and should not be called directly. The aggregator functions do this and sould be the only way this functionality is accessed. 
// Redundancy checks are done here and not in the larger updatePlaybackState because: the same assumptions are being made in both cases, readability is improved, and now control functions can be safely called else where.

// !!! dont direclty use source.control functions, they don't have redundancy checks (against actualPlaybackState)
// !!! regular control functions assume actualPlaybackState has been checked recently and will act accordingly

// TODO maybe just pass the source object instead of the source name?

// TODO start doesnt actually need to 'play' the track, it just needs to make it the currently playing track and would be better to start paused to avoid an initial stutter (incase somehow we want to start the track paused)
function start(source, id, callback) {
	if (source in sourceList) {
		sourceList[source].start(id, function (result) {
			callback(result);
		});
	} else {
		callback(new SjError({
			log: true,
			origin: 'start()',
			message: 'track could not be started',
			reason: 'unknown source',
		}));
	}
}

spotify.start = function (id, callback) {
	spotifyApi.play({"uris":["spotify:track:" + id]}, function(error, result) {
		if (result) {
			callback(new SjSuccess({
				log: true,
				origin: 'start(spotify, ...)',
				message: 'track started',
				content: result,
			}));
		} else if (error) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'start(spotify, ...)',
				message: 'spotify track could not be started',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		}
	});
}

youtube.start = function (id, callback) {
	youtubePlayer.loadVideoById(id);
	youtubePlayer.playVideo();

	// TODO check if successful?
	callback(new SjSuccess({
		log: true,
		origin: 'start(youtube, ...)',
		message: 'track started',
	}));
}

function resume(source, callback) {
	if (source in sourceList) {
		// check if already playing	
		if (!actualPlayback[source].playing) { 
			sourceList[source].resume(function (result) {
				callback(result);
			});
		} else {
			callback(new SjSuccess({
				log: true,
				origin: 'resume()',
				message: 'track was already playing',
			}));
		}
	} else {
		callback(new SjError({
			log: true,
			origin: 'resume()',
			message: 'track could not be resumed',
			reason: 'unknown source',
		}));
	}
}

spotify.resume = function (callback) {
	spotifyApi.play({}, function(error, result) {
		if (result) {
			callback(new SjSuccess({
				log: true,
				origin: 'resume(spotify, ...)',
				message: 'track resumed',
				content: result,
			}));
		} else if (error) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'resume(spotify, ...)',
				message: 'spotify track could not be resumed',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		}
	});
}

youtube.resume = function (callback) {
	youtubePlayer.playVideo();

	// TODO check if successful?
	callback(new SjSuccess({
		log: true,
		origin: 'resume(youtube, ...)',
		message: 'track started',
	}));
}

function pause(source, callback) {
	if (source in sourceList) {
		if (actualPlayback[source].playing) {
			sourceList[source].pause(function (result) {
				callback(result);
			});
		} else {
			callback(new SjSuccess({
				log: true,
				origin: 'pause()',
				message: 'track was already paused',
			}));
		}
	} else {
		callback(new SjError({
			log: true,
			origin: 'pause()',
			message: 'track could not be paused',
			reason: 'unknown source',
		}));
	}
}

spotify.pause = function (callback) {
	spotifyApi.pause({}, function(error, result) {
		if (result) {
			callback(new SjSuccess({
				log: true,
				origin: 'pause(spotify, ...)',
				message: 'track paused',
				content: result,
			}));
		} else if (error) {
			console.log(error);
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'pause(spotify, ...)',
				message: 'spotify track could not be paused',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		}
	});
}

youtube.pause = function (callback) {
	youtubePlayer.pauseVideo();

	// TODO check if successful?
	callback(new SjSuccess({
		log: true,
		origin: 'pause(youtube, ...)',
		message: 'track paused',
	}));
}

function seek(source, ms, callback) {
	if (source in sourceList) {
		sourceList[source].seek(ms, function (result) {
			callback(result);
		});
	} else {
		callback(new SjError({
			log: true,
			origin: 'seek()',
			message: 'track could not be seeked',
			reason: 'unknown source',
		}));
	}
}

spotify.seek = function (ms, callback) {
	spotifyApi.seek(ms, function(error, result) {
		if (result) {
			callback(new SjSuccess({
				log: true,
				origin: 'seek(spotify, ...)',
				message: 'track seeked',
				content: result,
			}));
		} else if (error) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'seek(spotify, ...)',
				message: 'spotify track could not be seeked',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		}
	});
}

youtube.seek = function (ms, callback) {
	// (seconds - number, allowSeekAhead of loading - boolean)
	youtubePlayer.seekTo(Math.round(ms / 1000), true);

	// TODO check if successful?
	callback(new SjSuccess({
		log: true,
		origin: 'seek(youtube, ...)',
		message: 'track seeked',
	}));
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

	spotify.loadPlayer();
	youtube.loadPlayer();
});

// page
$(document).on("click", "#search", function() {
	console.log("#search clicked");

	search($('#uri').val(), function(){
		//do nothing
	});
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

$(document).on("click", "#getPlaylistSubmit", function() {
	console.log("#getPlaylistSubmit clicked");
	getPlaylist($('#playlistId'));
});

$(document).on("click", "#deletePlaylistSubmit", function() {
	console.log("#deletePlaylistSubmit clicked");
	deletePlaylist($('#playlistId'));
});

$(document).on("click", "#orderPlaylistSubmit", function() {
	console.log("#orderPlaylistSubmit clicked");
	orderPlaylist($('#playlistId'));
});

$(document).on("click", "#deleteTrackSubmit", function() {
	console.log("#deleteTrackSubmit clicked");
	deleteTrack($('#playlistId'), $('#position'));
});
