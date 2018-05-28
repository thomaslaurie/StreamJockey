	</body>

	<!-- variables -->
	<script>
		// constants
		var WEB_PLAYER_NAME = 'StreamJockey Web Player';

		// pass php variables to javascript
		<?php
			if (isset($_SESSION['spotifyAccessToken'])) {
				echo "var spotifyAccessToken = " . json_encode($_SESSION['spotifyAccessToken']);
			} else {
				echo "var spotifyAccessToken = ''";
			}
		?>
	</script>

	<!-- libraries -->
	<script src='jquery-3.3.1.js'></script>
	<script src='jquery-ui/jquery-ui.js'></script>

	<script src='moment.js'></script>

	<!-- own -->
	<script src='main.js'></script>
	
	<!-- APIs -->
	<script src='spotify-web-api.js' onload="spotify.loadApi()"></script> <!-- spotify javascript wrapper -->
	<script src="https://apis.google.com/js/api.js" onload="youtube.loadApi()"></script> <!-- youtube data api 		
		async loads script at the same time html is being parsed, defer doesnt run the script until html has been fully parsed 
		http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
		
		google's extensive version: 
		when this script loads, it changes its own onload attribute to an empty function, then calls handleClientLoad()
		<script async defer src="https://apis.google.com/js/api.js" onload="this.onload=function(){};handleClientLoad()" onreadystatechange="if (this.readyState === 'complete') this.onload()"></script> -->
</html>