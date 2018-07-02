// NOTES

// promises always return more promises (that are resolved or rejected), use await to transform those resolved or rejected promises in to useable values (before one would have to define a var then that promise would set that var)

// when not to use arrow functions: https://dmitripavlutin.com/when-not-to-use-arrow-functions-in-javascript/


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
// TODO maxLength attribute can be used for input elements, use this to get real-time validation checks for max length
// TODO the property objectType may not be needed??? as there might be functions to access the name of the class already, but im not sure
// TODO handle success messages on successful server commands

// TODO some playback/control errors probably to do with the checking
// TODO playback and control conversion and testing

// TODO maybe make source objects with all their respective functions so that they can be called dynamically: globalSourceObject[source].play(callback);

// TODO behavior, playing in spotify manually, then start up app, previewing a song updates the playback to the current already playing song not the clicked preview song

// TODO make error messages and origins consistent, fill out content

// TODO consider namespacing

// TODO workout api keys & info storage between server & client, its kind of a mixed back right now between youtube and spotify

// Playback queue is a non-flawless system, though it should cover mostly all use cases, make this flawless in the future

// wait ms milliseconds
async function wait(ms) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (Math.random() > .5) {
				resolve('success')
			} else {
				reject('failure')
			}
		}, ms)
	}).then(function (resolve) {
		if (Math.random() > .5) {
			return 'success2';
		} else {
			throw 'failure2';
		}
	}, function (reject) {
		throw 'failure3';
	});
}

async function delay(ms) {
	return new Promise(function (resolve, reject) {
		setTimeout(function() {
			resolve(true);
		}, ms);
	});
}

// test
$('#test').click(function() {
	clearInterval(temp);
	// spotify.loadPlayer().then(function (resolved) {
	// 	console.log(resolved);
	// }).catch(function (rejected) {
	// 	console.log(rejected);
	// });

});


//   ██████╗ ██╗      ██████╗ ██████╗  █████╗ ██╗     
//  ██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔══██╗██║     
//  ██║  ███╗██║     ██║   ██║██████╔╝███████║██║     
//  ██║   ██║██║     ██║   ██║██╔══██╗██╔══██║██║     
//  ╚██████╔╝███████╗╚██████╔╝██████╔╝██║  ██║███████╗
//   ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
//                                                    

// no objects
var noTrack = new SjTrack({
});

// TODO update noSource with new part functions (lack of)
var noSource = new SjSource({
	realSource: false,
});

// n+1 definition for recursive reference
noTrack.source = noSource;


// sources
var sourceList = [];

var spotify = new SjSource({
	name: 'spotify',
});

var youtube = new SjSource({
	name: 'youtube',
	idPrefix: 'https://www.youtube.com/watch?v=',
});

// TODO consider making an action object? for server requests, and playback requests
// TODO work out objects/classes/prototypes


// list of all valid objects
var objectList = [
	// TODO must be a better way
	'SjObject',
	'SjSuccess',
	'SjError',
	'SjErrorList',
	'SjTrack',
	'SjPlaylist',
	'SjUser',
	'SjSource',
	'SjPlayback',
];

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

