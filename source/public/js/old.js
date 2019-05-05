//----------- DISTRIBUTE ALL OF THIS INTO GLOBAL / GLOBAL-CLIENT / GLOBAL-SERVER


//  ██████╗  █████╗  ██████╗ ███████╗
//  ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
//  ██████╔╝███████║██║  ███╗█████╗  
//  ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
//  ██║     ██║  ██║╚██████╔╝███████╗
//  ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝

/* TODO
	$(document).on('x') uses a lot of resources - on() is the only way to access dynamically generated elements, should change all of these to be more specific than just document to reduce search time
*/

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

//----------

// list
$(document).on("click", ".searchResultPreview", function() {
	console.log(".searchResultPreview clicked");

	desiredPlayback.start($(this).parent().data('track')); //! <--
});
$(document).on("click", ".addTrack", function() {
	console.log(".addTrack clicked");

	addTrack($(this).parent().data('track'), $('#playlistId'));
});

// playback
// TODO move playback controls to a better location
$(document).on("click", "#search", function() {
	console.log("#search clicked");

	search($('#uri').val());
});
$(document).on("click", "#toggle", function() {
	console.log("#toggle clicked");

	desiredPlayback.toggle(); //! <--
});

//! VVVVVVV

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

function inferProgress() {
	var now = Date.now();
	desiredPlayback.current().progress += now - desiredPlayback.current().timeStamp;
	desiredPlayback.current().timeStamp = now;
}

function displayProgress() {
	// TODO this is slightly crude and untested, but prevents the slider from jumping back sometimes when seeking during play, prevents inferred progress from interrupting between a requested progress and its result, however should consider making this 'pendingSeek' a larger state with a system
	if (playbackQueue.hasObject('SjSeek')) {
		$('#progressBar').slider('option', 'value', desiredPlayback.progress);
	} else {
		$('#progressBar').slider('option', 'value', desiredPlayback.current().progress);
	}
}

function progressCheck() {
	// entire function takes roughly 180ms to complete, and will never sync with perfect fractions of the interval
	// because of this ive decided to not bother syncing the timer with progress actions (to do this: reset the interval on every SjSuccess result of a progress action)

	if (desiredPlayback.current().playing) { 
		// TODO playing should not be the trigger for inferProgress, as this doesn't keep track of when playback is paused and then resumed (inferProgress will assume all that time it as been playing as well), should instead be a startInfer, and stopInfer function
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


