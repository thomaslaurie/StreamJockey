<?php
	// function getReturnHeader() {
	// 	return $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];
	// }

	function openDB() {
		// path
		include('connect.php');

		// create new database object, @ suppresses errors
		@$db = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

		if(!mysqli_connect_errno()) {
			return $db;
		} else {
			// TODO error handling
			echo 'Database Connection Error: '.mysqli_connect_errno();
			exit();
		}
	}

	function close(&$stmt, &$result, &$db) {
		if(isset($stmt)) { $stmt->close(); }
		if(isset($result) && $result != true && $result != false) { $result->free(); }
		if(isset($db)) { $db->close(); }
	}

	// validation
	function validateName(&$errors, &$input, $title) {
		$errors[$title] = [];

		$input = trim($input);

		if (empty($input)) {
			array_push($errors[$title], 'cannot be empty');
		} else if (!($GLOBALS['nameMinLength'] <= strlen($input) && strlen($input) <= $GLOBALS['stringMaxLength'])) {
			array_push($errors[$title], 'must be '.$GLOBALS['nameMinLength'].' to '.$GLOBALS['stringMaxLength'].' characters');
		}
	}

	function validateEmail(&$errors, &$input, $title) {
		$errors[$title] = [];

		$input = trim($input);

		if (empty($input)) {
			array_push($errors[$title], 'cannot be empty');
		} else {
			if (!(strlen($input) <= $GLOBALS['stringMaxLength'])) {
				array_push($errors[$title], 'must be under '.$GLOBALS['stringMaxLength'].' characters');
			}
			if (!filter_var($input, FILTER_VALIDATE_EMAIL)) {
				array_push($errors[$title], 'invalid e-mail');
			}
		}
	}

	function validatePassword(&$errors, &$input1, &$input2, $title) {
		$errors[$title] = [];

		if (empty($input1) || empty($input2)) {
			array_push($errors[$title], 'cannot be empty');
		} else {
			if (!($GLOBALS['passwordMinLength'] <= strlen($input1) && strlen($input1) <= $GLOBALS['stringMaxLength']) || !($GLOBALS['passwordMinLength'] <= strlen($input2) && strlen($input2) <= $GLOBALS['stringMaxLength'])) {
				array_push($errors[$title], 'must be '.$GLOBALS['passwordMinLength'].' to '.$GLOBALS['stringMaxLength'].' characters');
			}
			if (!($input1 === $input2)) {
				array_push($errors[$title], 'passwords do not match');
			}
		}
	}



	function login($userName, $password) {
		$db = openDB();

		$stmt = $db->prepare("
			SELECT userID, userName, password
			FROM users
			WHERE userName = ?;
		");
		$stmt->bind_param('s', $userName);

		if ($stmt->execute()) {
			$result = $stmt->get_result();

			if ($result->num_rows == 1) {
				$row = $result->fetch_assoc();
				$DBpassword = $row['password'];

				if(password_verify($password, $DBpassword)) {
					// login user
					session_regenerate_id();
					$_SESSION['userID'] = $row['userID'];

					close($stmt, $result, $db);

					// if (isset($_SESSION['callback'])) {
					// 	header('Location: '.$_SESSION['callback']);
					// } else {
					// 	header('Location: showmodels.php');
					// }
	
					return 'success';
				} else {
					close($stmt, $result, $db);
					return 'incorrect password';
				}
			} else {
				close($stmt, $result, $db);
				return 'user not found';
			}
		} else {
			close($stmt, $result, $db);
			return 'query error';
		}
	}
?>