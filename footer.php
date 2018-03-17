	</body>

	<script src='https://sdk.scdn.co/spotify-player.js'></script>
	<script>
		// this must be included inline immediately below spotify-player.js
		window.onSpotifyWebPlaybackSDKReady = () => {
			const token = <?php echo "'".$accessToken."'"; ?>;
			const player = new Spotify.Player({
				name: 'Web Playback SDK Quick Start Player',
				getOAuthToken: cb => { cb(token); }
			});

			// Error handling
			player.addListener('initialization_error', ({ message }) => { console.error('message'); });
			player.addListener('authentication_error', ({ message }) => { console.error('message'); });
			player.addListener('account_error', ({ message }) => { console.error('message'); });
			player.addListener('playback_error', ({ message }) => { console.error('message'); });

			// Playback status updates
			player.addListener('player_state_changed', state => { console.log('state'); });

			// Ready
			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', 'device_id');
			});

			// Connect to the player!
			player.connect();
		};
	</script>
	<script src='main.js'></script>
</html>