	</body>

	<script src='jquery-3.3.1.js'></script>

	<script src='https://sdk.scdn.co/spotify-player.js'></script>
	<script>
		// this method must be defined immediately after spotify-player.js
		window.onSpotifyWebPlaybackSDKReady = () => {
			// initialize
			const token = <?php echo "'".$accessToken."'"; ?>;
			const player = new Spotify.Player({
				name: 'Web Playback SDK Quick Start Player',
				getOAuthToken: cb => { cb(token); }
			});

			// configure listeners
			// error handling
			player.addListener('initialization_error', ({ message }) => { console.error('message'); });
			player.addListener('authentication_error', ({ message }) => { console.error('message'); });
			player.addListener('account_error', ({ message }) => { console.error('message'); });
			player.addListener('playback_error', ({ message }) => { console.error('message'); });

			// playback status updates
			player.addListener('player_state_changed', state => { console.log('state'); });

			// ready
			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', 'device_id');
			});

			// connect to player
			player.connect();
		};
	</script>
	<script>
		$(document).ready(function() {
			$("#start").click(function() {
				console.log("#start.click() called");
			});

			$("#play").click(function() {
				console.log("#play.click() called");
			});

			$("#pause").click(function() {
				console.log("#pause.click() called");
			});


			console.log("ready");
		});
	</script>
	<script src="main.js"></script>
</html>