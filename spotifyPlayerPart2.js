// this method must be defined immediately after spotify-player.js
window.onSpotifyWebPlaybackSDKReady = () => {
	// stuff inside here is optional though

	// initialize
	var token = spotifyAccessToken;
	var player = new Spotify.Player({
		name: WEB_PLAYER_NAME,
		getOAuthToken: cb => { cb(token); }
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
		console.log('Ready with Device ID', device_id);
	});

	// connect to player
	player.connect();
};