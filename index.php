<?php 
	// Composer created files containing dependencies (spotify api php wrapper)
	require_once('vendor/autoload.php');

	// creates a session
	$session = new SpotifyWebAPI\Session(
		'ba31691d69c84626a6e762d332060d7a',
		'b142422ce75343cda3df02807a41b9c1',
		'streamlist-protocol://callback'
	);

	// gets accessToken
	$session->requestCredentialsToken();
	$accessToken = $session->getAccessToken();

	// gives accessToken to $api
	$api = new SpotifyWebAPI\SpotifyWebAPI();
	$api->setAccessToken($accessToken);

	// --> do stuff now

	// It's now possible to request data from the Spotify catalog
	print_r($api->getTrack('7EjyzZcbLxW7PaaLua9Ksb')->name);

	// $api = new SpotifyWebAPI\SpotifyWebAPI();

	// if (isset($_GET['code'])) {
	// 	$session->requestAccessToken($_GET['code']);
	// 	$api->setAccessToken($session->getAccessToken());

	// 	print_r($api->me());
	// } else {
	// $options = ['scope' => ['user-read-email',],];

	// header('Location: ' . $session->getAuthorizeUrl($options));
	// die();
	// }
?>

<!-- <!doctype html>

<html lang='en'>
	<head>
		<meta charset='utf-8'>
		<title>StreamJockey</title>
		<link rel='stylesheet' href='norm.css'>
		<link rel='stylesheet' href='main.css'>
	</head>

	<body>
		<?php 
			echo '<p>Hello World!</p>';



		?>
		<p>Hello World!</p>
	</body>

	<script src='main.js'></script>
</html> -->