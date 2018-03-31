	</body>

	<script>
		// globals
		<?php
			if (isset($_SESSION['spotifyAccessToken'])) {
				echo "var spotifyAccessToken = " . json_encode($_SESSION['spotifyAccessToken']);
			} else {
				echo "var spotifyAccessToken = ''";
			}

		?>

		// constants
		var WEB_PLAYER_NAME = 'StreamJockey Web Player';
	</script>

<!--
	<script src='https://sdk.scdn.co/spotify-player.js'></script>
	<script>
		// this method must be defined immediately after spotify-player.js
		window.onSpotifyWebPlaybackSDKReady = () => {
			// initialize
			const token = spotifyAccessToken;
			const player = new Spotify.Player({
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
	</script>
-->

	<script src='jquery-3.3.1.js'></script>
	<!-- javascript wrapper -->
	<script src='spotify-web-api.js'></script>

	<script src='main.js'></script>
</html>