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
			close($stmt, $result, $db);

			$errorObject = array(
				"objectType" => "error",
				"code" => mysqli_connect_errno(),
				"type" => "connection failure",
				"message" => "Failed to connect to database",
				"origin" => ".php openDB()",
				"target" => "",
			);

			return $errorObject;
		}
	}

	function close(&$stmt, &$result, &$db) {
		if(isset($stmt)) { $stmt->close(); }
		if(isset($result) && $result != true && $result != false) { $result->free(); }
		if(isset($db)) { $db->close(); }
	}



	// validation
	function validateEmail(&$email, &$errorObjectArray) {
		$email = trim($email);

		if (!empty($email)) {
			if(strlen($email) <= $GLOBALS['stringMaxLength']) {
				if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
					return true;
				} else {
					$errorObject = array(
						"objectType" => "error",
						"code" => "400",
						"type" => "invalid",
						"message" => "E-mail format is invalid",
						"origin" => ".php validateEmail()",
						"target" => "registerEmail",
						"class" => "inputError",
					);
	
					array_push($errorObjectArray, $errorObject);
					return false;
				}
			} else {
				$errorObject = array(
					"objectType" => "error",
					"code" => "400",
					"type" => "invalid",
					"message" => "E-mail must be shorter than " . $GLOBALS['stringMaxLength'] . " characters",
					"origin" => ".php validateEmail()",
					"target" => "registerEmail",
					"class" => "inputError",
				);

				array_push($errorObjectArray, $errorObject);
				return false;
			}
		} else {
			$errorObject = array(
				"objectType" => "error",
				"code" => "400",
				"type" => "invalid",
				"message" => "E-mail is empty",
				"origin" => ".php validateEmail()",
				"target" => "registerEmail",
				"class" => "inputError",
			);

			array_push($errorObjectArray, $errorObject);
			return false;
		}
	}

	function validateUserName(&$userName, &$errorObjectArray) {
		$userName = trim($userName);

		if(!empty($userName)) {
			if ($GLOBALS['nameMinLength'] <= strlen($userName) && strlen($userName) <= $GLOBALS['stringMaxLength']) {
				return true;
			} else {
				$errorObject = array(
					"objectType" => "error",
					"code" => "400",
					"type" => "invalid",
					"message" => "Username must be between " . $GLOBALS['nameMinLength'] . " and " . $GLOBALS['stringMaxLength'] . " characters" ,
					"origin" => ".php validateUserName()",
					"target" => "registerUserName",
					"class" => "inputError",
				);
	
				array_push($errorObjectArray, $errorObject);
				return false;
			}
		} else {
			$errorObject = array(
				"objectType" => "error",
				"code" => "400",
				"type" => "invalid",
				"message" => "Username is empty",
				"origin" => ".php validateUserName()",
				"target" => "registerUserName",
				"class" => "inputError",
			);

			array_push($errorObjectArray, $errorObject);
			return false;
		}
	}

	function validatePassword(&$password1, &$password2, &$errorObjectArray) {
		if (!empty($password1)) {
			if ($GLOBALS['passwordMinLength'] <= strlen($password1) && strlen($password1) <= $GLOBALS['stringMaxLength']) {
				if ($password1 === $password2) {
					return true;
				} else {
					$errorObject = array(
						"objectType" => "error",
						"code" => "400",
						"type" => "invalid",
						"message" => "Passwords do not match" ,
						"origin" => ".php validatePassword()",
						"target" => "registerPassword2",
						"class" => "inputError",
					);
		
					array_push($errorObjectArray, $errorObject);
					return false;
				}
			} else {
				$errorObject = array(
					"objectType" => "error",
					"code" => "400",
					"type" => "invalid",
					"message" => "Password must be between " . $GLOBALS['passwordMinLength'] . " and " . $GLOBALS['stringMaxLength'] . " characters" ,
					"origin" => ".php validatePassword()",
					"target" => "registerPassword1",
					"class" => "inputError",
				);
	
				array_push($errorObjectArray, $errorObject);
				return false;
			}
		} else {
			$errorObject = array(
				"objectType" => "error",
				"code" => "400",
				"type" => "invalid",
				"message" => "Password is empty",
				"origin" => ".php validatePassword()",
				"target" => "registerPassword1",
				"class" => "inputError",
			);

			array_push($errorObjectArray, $errorObject);
			return false;
		}
	}

	// !!! returns errorObject array on validation error
	function register($email, $userName, $password1, $password2) {
		$errorObjectArray = [];

		validateEmail($email, $errorObjectArray);
		validateUserName($userName, $errorObjectArray);
		validatePassword($password1, $password2, $errorObjectArray);

		if (empty($errorObjectArray)) {
			$db = openDB();
			// check openDB success
			if (getType($db) === 'object') {
				// prep query
				$stmt = $db->prepare("
					SELECT email
					FROM users
					WHERE email = ?
				");
				$stmt->bind_param('s', $email);
		
				// check query success
				if ($stmt->execute()) {
					$result = $stmt->get_result();
					
					// check for existing user
					if ($result->num_rows == 0) {
						// add user
						$passwordHash = password_hash($password1, PASSWORD_DEFAULT);
		
						// prep insert
						$stmt = $db->prepare("
							INSERT INTO users (userName, password, email)
							VALUES (?, ?, ?)
						");
						$stmt->bind_param('sss', $userName, $passwordHash, $email);
		
						if ($stmt->execute()) {
							$successObject = array(
								"objectType" => "success",
								"code" => "200",
								"type" => "finished",
								"message" => "User registered",
								"origin" => ".php login()",
								"target" => "",
							);
	
							return $successObject;
						} else {
							close($stmt, $result, $db);

							$errorObject = array(
								"objectType" => "error",
								"code" => "",
								"type" => "sql failure",
								"message" => "Failed to insert user",
								"origin" => ".php register()",
								"target" => "",
								"class" => "",
							);
			
							return $errorObject;
						}
					} else {
						close($stmt, $result, $db);

						$errorObject = array(
							"objectType" => "error",
							"code" => "403",
							"type" => "forbidden",
							"message" => "User already exists",
							"origin" => ".php register()",
							"target" => "",
							"class" => "",
						);
			
						return $errorObject;
					}
				} else {
					close($stmt, $result, $db);

					$errorObject = array(
						"objectType" => "error",
						"code" => "",
						"type" => "sql failure",
						"message" => "Failed to query user list",
						"origin" => ".php register()",
						"target" => "",
						"class" => "",
					);
	
					return $errorObject;	
				}
			} else {
				return $db;
			}
		} else {
			return $errorObjectArray;
		} 		
	}

	// login
	function login($userName, $password) {
		$db = openDB();
		// check openDB success
		if (getType($db) === 'object') {
			// prep query
			$stmt = $db->prepare("
				SELECT userId, userName, password
				FROM users
				WHERE userName = ?;
			");
			$stmt->bind_param('s', $userName);

			// check query success
			if ($stmt->execute()) {
				$result = $stmt->get_result();

				// check if found
				if ($result->num_rows == 1) {
					$row = $result->fetch_assoc();
					$DBpassword = $row['password'];

					// check password
					if(password_verify($password, $DBpassword)) {
						// login user
						session_regenerate_id();
						$_SESSION['userId'] = $row['userId'];

						close($stmt, $result, $db);

						$successObject = array(
							"objectType" => "success",
							"code" => "200",
							"type" => "finished",
							"message" => "User logged in",
							"origin" => ".php login()",
							"target" => "",
						);

						return $successObject;
					} else {
						close($stmt, $result, $db);

						$errorObject = array(
							"objectType" => "error",
							"code" => "400",
							"type" => "invalid",
							"message" => "Password incorrect",
							"origin" => ".php login()",
							"target" => "loginPassword",
						);
			
						return $errorObject;
					}
				} else {
					close($stmt, $result, $db);

					$errorObject = array(
						"objectType" => "error",
						"code" => "404",
						"type" => "not found",
						"message" => "User not found",
						"origin" => ".php login()",
						"target" => "loginUserName",
					);
		
					return $errorObject;
				}
			} else {
				close($stmt, $result, $db);

				$errorObject = array(
					"objectType" => "error",
					"code" => "",
					"type" => "sql failure",
					"message" => "Failed to query user list",
					"origin" => ".php login()",
					"target" => "",
				);

				return $errorObject;			
			}
		} else {
			return $db;
		}
	}
?>