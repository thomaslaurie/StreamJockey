<?php
	require_once('top.php');

	// list of accepted data values
	$dataEntries = [
		'request',

		// multiple
		'id',

		// account
		'name',
		'password',
		'password1',
		'password2',
		'email',

		// playlist
		'title',
		'visibility',
		'description',
		'color',
		'image',

		// track
		'playlistId',
		'source',
		'title',
		'artists',
		'duration',

	];

	// process data
	forEach($dataEntries as $entry) {
		$$entry = isset($_POST[$entry]) ? $_POST[$entry] : null;
	}

	// handle request types
	if ($request === 'register') {
		$result = register($email, $name, $password1, $password2);
		// !!! errorObject array if validation error
		echo json_encode($result);
	} else if ($request === 'login') {
		$result = login($name, $password);
		echo json_encode($result);
	} else if ($request === 'logout') {
		$result = logout();
		echo json_encode($result);
	} else if ($request === 'addPlaylist') {
		$result = addPlaylist($title, $visibility, $description, $color, $image);
		echo json_encode($result);
	} else if ($request === 'deletePlaylist') {
		$result = deletePlaylist($id);
		echo json_encode($result);
	} else if ($request === 'getCurrentUser') {
		$result = getCurrentUser();
		echo json_encode($result);
	} else if ($request === 'getUser') {
		$result = getUser($id);
		echo json_encode($result);
	} else if ($request === 'getPlaylist') {
		$result = getPlaylist($id);
		echo json_encode($result);
	} else if ($request === 'addTrack') {
		$result = addTrack($playlistId, $source, $id, $title, $artists, $duration);
		echo json_encode($result);
	} else if ($request === null) {
		$errorObject = array(
			"objectType" => "error",
			"code" => "400",
			"type" => "no content",
			"message" => "No request was made",
			"origin" => "request.php",
			"target" => "",
		);

		echo json_encode($errorObject);
	} else {
		$errorObject = array(
			"objectType" => "error",
			"code" => "405",
			"type" => "invalid",
			"message" => "Request not supported",
			"origin" => "request.php",
			"target" => "",
		);

		echo json_encode($errorObject);
	}

	// finally
	exit;
?>