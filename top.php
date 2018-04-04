<?php
	// Composer created files containing dependencies (spotify api php wrapper)
	require_once('vendor/autoload.php');

	require_once('functions.php');

	session_start();

	// globals
	// registration
	$GLOBALS['stringMaxLength'] = 100;
	$GLOBALS['nameMinLength'] = 2;
	$GLOBALS['passwordMinLength'] = 6;

	// site

	// list of pages that should be passed on when returning to a page
	$exclusionList = ['auth.php', ];
	$excluded = false;
	foreach($exclusionList as $uri) {
		if (strpos($_SERVER['REQUEST_URI'], $uri)) {
			$excluded = true;
		}
	}

	// if this page is not excluded, update $_SESSION['pastPage'] and $_SESSION['currentPage']
	if(!$excluded) {
		// move current to past
		$_SESSION['pastPage'] = isset($_SESSION['currentPage']) ? $_SESSION['currentPage'] : 'index.php';
		// get name of current page
		$_SESSION['currentPage'] = $_SERVER['REQUEST_URI'];
	}


	// credentials
	$clientID = 'ba31691d69c84626a6e762d332060d7a';
	$clientSecret = 'b142422ce75343cda3df02807a41b9c1';
	// redirectURI has to be whitelisted on https://beta.developer.spotify.com/dashboard/applications/, URIs may have to have a slash at the end???
	$redirectURI = 'http://localhost/StreamJockey.git/auth.php?authReturn=spotify';

	// https://github.com/jwilsson/spotify-web-api-php/blob/master/docs/method-reference/Session.md
	$_SESSION['spotifyAuth'] = isset($_SESSION['spotifyAuth']) ? $_SESSION['spotifyAuth'] : new SpotifyWebAPI\Session($clientID, $clientSecret, $redirectURI);
	// https://github.com/jwilsson/spotify-web-api-php/blob/master/docs/method-reference/SpotifyWebAPI.md
	$_SESSION['spotifyAPI'] = isset($_SESSION['spotifyAPI']) ? $_SESSION['spotifyAPI'] : new SpotifyWebAPI\SpotifyWebAPI();

	// https://beta.developer.spotify.com/documentation/general/guides/scopes/
	// set scopes
	// 'streaming', 'user-read-birthdate', 'user-read-email', 'user-read-private' are required for the web playback sdk
	// 'user-modify-playback-state' is required to operate the playback

	// scope contains an array of all scopes sent with the auth request
	// show_dialog sets whether or not to force the user to approve the request each time
	// state gets returned back with the request, use with hashes to verfy that the response came from the expected source
	$_SESSION['spotifyScope'] = isset($_SESSION['spotifyScope']) ? $_SESSION['spotifyScope'] : [			
		// users
		'user-read-private',
		'user-read-email',
		'user-read-birthdate',
		
		// spotify connect
		'user-read-currently-playing',
		'user-modify-playback-state',
		'user-read-playback-state',

		// streaming
		'streaming',		
	];
?>