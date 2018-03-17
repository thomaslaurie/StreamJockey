<?php
	// Composer created files containing dependencies (spotify api php wrapper)
	require_once('vendor/autoload.php');

	// // Credentials
	// $clientID = 'ba31691d69c84626a6e762d332060d7a';
	// $clientSecret = 'b142422ce75343cda3df02807a41b9c1';
	// $redirectURI = 'http://localhost/StreamJockey.git/index.php?authCallback=spotify';

	// // creates auth session object
	// $session = new SpotifyWebAPI\Session($clientID, $clientSecret, $redirectURI);

	// if (isset($_GET['authCallback']) && $_GET['authCallback'] === 'spotify') {
	// 	$code = $_GET['code'];
	// } else {
	// 	// set scopes
	// 	// 'streaming', 'user-read-birthdate', 'user-read-email', 'user-read-private' are required for the web playback sdk
	// 	// 'user-modify-playback-state' is required to operate the playback

	// 	// scope contains an array of all scopes sent with the auth request
	// 	// show_dialog sets whether or not to force the user to approve the request each time
	// 	// state gets returned back with the request, use with hashes to verfy that the response came from the expected source

	// 	$options = [
	// 		'scope' => [
	// 			'streaming',
	// 			'user-read-birthdate',
	// 			'user-read-email',
	// 			'user-read-private',
	// 			'user-modify-playback-state',
	// 		],
	// 		'show_dialog' => true,
	// 		'state' => 'someString'
	// 	];

	// 	header('Location: '.$session->getAuthorizeUrl($options));
	// 	exit();

	// 	// returns with 'code' and 'state' parameters on success, returns with 'error', and 'state' parameters on failure, 'access_denied' signifies that the user has denied the request
	// }

	// // access token

	// // Credential Flow: $session->requestCredentialsToken(); gets an access token using the credietials flow 'cannot use endpoints that use user data (including streaming)'
	// // true if success, false otherwise
	// // $session->requestCredentialsToken();
	// // $accessToken = $session->getAccessToken();

	// // Auth Flow
	// // $session->requestAccessToken(); using the authorization flow, use this for scopes
	// // true if success, false otherwise
	// $session->requestAccessToken($code);
	// $accessToken = $session->getAccessToken();

	// // check current scopes
	// // $scopes = $session->getScope();

	// // refresh
	// // true if success, false otherwise
	// // $session->refreshAccessToken($refreshToken);

	// // get token expiration time
	// // unix timestamp indicating token expiration time
	// // $session->getTokenExpiration()
	


	// // creates api object
	// $api = new SpotifyWebAPI\SpotifyWebAPI();

	// // gives accessToken to $api
	// $api->setAccessToken($accessToken);



	// page
	require_once('header.php');

	// --> do stuff now
	// It's now possible to request data from the Spotify catalog

	// $testTrack = '4bEcoz1OcfMgUbp2ft8ieQ';

	// echo $api->getTrack($testTrack)->name;
	// echo '<br>';
	// $artistsTest = $api->getTrack($testTrack)->artists;
	// foreach($artistsTest as $artist) {
	// 	echo $artist->name;
	// }

?>
	<input id='uri' type='text' placeholder='spotify uri'>
	<button id='start'>Start</button>
	<button id='play'>Play</button>
	<button id='pause'>Pause</button>
<?php
	require_once('footer.php');
?>


