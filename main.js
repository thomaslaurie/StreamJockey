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
var test = 0;
var prom = new Promise(function (resolve, reject) {
	console.log('resolver');
	var dilly = function () {
		console.log('timer');
		test = test + 1;
		if (test >= 2) {
			resolve(test);
		} else {
			reject(test + ' rejected');
		}
	}

	setTimeout(dilly, 1000);
	
});

// TODO fuck promises what is going on


// test
$('#test').click(function() {
	prom.then(function (num) {
		console.log(num);
	}).catch(function (error) {
		console.error(error);
	});
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

var noSource = new SjSource({
	realSource: false,
});

noTrack.source = noSource; // will be undefined if defined in noTrack (before noSource is defined) and vice versa


// sources
var sourceList = [];

var spotify = new SjSource({
});

var youtube = new SjSource({
	idPrefix: 'https://www.youtube.com/watch?v=',
});

// TODO work out objects/classes/prototypes
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


function SjSource(obj) {
	// TODO current methods of looping through SjSource object properties may fail if they have any prototype properties

	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjSource';

	// new properties
	this.idPrefix = typeof obj.idPrefix ==='undefined' ? '' : obj.idPrefix;
	
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

	// !!! cyclical reference - has SjPlayback object which has SjTrack object which has this SjSource object
	this.playback = typeof obj.playback === 'undefined' ? new SjPlayback({}) : obj.playback;

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

function SjPlayback(obj) {
	// super
	SjObject.call(this, obj);

	// overwritten properties
	this.objectType = 'SjPlayback';

	// new properties
	// track
	this.track = typeof obj.track === 'undefined' ? noTrack : obj.track;

	// playing
	this.playing = typeof obj.playing === 'undefined' ? false : obj.playing;

	// progress
	this.progress = typeof obj.progress === 'undefined' ? 0 : obj.progress;
	this.timeStamp = typeof obj.timeStamp === 'undefined' ? Date.now() : obj.timeStamp;

	// volume
	// TODO add volume

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

	this.addError = function (obj) {
		// add anything to the error list
		this.errorList.content.push(propagateError(obj));
	}

	this.nonSuccessCheck = function (result) {
		// adds anything that isnt a SjSuccess object
		if (!matchType(result, 'SjSuccess')) {
			this.addError(result);
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
			// if errorList is empty, return success
			this.success.announce();
			return this.success;
		} else {
			// else return the list
			this.errorList.announce();
			return this.errorList;
		}
	}

	this.endPart = function () {
		// increment part count
		this.count++;
		// callback result if all parts are complete
		if (this.isComplete()) {
			this.callback(this.result());
		}
	}

	this.endPartQuick = function (result) {
		// handle part result in one function: checking only for non-SjSuccess objects
		this.nonSuccessCheck(result);
		this.endPart();
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
		var newError = catchUnexpected(error);
		console.error(newError);
		addElementError(newError);
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
		url: 'request.php',
		type: 'POST',
		data: data,
		success: function(data){
			try {
				// TODO convert data objects from php to javascript (php objects are not true Sj objects and wont inherit functions)
				data = JSON.parse(data);
				// TODO announce received data
				console.log('Data Received: ' + data);
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

	// typeof null is 'object', must be accounted for
	// https://bitsofco.de/javascript-typeof/
	if (match === 'null') {
		if (input === null) {
			return true;
		} else {
			return false;
		}
	}

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

// TODO convert serverCommands to async (why do these work using return statements???)

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

// TODO convert track.source reference to string when sending to server

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

// TODO most of these functions define their own listeners - which dont allow for callback returns, replaced with var result for now, find a way to handle errors

// api
spotify.loadApi = function () {
	// https://beta.developer.spotify.com/documentation/web-api/
	// https://doxdox.org/jmperez/spotify-web-api-js

	// window is basically the global object and is how to define variables within a function
	window.spotifyApi = new SpotifyWebApi();
	spotifyApi.setAccessToken(spotifyAccessToken);

	var result = new SjSuccess({
		log: true,
		origin: 'spotify.loadApi()',
		message: 'spotify api ready',
	});

	// TODO is there any way this could fail?
}

youtube.loadApi = function () {
	// TODO polish $.getScript() success/error handling

	// Get Script
	// https://api.jquery.com/jquery.getscript/
	$.getScript('https://apis.google.com/js/api.js', function() {
		// original code: https://developers.google.com/youtube/v3/docs/search/list
	
		// Load libraries
		// https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiloadlibraries-callbackorconfig
		gapi.load('client:auth2', {
			callback: function() {
			  // if success

				// Initialize the gapi.client object, which app uses to make API requests.
				// https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientinitargs
				// Promises: https://developers.google.com/api-client-library/javascript/features/promises
				gapi.client.init({
					'apiKey': 'AIzaSyA8XRqqzcwUpMd5xY_S2l92iduuUMHT9iY',
					'clientId': '575534136905-vgdfpnd34q1o701grha9i9pfuhm1lvck.apps.googleusercontent.com',
					'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
					// at least one scope is needed, this is the bare minimum scope
					'scope': 'https://www.googleapis.com/auth/youtube.readonly'
				}).then(function (response) {
					var result = new SjSuccess({
						log: true,
						origin: 'youtube.loadApi()',
						message: 'youtube api ready',
					});
				}, function (reason) {
					// TODO fill in reason information
					var result = new SjError({
						log: true,
						origin: 'youtube.loadApi()',
						message: 'failed to load youtube api',
						reason: 'gapi.client.init rejected',
						content: reason,
					});
				});
			},
			onerror: function() {
				// TODO fill in reason information
				var result = new SjError({
					log: true,
					origin: 'youtube.loadApi()',
					message: 'failed to load youtube libraries',
					reason: 'gapi.load error',
					content: reason,
				});
			},
			//timeout: 5000, // 5 seconds.
			//ontimeout: function() {
			  // Handle timeout.
			  //alert('gapi.client could not load in a timely manner!');
		});
	}).fail(function (jqxhr, settings, exception) {
		// TODO fill in reason information
		var result = new SjError({
			log: true,
			origin: 'youtube.loadApi()',
			message: 'failed to load youtube api',
			reason: '$.getScript() for youtube api failed',
		});
	});
}

// player

// TODO is there a significant discrepancy between potential synchrounous/local sources (listeners) and asynchronous api calls for progress checks? WHich information sources are synchronous/local? Should their information override the api information?

spotify.loadPlayer = function () {
	// sets up a local Spotify Connect device, but cannot play or search tracks (limited to modifying playback state, but don't do that here)
	// API can make playback requests to the currently active device, but wont do anything if there isn't one active, this launches one
	// https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-connect

	// TODO requires spotifyAccessToken, if this changes (ie. token frefresh, account swap) how does player get updated? 

	$.getScript('https://sdk.scdn.co/spotify-player.js').fail(function (jqxhr, settings, exception) {
		// TODO fill in reason information
		var result = new SjError({
			log: true,
			origin: 'spotify.loadPlayer()',
			message: 'failed to load spotify player',
			reason: '$.getScript() for spotify player failed',
		});
	});
	// onSpotifyWebPlaybackSDKReady must be defined immediately after spotify-player.js, acts as the callback function
	window.onSpotifyWebPlaybackSDKReady = function () {
		// initialize
		var player = new Spotify.Player({
			name: WEB_PLAYER_NAME,
			getOAuthToken: cb => { cb(spotifyAccessToken); }
		});

		// configure listeners
		// https://developer.spotify.com/documentation/web-playback-sdk/reference/#events
		// error handling
		// ({param}) destructuring: https://stackoverflow.com/questions/37661166/what-do-function-parameter-lists-inside-of-curly-braces-do-in-es6
		player.addListener('initialization_error', function ({message}) { 
			var result = new SjError({
				log: true,
				origin: 'spotify.loadPlayer()',
				message: 'spotify player encountered an initialization error',
				reason: message,
			});
		});
		player.addListener('authentication_error', function ({message}) { 
			var result = new SjError({
				log: true,
				origin: 'spotify.loadPlayer()',
				message: 'spotify player encountered an authentication error',
				reason: message,
			}); 
		});

		player.addListener('account_error', function ({message}) { 
			console.error(message); 
			// TODO non callback
		});
		player.addListener('playback_error', function ({message}) { 
			console.error(message); 
			// TODO non callback
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

		// ready
		player.addListener('ready', function ({device_id}) {
			// returns a WebPlaybackPlayer object which just contains the created device_id
			// https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#object-web-playback-player

			spotifyApi.transferMyPlayback([device_id], {}, function(error, response) {
				// https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/

				if (!matchType(response, 'null')) {
					var result = new SjSuccess({
						log: true,
						origin: 'spotify.loadPlayer()',
						message: 'spotify player loaded',
					});

					// TODO checkPlaybackState() gets an empty response when this is called here - Why???
					// updatePlayback();
				} else if (!matchType(error, 'null')) {
					var result = new SjError({
						log: true,
						code: JSON.parse(error.response).error.status,
						origin: 'spotify.loadPlayer()',
						message: 'spotify player could not be loaded',
						reason: JSON.parse(error.response).error.message,
						content: error,
					});
				} else {
					var result = new SjError({
						log: true,
						origin: 'spotify.loadPlayer()',
						message: 'spotify player could not be loaded',
						reason: 'no response',
					});
				}
			});
		});

		// connect to player
		player.connect().then(function (success) {
			// https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-connect
			// returns a promise with a boolean for whether or not the connection was successful
			// if connect() succeeded no action needed, player might still not be ready, will trigger the ready listener when ready
			if (!success) {
				callback(new SjError({
					log: true,
					origin: 'spotify.loadPlayer()',
					message: 'spotify player failed to connect',
					reason: 'spotify.connect() failed',
				}));
			}
		});
	}

	// TODO any way onSpotifyWebPlaybackSDKReady() could fail?
}

youtube.loadPlayer = function () {
	$.getScript('https://www.youtube.com/iframe_api').fail(function (jqxhr, settings, exception) {
		// TODO fill in reason information
		callback(new SjError({
			log: true,
			origin: 'youtube.loadPlayer()',
			message: 'failed to load youtube player',
			reason: '$.getScript() for youtube player failed',
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

		// nothing other than playing is given information here, however beacause the api functions are synchronous (except for the track) could we not just call them here too? even though the actions of play/pause and seeking are infrequent enough to warrent checking everytime - theres a triple state change (2, 3, 1) when just seeking so there would have to be check to limit the check to one time

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
function search(term) {
	var asyncList = new AsyncList({
		totalCount: sourceList.length,
		success: new SjSuccess({
				origin: 'search()',
			}),
		errorList: new SjErrorList({
				origin: 'search()',
			}),
		callback: function (result) {
			if (matchType(result, 'SjSuccess')) {
				refreshSearchResults();
			} else {
				handleError(result);
			}
		},
	});

	sourceList.forEach(function (source) {
		source.search(term, function(result) {
			asyncList.endPartQuick(result);
		});
	});
}

spotify.search = function (term, callback) {
	var options = {
		// max number of results to return, min 1, max 50, default 20
		limit: searchResults.tracksPerSource,
		// offset of first result, use with limit to get paged results min 0, max 100 000, default 0
		offset: searchResults.tracksPerSource * (searchResults.page - 1),
	};

	spotifyApi.searchTracks(term, options, function(error, response) {
		if (!matchType(response, 'null')) {
			// update searchResults
			searchResults.term = term;

			spotify.getTracks(response.tracks.items, function(result) {
				if (matchType(result, 'SjPlaylist')) {
					searchResults.spotify = result;

					callback(new SjSuccess({
						log: true,
						origin: 'spotify.search()',
						message: 'tracks retrieved',
					}));
				} else {
					callback(propagateError(result));
				}
			});
		} else if (!matchType(error, 'null')) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'spotify.search()',
				message: 'tracks could not be retrieved',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		} else {
			callback(new SjError({
				log: true,
				origin: 'spotify.search()',
				message: 'tracks could not be retrieved',
				reason: 'empty response',
			}));
		}
	});
}

spotify.getTracks = function (items, callback) {
	// takes spotify's response.tracks.items array
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
	callback(playlist);
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
			// array of track objects
			var playlist = new SjPlaylist({
				origin: 'youtube.getTracks() gapi.client.request().then()',
			});

			fufilled.result.items.forEach(function (track, i) {
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
	pendingToggle: false, // why is this needed? to prevent duplicate (very fast) requests from reaching the api (that get past the 'waves' of checkPlaybackState() within updatePlayback()), if this is uses why are redundancy checks still needed in the source functions? because they still prevent internal calls to the functions???
	pendingSeek: false,
});

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
			if failure: change pendingAction to false, trigger manual-retry process which bascially sends a completely new request...


*/


// TODO TODO TODO IMPLEMENT PROMISES, NO IMPLEMENT ASYNC & AWAIT, I THINK THEY'LL BE BETTER & AVOID CALLBACK HELL, (asyncList can actually be converted to promise.all too) TODO TODO TODO

desiredPlayback.start = function (track) {
	this.track = track;
	this.pendingStart = true;
	this.playing = true;

	// Set slider range to track duration
	$('#progressBar').slider('option', 'max', this.track.duration); // TODO should this be put somewhere else?

	updatePlayback();
}

desiredPlayback.toggle = function () {
	this.playing = !this.playing;
	this.pendingToggle = !this.pendingToggle; // if already pending, remove pending (-1 * -1 = 1); if not pending, add pending
	
	updatePlayback();
}

desiredPlayback.seek = function (ms) {
	this.progress = ms;
	this.pendingSeek = true;
	updatePlayback();
}

desiredPlayback.volume = function (volume) {
	this.volume = volume;
	updatePlaybackVolume();
}

// TODO
// the goal of calling multiple things at the same time is to conserve api requests via checkPlaybackState(), additionally api calls sould not interfere or overlap with each other and must be called in sequence, not in parallel (maby add a queue?)
// however it is unlikely these requests will happen at the same time (but maybe very close to each other), so updatePlayback() doesnt really help with that anyways

// everything is done on update for redundancy checks
// maybe add a queue but have it mesh into the sequential updatePlayback() if its too slow



function desiredSourcePlayback() {
	// shorthand, TODO is there a better way?
	return desiredPlayback.track.source.playback;
}


function checkPlaybackState(callback) {
	// TODO ??? result is not passed in callback, deal with this
	var asyncList = new AsyncList({
		totalCount: sourceList.length,
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

	sourceList.forEach(function (source) {
		source.checkPlayback(function(result) {
			asyncList.endPartQuick(result);
		});
	});
}

// !!! checkPlayback functions must save timeStamp immediately after progress is avaliable
spotify.checkPlayback = function (callback) {
	// 1 api call (all)

	spotifyApi.getMyCurrentPlaybackState({}, function(error, response) {
		if (!matchType(response, 'null')) {
			spotify.playback.track = {
				source: spotify,
				id: response.item.id,
				artists: [],
				title: response.item.name,
				duration: response.item.duration_ms,
				link: response.item.external_urls.spotify,
			}

			// fill artists
			response.item.artists.forEach(function (artist, j) {
				spotify.playback.track.artists[j] = artist.name;
			});

			spotify.playback.playing = response.is_playing; // TODO will cause an error if no track is playing, will break this entire function

			spotify.playback.progress = response.progress_ms;
			spotify.playback.timeStamp = response.timestamp;
			
			callback(new SjSuccess({
				log: true,
				origin: 'spotify.checkPlayback()',
				message: 'spotify playback state checked',
			}));
		} else if (!matchType(error, 'null')) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'spotify.checkPlayback()',
				message: 'failed to check spotify playback state',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		} else {
			callback(new SjError({
				log: true,
				origin: 'spotify.checkPlayback()',
				message: 'failed to check spotify playback state',
				reason: 'no response',
			}));
		}
	});

}

youtube.checkPlayback = function (callback) {
	// 3 player calls - these are all synchronous - should not return errors, but still check their possible return types
	// 1 api call (track)

	// id?
	// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
	var id = youtubePlayer.getVideoUrl().split("v=")[1]; // TODO potential uncaught TypeError here
	if (id) {
		// if not empty
		var andPosition = id.indexOf('&'); 
		if (andPosition != -1) { id = id.substring(0, andPosition); }

		youtube.getTracks([id], function(result) {
			if (matchType(result, 'SjPlaylist')) {
				if (result.content.length === 1) {
					youtube.playback.track = result.content[0];

					callback(new SjSuccess({
						log: true,
						origin: 'youtube.checkPlayback()',
						message: 'youtube playback state checked',
					}));
				} else {
					callback(new SjError({
						log: true,
						code: '404',
						origin: 'youtube.checkPlayback()',
						message: 'track not found',
						reason: 'id: ' + id +' was not found',
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
}


function updatePlaybackTrack(callback) {
	// TODO need a better handler for no source/track desired, right now the 'none' source (not in sourceList) sort of deals with this, but not perfectly	
	if (desiredPlayback.track.id !== desiredSourcePlayback().track.id || desiredPlayback.pendingStart) {
		// desired track changed & pending start --> normal start different track request
		// desired track unchanged & pending start --> 'start' same track request
		// desired track changed & no pending start --> shouldn't technically happen, but start track anyways to reflect proper values

		// TODO some sequencing with pause & start, what order? parallel or in sequence?
		var asyncList = new AsyncList({
			totalCount: sourceList.length + 1, // pause all + start one
			success: new SjSuccess({
					origin: 'updatePlaybackTrack()',
					message: 'track changed',
				}),
			errorList: new SjErrorList({
					origin: 'updatePlaybackTrack()',
					message: 'failed to update playback track',
				}),
			callback: function (result) {
				if (matchType(result, 'SjSuccess')) {
					desiredPlayback.pendingStart = false;
				}
	
				callback(result);
			},
		});

		// pause all
		sourceList.forEach(function (source) {
			pause(source, function (result) {
				asyncList.endPartQuick(result);
			});
		});

		// start 1 track
		start(desiredPlayback.track, function (result) {
				asyncList.endPartQuick(result);
		});	
	} else {
		// desired track unchanged & no pending start --> don't do anything
		callback(new SjSuccess({
			log: true,
			origin: 'updatePlaybackTrack()',
			message: 'track is same & start update undesired',
		}));
	}
}

function updatePlaybackPlaying(callback) {
	var asyncList = new AsyncList({
		totalCount: sourceList.length,
		success: new SjSuccess({
				origin: 'updatePlaybackPlaying()',
				message: 'updated playback playing',
			}),
		errorList: new SjErrorList({
				origin: 'updatePlaybackPlaying()',
				message: 'failed to update playback playing',
			}),
		callback: function (result) {
			if (matchType(result, 'SjSuccess')) {
				desiredPlayback.pendingtoggle = false;
			}

			callback(result);
		},
	});

	if (desiredPlayback.pendingToggle) {
		if (desiredPlayback.playing) {
			sourceList.forEach(function (source) {
				if (source === desiredPlayback.track.source) {
					// resume desired source
					resume(source, function (result) {
						asyncList.endPartQuick(result);
					});
				} else {
					// pause all other sources
					pause(source, function (result) {
						asyncList.endPartQuick(result);
					});
				}
			});
		} else {
			// pause all sources
			sourceList.forEach(function (source) {
				pause(source, function (result) {
					asyncList.endPartQuick(result);
				});
			});
		}
	} else {
		callback(new SjSuccess({
			origin: 'updatePlaybackPlaying()',
			message: 'playing update undesired',
		}));
	}
}

function updatePlaybackProgress(callback) {
	if (desiredPlayback.pendingSeek) {
		sourceList.forEach(function (source) {
			if (source === desiredPlayback.track.source) {
				console.log(desiredPlayback.progress);
				seek(source, desiredPlayback.progress, function (result) {
					if (matchType(result, 'SjSuccess')) {
						desiredPlayback.pendingSeek = false;

						callback(new SjSuccess({
							log: true,
							origin: 'updatePlaybackProgress()',
							message: 'playback progress changed',
						}));
					} else {
						callback(propagateError(result));
					}
				});
			}
		});
	} else {
		callback(new SjSuccess({
			log: true,
			origin: 'updatePlaybackProgress()',
			message: 'progress update undesired',
		}));
	}
}

function updatePlaybackVolume(callback) {
	// TODO add volume
}



// TODO imagine all playback types being changed meaningfully at the same time: new track, playing, progress, and volume - is there a specific order that these must be in to avoid stuttering? its complicated - have to draw it out
function updatePlayback() {
	// TODO desiredPlayback states do not reset if unsuccessful

	// get most current info
	checkPlaybackState(function(result) {
		if (matchType(result, 'SjSuccess')) {
			// update three playback types
			updatePlaybackTrack(function (result) {
				if (matchType(result, 'SjSuccess')) {
					updatePlaybackPlaying(function (result) {
						if (matchType(result, 'SjSuccess')) {
							updatePlaybackProgress(function (result) {
								if (matchType(result, 'SjSuccess')) {
									// TODO success handle
									console.log('updatePlayback() finished');

									// callback(new SjSuccess({
									// 	log: true,
									// 	source: 'updatePlayback()',
									// 	message: 'playback state updated',
									// }));
								} else {
									handleError(result);
									//callback(propagateError(result));
								}
							});
						} else {
							handleError(result);
							//callback(propagateError(result));
						}
					});
				} else {
					handleError(result);
					//callback(propagateError(result));
				}
			});
		} else {
			// TODO make better handling of checkPlaybackState, maybe keep a list of all unknown states based on the SjErrorList? then only fail if the desired state requires knowing one of the unknowns
			handleError(result);
			//callback(propagateError(result));
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

/* !!!
	Don't directly use source.control() functions, they dont have redundancy checks (against knownPlaybackState) or anything else, they simply interface the api to the app. They assume the knownPlaybackState info is correct and will act accordingly.

	Use the aggregator functions in conjunction with checkPlaybackState() (like in updatePlayback()) to control playback.
*/

/* REFLECTION
	 I considered instead of updating playback state in each source function upon SjSuccess, to do a second and final checkPlaybackState() once updatePlayback() succeeds (this would require two api calls, but I thought it could be simpler (but would it?)).
	
	 I thought because track info is also needed (in addition to playback state) that a final checkPlaybackState() would be needed to verify the post-update track info, (this came from not knowing what track was playing when starting one for the first time), however this info should already be known from the fetched and displayed track (object), so all of these functions actually do have the ability to update information when resolved.

	This resolution sugggests using track objects everywhere as parameters rather than ids; this should be possible because the user is never going to be blindly playing id strings without the app first searching and tying down its additional metadata.

*/

/* REFLECTION
	I considered that setting knownPlayback.progress upon start() (0) and seek() (ms) may wipeout any offical information from checkPlaybackState() or listeners, as any information that arrives between sending and receiving the request will be wiped out upon resolution (with less valuable, infered information). 
	
	However unless the information is being sent from a synchronous or local source (which actually is likely), that information should not be sent and received between the timespan it takes for the playback request to be sent and received - therefore it must be sent before and therefore less accurate/valuable than even the inferred progress information.

	Then I realized that any checks to playback state will have the same offset error as the playback requests so it makes no sense to even checkPlaybackState() to get more accurate information.
*/

function start(track, callback) {
	// TODO start doesnt actually need to 'play' the track, it just needs to make it the currently playing track and would be better to start paused to avoid an initial stutter (incase somehow we want to start the track paused)

	// source is only checked for here because the track could possibly have a 'none' source, for no track, maybe this isnt the best way to handle none tracks though
	if (sourceList.includes(track.source)) {
		track.source.start(track, function (result) {
			if (matchType(result, 'SjSuccess')) {
				track.source.playback.playing = true;
				track.source.playback.track = track;
				track.source.playback.progress = 0;
				track.source.playback.timeStamp = Date.now();
			}
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

spotify.start = function (track, callback) {
	spotifyApi.play({"uris":["spotify:track:" + track.id]}, function(error, response) {
		if (!matchType(response, 'null')) {
			callback(new SjSuccess({
				log: true,
				origin: 'start(spotify, ...)',
				message: 'track started',
				content: response,
			}));
		} else if (!matchType(error, 'null')) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'start(spotify, ...)',
				message: 'spotify track could not be started',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		} else {
			callback(new SjError({
				log: true,
				origin: 'start(spotify, ...)',
				message: 'spotify track could not be started',
				reason: 'no response',
			}));
		}
	});
}

youtube.start = function (track, callback) {
	youtubePlayer.loadVideoById(track.id);
	youtubePlayer.playVideo();

	// TODO check if successful?
	callback(new SjSuccess({
		log: true,
		origin: 'start(youtube, ...)',
		message: 'track started',
	}));
}

function resume(source, callback) {
	if (sourceList.includes(source)) {
		if (!source.playback.playing) { 
			source.resume(function (result) {
				if (matchType(result, 'SjSuccess')) {
					source.playback.playing = true;
				}

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
	spotifyApi.play({}, function(error, response) {
		if (!matchType(response, 'null')) {
			callback(new SjSuccess({
				log: true,
				origin: 'resume(spotify, ...)',
				message: 'track resumed',
				content: response,
			}));
		} else if (!matchType(error, 'null')) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'resume(spotify, ...)',
				message: 'spotify track could not be resumed',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		} else {
			callback(new SjError({
				log: true,
				origin: 'resume(spotify, ...)',
				message: 'spotify track could not be resumed',
				reason: 'no response',
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
	if (sourceList.includes(source)) {
		if (source.playback.playing) {
			source.pause(function (result) {
				if (matchType(result, 'SjSuccess')) {
					source.playback.playing = false;
				}

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
	spotifyApi.pause({}, function(error, response) {
		if (!matchType(response, 'null')) {
			callback(new SjSuccess({
				log: true,
				origin: 'pause(spotify, ...)',
				message: 'track paused',
				content: response,
			}));
		} else if (!matchType(error, 'null')) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'pause(spotify, ...)',
				message: 'spotify track could not be paused',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		} else {
			callback(new SjError({
				log: true,
				origin: 'pause(spotify, ...)',
				message: 'spotify track could not be paused',
				reason: 'no response',
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
	if (sourceList.includes(source)) {
		source.seek(ms, function (result) {
			if (matchType(result, 'SjSuccess')) {
				source.playback.progress = ms;
				source.playback.timeStamp = Date.now();
			}

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
	spotifyApi.seek(ms, function(error, response) {
		if (!matchType(response, 'null')) {
			callback(new SjSuccess({
				log: true,
				origin: 'seek(spotify, ...)',
				message: 'track seeked',
				content: response,
			}));
		} else if (!matchType(error, 'null')) {
			callback(new SjError({
				log: true,
				code: JSON.parse(error.response).error.status,
				origin: 'seek(spotify, ...)',
				message: 'spotify track could not be seeked',
				reason: JSON.parse(error.response).error.message,
				content: error,
			}));
		} else {
			callback(new SjError({
				log: true,
				origin: 'seek(spotify, ...)',
				message: 'spotify track could not be seeked',
				reason: 'no response',
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

function volume(source, volume, callback) {

}

spotify.volume = function (volume, callback) {

}

youtube.volume = function (volume, callback) {

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

// playback
$(document).on("click", "#search", function() {
	console.log("#search clicked");

	search($('#uri').val(), function(){
		//do nothing
	});
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
	step: 1, // must be 1 if dealing later with milliseconds or else spotify api will spit back NaN if flaot
	change: function (event, {handle, handleIndex, value}) {
		// 'Triggered after the user slides a handle, if the value has changed, or if the value is changed programmatically via the value method.'

		// Update timeMarker according to slider position, whenver slider position changes
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
