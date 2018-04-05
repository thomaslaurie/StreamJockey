<?php
	require_once('top.php');

	// list of accepted data values
	$dataEntries = [
		'request',

		// login
		'userName',
		'password',

		// register
		'email',
		'password1',
		'password2',

		// addPlaylist
		'title',
		'visibility',
		'description',
		'color',
		'image',

		// delete playlist
		'id',
	];

	// process data
	forEach($dataEntries as $entry) {
		$$entry = isset($_POST[$entry]) ? $_POST[$entry] : null;
	}

	// handle request types
	if ($request === 'register') {
		$result = register($email, $userName, $password1, $password2);
		// !!! errorObject array if validation error
		echo json_encode($result);
	} else if ($request === 'login') {
		$result = login($userName, $password);
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