<?php
	require_once('top.php');
	// TODO validate GET variables

	function goBack() {
		header('Location: ' . $_SESSION['pastPage']);
		exit;
	}

	// send to auth location
	if (isset($_GET['source'])) {
		// service cases

		if ($_GET['source'] == 'spotify') {
			// https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/
			$options = [
				'scope' => $_SESSION['spotifyScope'],
				'show_dialog' => true, 
				// If you generate a random string, or encode the hash of some client state, such as a cookie, in this state variable, you can validate the response to additionally ensure that both the request and response originated in the same browser.
				//'state' => $return
			];

			header('Location: '.$_SESSION['spotifyAuth']->getAuthorizeUrl($options));
			exit();
		}

		if ($_GET['source'] == 'youtube') {
		}
	}

	// return from auth location
	if (isset($_GET['authReturn'])) {
		// service cases

		if ($_GET['authReturn'] == 'spotify') {
			// returns with 'code' and 'state' parameters on success, returns with 'error', and 'state' parameters on failure, 'access_denied' signifies that the user has denied the request

			$code = $_GET['code'];
			// access token

			// Credential Flow: $_SESSION['spotifyAuth']->requestCredentialsToken(); gets an access token using the credietials flow 'cannot use endpoints that use user data (including streaming)'
			// true if success, false otherwise
			// $_SESSION['spotifyAuth']->requestCredentialsToken();
			// $accessToken = $_SESSION['spotifyAuth']->getAccessToken();

			// Auth Flow
			// $_SESSION['spotifyAuth']->requestAccessToken(); using the authorization flow, use this for scopes
			// true if success, false otherwise

			$_SESSION['spotifyAuth']->requestAccessToken($code);
			$_SESSION['spotifyAccessToken'] = $_SESSION['spotifyAuth']->getAccessToken();

			// check current scopes
			// $scopes = $_SESSION['spotifyAuth']->getScope();

			// refresh
			// true if success, false otherwise
			// $_SESSION['spotifyAuth']->refreshAccessToken($refreshToken);

			// get token expiration time
			// unix timestamp indicating token expiration time
			// $_SESSION['spotifyAuth']->getTokenExpiration()

			// gives accessToken to $_SESSION['spotifyAPI']
			$_SESSION['spotifyAPI']->setAccessToken($_SESSION['spotifyAccessToken']);
			//goBack();
		}
		
		if ($_GET['authReturn'] == 'youtube') {
		}

		// once finished processing go back
		goBack();
	}

	// if no authReturn or source, go back
	goBack();
?>