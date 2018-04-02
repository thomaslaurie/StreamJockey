<?php
	require_once('top.php');

	// process request
	$dataEntries = [
		'request',
	];

	forEach($dataEntries as $entry) {
		$$entry = isset($_POST[$entry]) ? $_POST[$entry] : null;
	}

	// return data
	if ($request) {
		echo 'request was made';
	} else {
		echo 'no request made';
		exit;
	}
?>