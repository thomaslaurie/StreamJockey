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
		'position',
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
	if ($request === 'test') {
		$result = test();
		echo json_encode($result);
	} else if ($request === 'register') {
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
	} else if ($request === 'deleteTrack') {
		$result = deleteTrack($playlistId, $position);
		// TODO handle this
		orderPlaylist($playlistId);
		echo json_encode($result);
	} else if ($request === 'orderPlaylist') {
		$result = orderPlaylist($id);
		echo json_encode($result);
	} else if ($request === null) {
		$result = new SjError(new class {
			function __construct() {
				$this->origin = 'request.php';
				$this->message = 'no request made';
				$this->target = 'notify';
				$this->class = 'notifySuccess';
			}
		});

		echo json_encode($result);
	} else {
		$result = new SjSuccess(new class {
			function __construct() {
				$this->origin = 'request.php';
				$this->message = 'request not supported';
				$this->target = 'notify';
				$this->class = 'notifySuccess';
			}
		});

		echo json_encode($result);
	}

	// finally
	exit;
?>