// error handling
function SjSuccess(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjSuccess';

	// what
	this.code = typeof obj.code === 'undefined' ? '200' : obj.code;
	this.type = typeof obj.type === 'undefined' ? 'Ok' : obj.type;

	// return
	//this.reason = typeof obj.reason === 'undefined' ? '' : obj.reason;

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
	this.source = typeof obj.source === 'undefined' ? noSource : obj.source;
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




function SjPlayback(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjPlayback';

	// new properties
	// track
	this.track = typeof obj.track === 'undefined' ? noTrack : obj.track;
	this.pendingStart = typeof obj.pendingStart === 'undefined' ? false : obj.pendingStart;

	// playing
	this.playing = typeof obj.playing === 'undefined' ? false : obj.playing;
	this.pendingToggle = typeof obj.pendingToggle === 'undefined' ? false : obj.pendingToggle;

	// progress
	this.progress = typeof obj.progress === 'undefined' ? 0 : obj.progress;
	this.timeStamp = typeof obj.timeStamp === 'undefined' ? Date.now() : obj.timeStamp;
	this.pendingSeek = typeof obj.pendingSeek === 'undefined' ? false : obj.pendingSeek;

	// volume
	this.volume = typeof obj.volume === 'undefined' ? 0 : obj.volume;
	this.pendingVolume = typeof obj.pendingVolume === 'undefined' ? false : obj.pendingVolume;

	this.onCreate();
}

//  ███████╗██████╗ ██████╗  ██████╗ ██████╗ 
//  ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
//  █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝
//  ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗
//  ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║
//  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
//                                           

function isError(obj) {
	// checks for proper SjObject error types
	if (matchType(obj, 'SjError') || matchType(obj, 'SjErrorList')) {
		return true;
	} else {
		return false;
	}
}

function catchUnexpected(obj) {
	// determines type of input, creates, announces, and returns a proper SjError object
	// use in the final Promise.catch() to handle any unexpected variables or errors that haven't been caught yet

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

function propagateError(obj) {
	// wrapper code for repeated error handling where: one or many SjObject results are expected, SjErrors are propagated, and anything else needs to be caught and transformed into a proper SjError
	if (isError(obj)) {
		return obj;
	} else {
		return catchUnexpected(obj);
	}
}

function filterList(resolvedList, type, resolvedObj, rejectedObj) {
	// used to filter a list of resolved objects from Promise.all(function() {... resolveAll} for a specified resolve type, then returns the list if all are of that type or an SjErrorList with all objects that aren't of that type

	resolvedObj.content = resolvedList;
	rejectedObj.content = [];

	resolvedList.forEach(function (item) {
		if (!matchType(item, type)) {
			rejectedObj.content.push(propagateError(item));
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

// top level error handling, only call after error has propagated to a top level function
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
		var newError = catchUnexpected(error);
		console.error(newError);
		addElementError(newError);
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

function clone(obj) {
	// TODO unused so far
	// !!! cannot clone circular references
	return JSON.parse(JSON.stringify(obj));
}

function recreateSjObject(obj) {
	if (typeOf(obj) === 'string') {
		try {
			var parsedObj = JSON.parse(obj);
			// if parsedObj has a valid objectType
			if (objectList.indexOf(parsedObj.objectType) !== -1) {
				// create a new SjObject based on it's objectType
				return new window[parsedObj.objectType](parsedObj);
			} else {
				return new SjError({
					log: true,
					origin: 'recreateSjObject()',
					message: 'failed to recreate object',
					reason: 'object is non-SjObject',
					content: obj,
				});
			}
		} catch (e) {
			return new SjError({
				log: true,
				origin: 'recreateSjObject()',
				message: 'failed to recreate object',
				reason: e,
				content: obj,
			});
		}
	} else if (typeOf(obj) === 'object') {
		// if obj has a valid objectType
		if (objectList.indexOf(obj.objectType) !== -1) {
			// create a new SjObject based on it's objectType
			return new window[obj.objectType](obj);
		} else {
			return new SjError({
				log: true,
				origin: 'recreateSjObject()',
				message: 'failed to recreate object',
				reason: 'object is non-SjObject',
				content: obj,
			});
		}
	} else {
		return new SjError({
			log: true,
			origin: 'recreateSjObject()',
			message: 'failed to recreate object',
			reason: 'data is not an object',
			content: obj,
		});
	}
}

async function serverCommand(data) {
	console.log('serverCommand('+ data.request + ') called');
	return $.ajax({
		// http://api.jquery.com/jquery.ajax/
		url: 'request.php',
		type: 'POST',
		data: data,
	}).then(function (data, textStatus, jqXHR) {
		var temp = recreateSjObject(data);
		// TODO updateElementErrors() as of now should take a .finally() behavior, but is this really the best way to do that?
		updateElementErrors(); 
		console.warn(temp);
		return temp;
	}, function (jqXHR, textStatus, errorThrown) {
		console.warn('command rejected');
		var temp =  new SjError({
			log: true,

			type: 'ajax error',
			origin: 'serverCommand()',

			message: 'could not send command to server',
			reason: textStatus,
			content: errorThrown,

			target: 'notify',
			class: 'notifyError',
		});
		updateElementErrors();
		console.warn(temp);
		throw temp;
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

function typeOf(input) {
	if (input === null) {
		return 'null';
	} else if (typeof input === 'object') {
		if (objectList.indexOf(input.objectType) !== -1) {
			return input.objectType;
		} else {
			return 'object';
		}
	} else {
		return typeof input;
	}
}

function matchType(input, match) {
	// this function is needed for convinience and to catch undefined variables, simply checking obj.objectType === 'Sj___' does not catch unexpected variables (such as non-SJ objects or just non-objects, let alone possible undefined variables)

	// typeof null is 'object', must be accounted for
	// https://bitsofco.de/javascript-typeof/
	if (match === 'null') { // filter out null, as typeof null returns object
		if (input === null) {
			return true;
		} else {
			return false;
		}
	} else if (typeof input === match) { // check direct type
		// if base object type is matched
		return true;
	} else if (typeof input !== 'object') { // filter out non-objects
		// if not matched and not an object
		return false;
	} else if (typeof input.objectType === 'string') { // check objectType
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

function resolveBoth(resolved, rejected) {
	// Promise.all will reject when the first promise in the list rejects, not waiting for others to finish. Therefore, resolve these rejections so they all get put into the list, then handle the list.

	if (resolved) {
		return resolved;
	} else if (rejected) {
		return rejected;
	}
}

//  ██╗   ██╗███████╗███████╗██████╗ 
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
//                                   

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
//                                                               

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
		id: track.id,
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


//   █████╗ ██████╗ ██╗
//  ██╔══██╗██╔══██╗██║
//  ███████║██████╔╝██║
//  ██╔══██║██╔═══╝ ██║
//  ██║  ██║██║     ██║
//  ╚═╝  ╚═╝╚═╝     ╚═╝
//                     

// api
spotify.loadApi = async function () {
	return new Promise(function (resolve, reject) {
		try {
			// https://beta.developer.spotify.com/documentation/web-api/
			// https://doxdox.org/jmperez/spotify-web-api-js

			// window is basically the global object and is how to define variables within a function
			window.spotifyApi = new SpotifyWebApi();
			spotifyApi.setAccessToken(spotifyAccessToken);

			resolve(new SjSuccess({
				log: true,
				origin: 'spotify.loadApi()',
				message: 'spotify api ready',
			}));
		} catch (e) {
			reject(new SjError({
				log: true,
				origin: 'spotify.loadApi()',
				message: 'spotify api failed to load',
				reason: e,
				content: e,
			}));
		}
	});
}

youtube.loadApi = async function () {
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
						resolve(new SjSuccess({
							log: true,
							origin: 'youtube.loadApi()',
							message: 'youtube api ready',
						}));
					}, function (rejected) {
						reject(new SjError({
							log: true,
							origin: 'youtube.loadApi()',
							message: 'failed to load youtube api',
							reason: 'client initialization failed',
							content: rejected,
						}));
					});
				},
				onerror: function() {
					reject(new SjError({
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
		throw new SjError({
			log: true,
			origin: 'youtube.loadApi()',
			message: 'failed to load youtube api',
			reason: exception,
		});
	});
}

// player

// TODO is there a significant discrepancy between potential synchronous/local sources (listeners) and asynchronous api calls for progress checks? Which information sources are synchronous/local? Should their information override the api information?

spotify.loadPlayer = async function () {
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
						id: state.track_window.current_track.id,
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
					triggerReject(new SjError({
							log: true,
							origin: 'spotify.loadPlayer()',
							message: 'spotify player encountered an initialization error',
							reason: message,
						})
					);
				});

				player.addListener('authentication_error', function ({message}) { 
					// 'Emitted when the Spotify.Player fails to instantiate a valid Spotify connection from the access token provided to getOAuthToken.'
					triggerReject(new SjError({
							log: true,
							origin: 'spotify.loadPlayer()',
							message: 'spotify player encountered an authentication error',
							reason: message,
						})
					);
				});

				player.addListener('account_error', function ({message}) {
					// 'Emitted when the user authenticated does not have a valid Spotify Premium subscription.'
					triggerReject(new SjError({
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
						triggerResolve(new SjSuccess({
							log: true,
							origin: 'spotify.loadPlayer()',
							message: 'spotify player loaded',
						}));

						// TODO updatePlayback(); ?
					}, function (rejected) {
						triggerReject(new SjError({
							log: true,
							code: JSON.parse(error.response).error.status,
							origin: 'spotify.loadPlayer()',
							message: 'spotify player could not be loaded',
							reason: JSON.parse(error.response).error.message,
							content: error,
						}));
					}).catch(function (rejected) {
						triggerReject(new SjError({
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
						triggerReject(new SjError({
							log: true,
							origin: 'spotify.loadPlayer()',
							message: 'spotify player failed to connect',
							reason: 'spotify.connect() failed',
						}));
					}
				}, function (rejected) {
					// should not be possible to get here, but handle it either way
					triggerReject(new SjError({
						log: true,
						origin: 'spotify.loadPlayer()',
						message: 'spotify player failed to connect',
						reason: 'spotify.connect() failed',
						content: rejected,
					}));
				});
			} catch (e) {
				triggerReject(new SjError({
					log: true,
					origin: 'spotify.loadPlayer()',
					message: 'spotify player failed to connect',
					reason: e,
					content: e,
				}));
			}
		}

		$.getScript('https://sdk.scdn.co/spotify-player.js').catch(function (jqXHR, settings, exception) {
			triggerReject(new SjError({
				log: true,
				origin: 'spotify.loadPlayer()',
				message: 'failed to load spotify player',
				reason: exception,
			}));
		});
	});
}

youtube.loadPlayer = function () {
	$.getScript('https://www.youtube.com/iframe_api').fail(function (jqxhr, settings, exception) {
		// TODO fill in reason information
		callback(new SjError({
			log: true,
			origin: 'youtube.loadPlayer()',
			message: 'failed to load youtube player',
			reason: exception,
			content: exception,
		}));
	});

	// TODO make listeners
	// youtubePlayer.destroy() kills the iframe

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
		var result = new SjSuccess({
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

	'all': new SjPlaylist({origin: 'searchResults',}),
}

// search
async function search(term) {
	return Promise.all(sourceList.map(function (source) {
		return source.search(term).then(resolveBoth);
	})).then(function (resolved) {
		return filterList(resolved, 'SjSuccess', new SjSuccess({
			origin: 'search()',
			message: 'search succeeded',
		}), new SjErrorList( {
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
		throw new SjError({
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

		return new SjSuccess({
			log: true,
			origin: 'spotify.search()',
			message: 'tracks retrieved',
		});
	}).catch(function (rejected) {
		throw propagateError(rejected);
	});
}

spotify.getTracks = async function (items) {
	// takes spotify's resolved.tracks.items array
	// !!! doesnt actually get tracks, just converts tracks from spotify.search

	// array of track objects
	var playlist = new SjPlaylist({
		origin: 'spotify.getTracks()',
	});

	items.forEach(function (track, i) {
		playlist.content[i] = new SjTrack({
			source: spotify,
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
			reject(new SjError({
				log: true, 
				origin: 'youtube.search()',
				message: 'tracks could not be retrieved',
				// TODO get actual reason and code from rejected object
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
		return new SjSuccess({
			log: true,
			origin: 'youtube.search()',
			message: 'tracks retrieved',
			content: resolved,
		});
	}).catch(function (rejected) {
		throw propagateError(rejected);
	});
}

youtube.getTracks = async function (ids) {
	// takes list of ids from youtubes' resolved.result.items.id.videoId

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
			reject(new SjError({
				log: true, 
				origin: 'youtube.getTracks() gapi.client.request().then()',
				message: 'tracks could not be retrieved',
				// TODO get actual reason and code from rejected object
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
			playlist.content[i].id = track.id;

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
		throw propagateError(rejected);
	});
}


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

var desiredPlayback = new SjPlayback({
	pendingStart: false,
	pendingToggle: false, // why is this needed? to prevent duplicate (very fast) requests from reaching the api (that get past the 'waves' of checkPlayback() within updatePlayback()), if this is uses why are redundancy checks still needed in the source functions? because they still prevent internal calls to the functions???
	pendingSeek: false,
	pendingVolume: false,
});


// sent action stays at front of queue so that 

/*
action: type,
pendingAction: boolean,

queuedAction: type,

TODO CONTINUE FROM HERE, BUT WAIT, NO ERRORS ARE FORMING FROM THE CURRENT VERSION??? WHY? THAT SHOULD BE HAPPENING
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

// Regardless of whether or not two actions have different desired outcomes depending on their order, !!!the user expects that their actions are handled in the same order that they requested them, therefore the only way to do multiple actions (is not in parallel) but in the queue system -> merge all action type's queues into a single one where only one type of action is pending at a time, but multiple types of actions are next in the same queue, queued actions of the same type replace another, queued actions the same as the pending action of the same type annihilate, (maybe also: if the user requests the same thing thats happening, insert a check to verify that the playback information is correct incase the user has more recent information), 
// but first update with async functions

// desiredPlayback properties reflect CURRENT desires, these are used to give SjActions their state and add them to the queue

desiredPlayback.start = async function (track) {
	this.track = track;

	//this.pendingStart = true;

	this.playing = true;
	this.progress = 0; // I didn't have this here before here before, why not???

	// Set slider range to track duration
	$('#progressBar').slider('option', 'max', this.track.duration); // TODO should this be put somewhere else?

	// updatePlayback().catch(function (rejected) {
	// 	handleError(rejected);
	// });

	playbackQueue.push(new SjStart({}));
}

desiredPlayback.toggle = async function () {
	this.playing = !this.playing;

	//this.pendingToggle = !this.pendingToggle; // if already pending, remove pending (-1 * -1 = 1); if not pending, add pending

	// updatePlayback().catch(function (rejected) {
	// 	handleError(rejected);
	// });

	playbackQueue.push(new SjToggle({}));
}

desiredPlayback.seek = function (ms) {
	this.progress = ms;

	// this.pendingSeek = true;

	// updatePlayback().catch(function (rejected) {
	// 	handleError(rejected);
	// });

	playbackQueue.push(new SjSeek({}));
}

desiredPlayback.volume = function (volume) {
	this.volume = volume;

	// updatePlayback().catch(function (rejected) {
	// 	handleError(rejected);
	// });

	playbackQueue.push(new SjVolume({}));
}

function desiredSourcePlayback() {
	// shorthand, TODO is there a better way?
	return desiredPlayback.track.source.playback;
}

async function checkPlayback() {
	return Promise.all(sourceList.map(function (source) {
		return source.checkPlayback().then(resolveBoth);
	})).then(function (resolved) {
		return filterList(resolved, 'SjSuccess', new SjSuccess({
			origin: 'checkPlayback()',
			message: 'checked playback state',
		}), new SjErrorList({
			origin: 'checkPlayback()',
			message: 'failed to check playback state',
		}));
	}).then(function (resolved) {
		return resolved;
	}, function (rejected) {
		throw rejected;
	});
}

// !!! checkPlayback functions must save timeStamp immediately after progress is available
spotify.checkPlayback = async function () {
	// 1 api call (all)

	return spotifyApi.getMyCurrentPlaybackState({}).catch(function (rejected) {
		throw new SjError({
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

		return new SjSuccess({
			log: true,
			origin: 'spotify.checkPlayback()',
			message: 'spotify playback state checked',
		});
	}).catch(function (rejected) {
		throw propagateError(rejected);
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
		var id = typeOf(url) === 'string' ? url.split('v=')[1] : '';
		if (id) {
			// if not empty
			var andPosition = id.indexOf('&'); 
			if (andPosition != -1) { id = id.substring(0, andPosition); }

			return youtube.getTracks([id]).then(function (resolved) {
				if (resolved.content.length === 1) {
					youtube.playback.track = resolved.content[0];

					return new SjSuccess({
						log: true,
						origin: 'youtube.checkPlayback()',
						message: 'youtube playback state checked',
					});
				} else {
					throw new SjError({
						log: true,
						code: '404',
						origin: 'youtube.checkPlayback()',
						message: 'track not found',
						reason: 'id: ' + id +' was not found',
					});
				}
			}).catch(function (rejected) {
				throw propagateError(rejected);
			});
		} else {
			// no track is playing
			return new SjSuccess({
				log: true,
				origin: 'youtube.checkPlayback()',
				message: 'youtube playback state checked',
			});
		}
	} catch (e) {
		throw new SjError({
			log: true,
			origin: 'youtube.checkPlayback()',
			message: 'could not check youtube playback',
			reason: e,
		});
	}
}


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
	this.trigger = function () {
		return new Promise(resolve => {
			resolve(new SjSuccess({
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
		// TODO some sequencing with pause & start, what order? parallel or in sequence? (remember that pendingStart follows the start command, not just at the end)
		return Promise.all(sourceList.map(source => {
			// pause all
			return pause(source).then(resolveBoth);
		})).then(resolved => {
			// filter errors
			return filterList(resolved, 'SjSuccess', new SjSuccess({
				origin: 'SjStart.trigger()',
				message: 'changed track',
			}), new SjErrorList({
				origin: 'SjStart.trigger()',
				message: 'failed to change track',
			}));
		}).then(resolved => {
			// start
			return start(this.state);
		}).then(resolved => {
			return resolved;
		}, rejected => {
			throw propagateError(rejected);
		});
	}


	this.onCreate();
}
// toggle or pause & play?, toggle is post-behavior, should behavior be inside these actions or outside?
function SjToggle(obj) {
	// super
	SjAction.call(this, obj);


	// overwritten properties
	this.objectType = 'SjToggle';
	this.state = desiredPlayback.playing;
	this.source = desiredPlayback.track.source;
	
	this.trigger = async function () {
		if (this.state) {
			return Promise.all(sourceList.map(source => {
				if (source === this.source) {
					// resume desired source
					return resume(source).then(resolveBoth);
				} else {
					// pause all other sources
					return pause(source).then(resolveBoth);
				}
			})).then(resolved => {
				return filterList(resolved, 'SjSuccess', new SjSuccess({
					origin: 'SjToggle.trigger()',
					message: 'playing updated',
				}), new SjErrorList({
					origin: 'SjToggle.trigger()',
					message: 'playing failed to update',
				}));
			}).then(resolved => {
				return resolved;
			}, rejected => {
				throw propagateError(rejected);
			});
		} else {
			return Promise.all(sourceList.map(source => {
				// pause all sources
				return pause(source).then(resolveBoth);
			})).then(resolved => {
				return filterList(resolved, 'SjSuccess', new SjSuccess({
					origin: 'updatePlaybackPlaying()',
					message: 'playing updated',
				}), new SjErrorList({
					origin: 'updatePlaybackPlaying()',
					message: 'playing failed to update',
				}));
			}).then(resolved => {
				return resolved;
			}, rejected => {
				throw propagateError(rejected);
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
		// TODO is desiredPlayback.track.source the best way to determine which source to seek?
		return seek(this.source, this.state).then(resolved => {
			return new SjSuccess({
				log: true,
				origin: 'SjSeek.trigger()',
				message: 'playback progress changed',
			});
		}).catch(rejected => {
			throw propagateError(rejected);
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

var noAction = new SjAction({});

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
				handleError(rejected);
				this.sent = noAction;
			});
		}
	}
}

//   ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     
//  ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     
//  ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     
//  ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     
//  ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗
//   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
//                                                               

/* !!!
	Don't directly use source.control() functions, they dont have redundancy checks (against knownPlaybackState) or anything else, they simply interface the api to the app. They assume the knownPlaybackState info is correct and will act accordingly.

	Use the aggregator functions in conjunction with checkPlayback() (like in updatePlayback()) to control playback.
*/

/* REFLECTION
	 I considered instead of updating playback state in each source function upon SjSuccess, to do a second and final checkPlayback() once updatePlayback() succeeds (this would require two api calls, but I thought it could be simpler (but would it?)).
	
	 I thought because track info is also needed (in addition to playback state) that a final checkPlayback() would be needed to verify the post-update track info, (this came from not knowing what track was playing when starting one for the first time), however this info should already be known from the fetched and displayed track (object), so all of these functions actually do have the ability to update information when resolved.

	This resolution suggests using track objects everywhere as parameters rather than ids; this should be possible because the user is never going to be blindly playing id strings without the app first searching and tying down its additional metadata.

*/

/* REFLECTION
	I considered that setting knownPlayback.progress upon start() (0) and seek() (ms) may wipeout any official information from checkPlayback() or listeners, as any information that arrives between sending and receiving the request will be wiped out upon resolution (with less valuable, inferred information). 
	
	However unless the information is being sent from a synchronous or local source (which actually is likely), that information should not be sent and received between the timespan it takes for the playback request to be sent and received - therefore it must be sent before and therefore less accurate/valuable than even the inferred progress information.

	Then I realized that any checks to playback state will have the same offset error as the playback requests so it makes no sense to even checkPlayback() to get more accurate information.
*/

// TODO the aggregator functions dont actually do anything, they simply select a source (already known), call their respective function, and apply some generic code to all the source functions, should these simply go into the function prototype?, problem is that they have both outer and inner generic parts


function SjSource(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjSource';

	// new properties
	// !!! don't use this unless the source string is needed, always use the SjSource object reference
	this.name = typeof obj.name === 'undefined' ? '' : obj.name; 
	this.idPrefix = typeof obj.idPrefix ==='undefined' ? '' : obj.idPrefix;
	
	// api
	this.loadApi = typeof obj.loadApi === 'undefined' ? function (){} : obj.loadApi;
	this.loadPlayer = typeof obj.loadPlayer === 'undefined' ? function (){} : obj.loadPlayer;

	// search
	this.search = typeof obj.search === 'undefined' ? function (){} : obj.search;
	this.getTracks = typeof obj.getTracks === 'undefined' ? function (){} : obj.getTracks;

	// !!! cyclical reference - has SjPlayback object which has SjTrack object which has this SjSource object
	this.playback = typeof obj.playback === 'undefined' ? new SjPlayback({}) : obj.playback;

	// playback
	this.checkPlayback = typeof obj.checkPlayback === 'undefined' ? function (){} : obj.checkPlayback;

	this.start = async function (track) {
		return this.startPart(track).then(resolved => {
			this.playback.playing = true;
			this.playback.track = track;
			this.playback.progress = 0;
			this.playback.timeStamp = Date.now();

			return resolved;
		}).catch(rejected => {
			throw propagateError(rejected);
		});
	};
	this.resume = async function () {
		if (!this.playback.playing) { 
			return this.resumePart().then(resolved => {
				this.playback.playing = true;
				return resolved;
			}).catch(rejected => {
				throw rejected;
			});
		} else {
			return new SjSuccess({
				log: true,
				origin: this.name + '.resume()',
				message: 'track already playing',
			});
		}
	};
	this.pause = async function () {
		if (this.playback.playing) {
			return this.pausePart().then(resolved => {
				this.playback.playing = false;
				return resolved;
			}).catch(rejected => {
				throw propagateError(rejected);
			});
		} else {
			return new SjSuccess({
				log: true,
				origin: this.name + '.pause()',
				message: 'track already paused',
			});
		}
	};
	this.seek = async function (ms) {
		return this.seekPart(ms).then(resolved => {
			this.playback.progress = ms;
			this.playback.timeStamp = Date.now();
			return resolved;
		}).catch(rejected => {
			throw propagateError(rejected);
		});
	};
	this.volume = async function (volume) {
		return this.volumePart(volume).then(resolved => {
			this.playback.volume = volume;
			return resolved;
		}).catch(rejected => {
			throw propagateError(rejected);
		});
	};

	this.apiStart = typeof obj.apiStart === 'undefined' ? async function (){throw 'apiStart not defined'} : obj.apiStart;
	this.apiResume = typeof obj.apiResume === 'undefined' ? async function (){throw 'apiResume not defined'} : obj.apiResume;
	this.apiPause = typeof obj.apiPause === 'undefined' ? async function (){throw 'apiPause not defined'} : obj.apiPause;
	this.apiSeek = typeof obj.apiSeek === 'undefined' ? async function (){throw 'apiSeek not defined'} : obj.apiSeek;
	this.apiVolume = typeof obj.apiVolume === 'undefined' ? async function (){throw 'apiVolume not defined'} : obj.apiVolume;


	// sourceList
	this.realSource = typeof obj.realSource === 'undefined' ? true : obj.realSource;
	
	this.addToSourceList = function () {
		// TODO figure out how to call super.onCreate();
		if (this.realSource) {
			sourceList.push(this);
		}
	}

	this.onCreate();
	this.addToSourceList();
}

/*
async function start(track) {
	// source is only checked for here because the track could possibly have a 'none' source, for no track, maybe this isn't the best way to handle none tracks though
	if (sourceList.includes(track.source)) {
		return track.source.start(track).then(function (resolved) {
			track.source.playback.playing = true;
			track.source.playback.track = track;
			track.source.playback.progress = 0;
			track.source.playback.timeStamp = Date.now();

			return resolved;
		}).catch(function (rejected) {
			throw propagateError(rejected);
		});
	} else {
		throw new SjError({
			log: true,
			origin: 'start()',
			message: 'track could not be started',
			reason: 'unknown source',
		});
	}
}
*/

spotify.apiStart = async function (track) {
	return spotifyApi.play({"uris":["spotify:track:" + track.id]}).then(function (resolved) {
		return new SjSuccess({
			log: true,
			origin: 'spotify.start()',
			message: 'track started',
			content: resolved,
		});
	}, function (rejected) {
		throw new SjError({
			log: true,
			code: JSON.parse(rejected.response).error.status,
			origin: 'spotify.start()',
			message: 'spotify track could not be started',
			reason: JSON.parse(rejected.response).error.message,
			content: rejected,
		});
	}).catch(function (rejected) {
		throw propagateError(rejected);
	});
}

youtube.apiStart = async function (track) {
	return new Promise(function (resolve, reject) {
		try {
			youtubePlayer.loadVideoById(track.id);
			youtubePlayer.playVideo();
			youtubePlayer.pauseVideo();

			resolve(new SjSuccess({
				log: true,
				origin: 'youtube.start()',
				message: 'track started',
			}));
		} catch (e) {
			reject(new SjError({
				origin: 'youtube.start()',
				message: 'failed to start youtube track',
				content: e,
			}));
		}
	});
}

/*
async function resume(source) {
	if (sourceList.includes(source)) {
		if (!source.playback.playing) { 
			return source.resume().then(function (resolved) {
				source.playback.playing = true;
				return resolved;
			}).catch(function (rejected) {
				throw rejected;
			});
		} else {
			return new SjSuccess({
				log: true,
				origin: 'resume()',
				message: 'track was already playing',
			});
		}
	} else {
		throw new SjError({
			log: true,
			origin: 'resume()',
			message: 'track could not be resumed',
			reason: 'unknown source',
		});
	}
}
*/

spotify.apiResume = async function () {
	return spotifyApi.play({}).then(function (resolved) {
		return new SjSuccess({
			log: true,
			origin: 'spotify.resume()',
			message: 'track resumed',
			content: resolved,
		});
	}, function (rejected) {
		throw new SjError({
			log: true,
			code: JSON.parse(rejected.response).error.status,
			origin: 'spotify.resume()',
			message: 'spotify track could not be resumed',
			reason: JSON.parse(rejected.response).error.message,
			content: rejected,
		});
	}).catch(function (rejected) {
		throw propagateError(rejected);
	});
}

youtube.apiResume = async function () {
	return new Promise(function (resolve, reject) {
		try {
			youtubePlayer.playVideo();
			
			resolve(new SjSuccess({
				log: true,
				origin: 'youtube.resume()',
				message: 'track started',
			}));
		} catch (e) {
			reject(new SjError({
				origin: 'youtube.resume()',
				message: 'failed to resume youtube track',
				content: e,
			}));
		}
	});
}

// async function pause(source) {
// 	if (sourceList.includes(source)) {
// 		if (source.playback.playing) {
// 			return source.pause().then(function (resolved) {
// 				source.playback.playing = false;
// 				return resolved;
// 			}).catch(function (rejected) {
// 				throw propagateError(rejected);
// 			});
// 		} else {
// 			return new SjSuccess({
// 				log: true,
// 				origin: 'pause()',
// 				message: 'track was already paused',
// 			});
// 		}
// 	} else {
// 		return new SjError({
// 			log: true,
// 			origin: 'pause()',
// 			message: 'track could not be paused',
// 			reason: 'unknown source',
// 		});
// 	}
// }

spotify.apiPause = async function () {
	return spotifyApi.pause({}).then(function (resolved) {
		return new SjSuccess({
			log: true,
			origin: 'spotify.pause()',
			message: 'track paused',
			content: resolved,
		});
	}, function (rejected) {
		throw new SjError({
			log: true,
			code: JSON.parse(rejected.response).error.status,
			origin: 'spotify.pause()',
			message: 'spotify track could not be paused',
			reason: JSON.parse(rejected.response).error.message,
			content: rejected,
		});
	}).catch(function (rejected) {
		throw propagateError(rejected);
	});
}

youtube.apiPause = async function () {
	return new Promise(function (resolve, reject) {
		try {
			youtubePlayer.pauseVideo();
			resolve(new SjSuccess({
				log: true,
				origin: 'youtube.pause()',
				message: 'track paused',
			}));
		} catch (e) {
			reject(new SjError({
				log: true,
				origin: 'youtube.pause()',
				message: 'failed to pause',
				content: e,
			}));
		}
	});
}

/*
async function seek(source, ms) {
	if (sourceList.includes(source)) {
		return source.seek(ms).then(function (resolved) {
			source.playback.progress = ms;
			source.playback.timeStamp = Date.now();
			return resolved;
		}).catch(function (rejected) {
			throw propagateError(rejected);
		});
	} else {
		return new SjError({
			log: true,
			origin: 'seek()',
			message: 'track could not be seeked',
			reason: 'unknown source',
		});
	}
}
*/

spotify.apiSeek = async function (ms) {
	return spotifyApi.seek(ms, {}).then(function (resolved) {
		return new SjSuccess({
			log: true,
			origin: 'spotify.seek()',
			message: 'track seeked',
			content: resolved,
		});
	}, function (rejected) {
		throw new SjError({
			log: true,
			code: JSON.parse(rejected.response).error.status,
			origin: 'spotify.seek()',
			message: 'spotify track could not be seeked',
			reason: JSON.parse(rejected.response).error.message,
			content: rejected,
		});
	}).catch(function (rejected) {
		throw propagateError(rejected);
	});
}

youtube.apiSeek = async function (ms) {
	return new Promise(function (resolve, reject) {
		try {
			// (seconds - number, allowSeekAhead of loading - boolean)
			youtubePlayer.seekTo(Math.round(ms / 1000), true);

			resolve(new SjSuccess({
				log: true,
				origin: 'youtube.seek()',
				message: 'track seeked',
			}));
		} catch (e) {
			reject(new SjError({
				log: true,
				origin: 'youtube.seek()',
				message: 'failed to seek',
				content: e,
			}));
		}
	});
}

/*
async function volume(source, volume) {
}
*/

spotify.apiVolume = async function (volume) {
}

youtube.apiVolume = async function (volume) {
}


//  ██████╗  █████╗  ██████╗ ███████╗
//  ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
//  ██████╔╝███████║██║  ███╗█████╗  
//  ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
//  ██║     ██║  ██║╚██████╔╝███████╗
//  ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
//                                   




// TODO $(document).on('x') uses a lot of resources - on() is the only way to access dynamically generated elements, should change all of these to be more specific than just document to reduce search time

// list
$(document).on("click", ".searchResultPreview", function() {
	console.log(".searchResultPreview clicked");

	desiredPlayback.start($(this).parent().data('track'));
});

$(document).on("click", ".addTrack", function() {
	console.log(".addTrack clicked");

	addTrack($(this).parent().data('track'), $('#playlistId'));
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

// playback
$(document).on("click", "#search", function() {
	console.log("#search clicked");

	search($('#uri').val());
});

$(document).on("click", "#toggle", function() {
	console.log("#toggle clicked");

	desiredPlayback.toggle();
});

var dragging = false;

$('#progressBar').slider({
	// http://api.jqueryui.com/slider/
	min: 0,
	max: 100,
	step: 1, // must be 1 if dealing later with milliseconds or else spotify api will spit back NaN if float
	change: function (event, {handle, handleIndex, value}) {
		// 'Triggered after the user slides a handle, if the value has changed, or if the value is changed programmatically via the value method.'

		// Update timeMarker according to slider position, whenever slider position changes
		$('#val').html(value);
	},
	slide: function (event, {handle, handleIndex, value}) {
		// 'Triggered on every mouse move during slide. The value provided in the event as ui.value represents the value that the handle will have as a result of the current movement.'

		// Update timeMarker according to slider position, when dragging
		$('#val').html(value);
	},
	start: function (event, {handle, handleIndex, value}) {
		// 'Triggered when the user starts sliding.'
		dragging = true;
	},
	stop: function (event, {handle, handleIndex, value}) {
		// 'Triggered after the user slides a handle.'
		dragging = false;

		// store and trigger playback request based on slider position
		desiredPlayback.seek($('#progressBar').slider('option', 'value'));
	},
});

/* ----------------- */

function inferProgress() {
	var now = Date.now();
	desiredSourcePlayback().progress += now - desiredSourcePlayback().timeStamp;
	desiredSourcePlayback().timeStamp = now;
}

function displayProgress() {
	// TODO this is slightly crude and untested, but prevents the slider from jumping back sometimes when seeking during play, prevents infered progress from interupting between a requested progress and its result, however should consider making this 'pendingSeek' a larger state witha  system
	if (desiredPlayback.pendingSeek) {
		$('#progressBar').slider('option', 'value', desiredPlayback.progress);
	} else {
		$('#progressBar').slider('option', 'value', desiredSourcePlayback().progress);
	}
}

function progressCheck() {
	// entire function takes roughly 180ms to complete, and will never sync with perfect fractions of the interval
	// because of this ive decided to not bother syncing the timer with progress actions (to do this: reset the interval on every SjSuccess result of a progress action)

	if (desiredSourcePlayback().playing) { 
		// TODO playing should not be the trigger for inferProgress, as this doesnt keep track of when playback is paused and then resumed (inferProgress will assume all that time it as been playing as well), should instead be a startInfer, and stopInfer function
		inferProgress();
	}
	if (!dragging) {
		displayProgress();
	}
}

var progressTimer = null;

function resetProgressTimer(ms) {
	clearInterval(progressTimer);
	progressCheck(); // also call immediately
	progressTimer = setInterval(progressCheck, ms);
}

resetProgressTimer(1000);

/*
var temp = setInterval(function () {
	spotify.checkPlayback().then(resolved => {
		console.warn(spotify.playback.playing);
	});
}, 200);
*/

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
