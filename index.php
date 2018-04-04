<?php
	// TODO fill in error targets

	require_once('top.php');

	// page
	require_once('header.php');

	// --> do stuff now
	// It's now possible to request data from the Spotify catalog

	// $testTrack = '4bEcoz1OcfMgUbp2ft8ieQ';

	// echo $_SESSION['spotifyAPI']->getTrack($testTrack)->name;
	// echo '<br>';
	// $artistsTest = $_SESSION['spotifyAPI']->getTrack($testTrack)->artists;
	// foreach($artistsTest as $artist) {
	// 	echo $artist->name;
	// }

?>
	<button id='spotifyConnectAccount'>Spotify Connect Account</button>
	<a href='auth.php?command=spotify'>Connect Account</a>
	<button id='connectPlayer'>Connect Player</button>
	<input id='uri' type='text' placeholder='search' value='tycho'>
	<p>3BiIPNWmMeJAK9iwEFTeDX</p>
	<p id='result'>Result</p>
	<button id='search'>Search</button>
	<button id='toggle'>Toggle</button>
	<button id='seek'>Seek</button>
	<button id='ajax'>Ajax</button>
	<button id='test'>Test</button>
	<div id="youtubePlayerWrapper">
        <div id="youtubePlayer"></div>
    </div>
	<ul id='list'></ul>
<?php
	require_once('footer.php');
?>


