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
<section>
	<p id='statusUser'>Guest</p>
</section>
<section>
	<button id='test'>Test</button>
	<input id='testInput' type='text' placeholder='test input'>
</section>

<section>
	<input id='loginUserName' type='text' placeholder='username' value='test4'>
	<input id='loginPassword' type='password' name='password' placeholder='password' value='test4test4'>
	<button id='loginSubmit'>Login</button>
	<button id='logoutSubmit'>Logout</button>
</section>

<section>
	<input id='registerEmail' type='text' placeholder='e-mail'>
	<input id='registerUserName' type='text' placeholder='username'>
	<input id='registerPassword1' type='password' placeholder='password'>
	<input id='registerPassword2' type='password' placeholder='password again'>
	<button id='registerSubmit'>Register</button>
</section>

<section>
	<input id='playlistTitle' type='text' placeholder='title' value='playlist1'>
	<input id='playlistVisibility' type='text' placeholder='visibility' value='public'>
	<textarea id='playlistDescription' placeholder='description'></textarea>
	<input id='playlistColor' type='text' placeholder='color'>
	<input id='playlistImage' type='text' placeholder='image link'>
	<button id='addPlaylistSubmit'>Add Playlist</button>
</section>

<section>
	<input id='playlistId' type='text' placeholder='id'>
	<button id='getPlaylistSubmit'>Get Playlist</button>
	<button id='deletePlaylistSubmit'>Delete Playlist</button>
	<button id='orderPlaylistSubmit'>Order Playlist</button>
	<input id='position' type='text' placeholder='id'>
	<button id='deleteTrackSubmit'>Delete Track</button>
</section>

<section>
	<button id='spotifyConnectAccount'>Spotify Connect Account</button>
	<button id='connectPlayer'>Connect Player</button>
</section>

<section>
	<button id='toggle'>Toggle</button>
	<button id='seek'>Seek</button>
	<div id="youtubePlayerWrapper">
        <div id="youtubePlayer"></div>
    </div>
</section>

<section>
	<input id='uri' type='text' placeholder='search' value='tycho'>
	<button id='search'>Search</button>
	<ul id='list'></ul>
</section>
	
<?php
	require_once('footer.php');
?>


