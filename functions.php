<?php
	// function getReturnHeader() {
	// 	return $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];
	// }

	
//  ██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗
//  ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
//  ██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗  
//  ██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝  
//  ██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗
//  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
//                                                                   

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
				"class" => "",
			);

			return $errorObject;
		}
	}

	function close(&$stmt, &$result, &$db) {
		if(isset($stmt)) { $stmt->close(); }
		if(isset($result) && $result != true && $result != false) { $result->free(); }
		if(isset($db)) { $db->close(); }
	}


//   █████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗
//  ██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝
//  ███████║██║     ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   
//  ██╔══██║██║     ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   
//  ██║  ██║╚██████╗╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   
//  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   
//                                                               

	// register validation
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
					"message" => "Password must be between " . $GLOBALS['passwordMinLength'] . " and " . $GLOBALS['stringMaxLength'] . " characters",
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
					SELECT userName
					FROM users
					WHERE userName = ?
				");
				$stmt->bind_param('s', $userName);
		
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
								"origin" => ".php register()",
								"target" => "",
								"class" => "",
								"content" => $userName,
							);
	
							close($stmt, $result, $db);
							return $successObject;
						} else {
							$errorObject = array(
								"objectType" => "error",
								"code" => "",
								"type" => "sql failure",
								"message" => "Failed to insert user",
								"origin" => ".php register()",
								"target" => "",
								"class" => "",
							);
			
							close($stmt, $result, $db);
							return $errorObject;
						}
					} else {
						$errorObject = array(
							"objectType" => "error",
							"code" => "403",
							"type" => "forbidden",
							"message" => "User already exists",
							"origin" => ".php register()",
							"target" => "registerUserName",
							"class" => "inputError",
						);
			
						close($stmt, $result, $db);
						return $errorObject;
					}
				} else {
					$errorObject = array(
						"objectType" => "error",
						"code" => "",
						"type" => "sql failure",
						"message" => $stmt->error,
						"origin" => ".php register()",
						"target" => "",
						"class" => "",
					);
	
					close($stmt, $result, $db);
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
		// trim on login because it is also trimmed on register
		$userName = trim($userName);

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

						$successObject = array(
							"objectType" => "success",
							"code" => "200",
							"type" => "finished",
							"message" => "User logged in",
							"origin" => ".php login()",
							"target" => "",
							"class" => "",
							"content" => $_SESSION['userId'],
						);

						close($stmt, $result, $db);
						return $successObject;
					} else {
						$errorObject = array(
							"objectType" => "error",
							"code" => "400",
							"type" => "invalid",
							"message" => "Password incorrect",
							"origin" => ".php login()",
							"target" => "loginPassword",
							"class" => "inputError",
						);
			
						close($stmt, $result, $db);
						return $errorObject;
					}
				} else {
					$errorObject = array(
						"objectType" => "error",
						"code" => "404",
						"type" => "not found",
						"message" => "User not found",
						"origin" => ".php login()",
						"target" => "loginUserName",
						"class" => "inputError",
					);
		
					close($stmt, $result, $db);
					return $errorObject;
				}
			} else {
				$errorObject = array(
					"objectType" => "error",
					"code" => "",
					"type" => "sql failure",
					"message" => $stmt->error,
					"origin" => ".php login()",
					"target" => "",
					"class" => "",
				);

				close($stmt, $result, $db);
				return $errorObject;			
			}
		} else {
			return $db;
		}
	}

	function logout() {
		session_regenerate_id();
		unset($_SESSION['userId']);

		$successObject = array(
			"objectType" => "success",
			"code" => "200",
			"type" => "finished",
			"message" => "User logged out",
			"origin" => ".php logout()",
			"target" => "",
			"class" => "",
			"content" => "",
		);

		return $successObject;
	}

	// get
	function getCurrentUser() {
		// check if user is logged in
		if (isset($_SESSION['userId'])) {
			$db = openDB();
			// check openDB success
			if (getType($db) === 'object') {
				// search for playlist
				$stmt = $db->prepare("
					SELECT *
					FROM users
					WHERE userId = ?
				");
				$stmt->bind_param('i', $_SESSION['userId']);
		
				// check query success
				if ($stmt->execute()) {
					// check that playlist exists
					$result = $stmt->get_result();
					if ($result->num_rows === 1) {
						while($row = $result->fetch_assoc()) {
							// !!! does not return password
							$userObject = array(
								"objectType" => "user",
								"id" => $row['userId'],
								"name" => $row['userName'],
								"email" => $row['email'],
							);
						}

						close($stmt, $result, $db);
						return $userObject;
					} else {
						$errorObject = array(
							"objectType" => "error",
							"code" => "403",
							"type" => "forbidden",
							"message" => "User does not exist",
							"origin" => ".php getCurrentUser()",
							"target" => "",
							"class" => "",
						);
			
						close($stmt, $result, $db);
						return $errorObject;
					}
				} else {
					$errorObject = array(
						"objectType" => "error",
						"code" => "",
						"type" => "sql failure",
						"message" =>  $stmt->error,
						"origin" => ".php getCurrentUser()",
						"target" => "",
						"class" => "",
					);

					close($stmt, $result, $db);
					return $errorObject;	
				}
			} else {
				return $db;
			}
		} else {
			$errorObject = array(
				"objectType" => "error",
				"code" => "403",
				"type" => "forbidden",
				"message" => "No user logged in",
				"origin" => ".php getCurrentUser()",
				"target" => "",
				"class" => "",
			);

			return $errorObject;
		}
	}

	function getUser($id) {
		// check if number
		if (is_numeric($id)) {
			$db = openDB();
			// check openDB success
			if (getType($db) === 'object') {
				// search for playlist
				$stmt = $db->prepare("
					SELECT *
					FROM users
					WHERE userId = ?
				");
				$stmt->bind_param('i', $id);
		
				// check query success
				if ($stmt->execute()) {
					// check that playlist exists
					$result = $stmt->get_result();
					if ($result->num_rows === 1) {
						while($row = $result->fetch_assoc()) {
							// !!! does not return password or email
							$userObject = array(
								"objectType" => "user",
								"id" => $row['userId'],
								"name" => $row['userName'],
							);
						}
	
						close($stmt, $result, $db);
						return $userObject;
					} else {
						$errorObject = array(
							"objectType" => "error",
							"code" => "403",
							"type" => "forbidden",
							"message" => "User does not exist",
							"origin" => ".php getUser()",
							"target" => "",
							"class" => "",
						);
			
						close($stmt, $result, $db);
						return $errorObject;
					}
				} else {
					$errorObject = array(
						"objectType" => "error",
						"code" => "",
						"type" => "sql failure",
						"message" =>  $stmt->error,
						"origin" => ".php getUser()",
						"target" => "",
						"class" => "",
					);
	
					close($stmt, $result, $db);
					return $errorObject;	
				}
			} else {
				return $db;
			}
		} else {
			$errorObject = array(
				"objectType" => "error",
				"code" => "400",
				"type" => "invalid",
				"message" =>  "User ID must be a number",
				"origin" => ".php getUser()",
				"target" => "",
				"class" => "",
			);

			return $errorObject;
		}	
	}


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝   
//                                                               

	// addPlaylist validation
	function validateTitle(&$title, &$errorObjectArray) {
		$title = trim($title);

		if (!empty($title)) {
			if($GLOBALS['nameMinLength'] <= strlen($title) && strlen($title) <= $GLOBALS['stringMaxLength']) {
				return true;
			} else {
				$errorObject = array(
					"objectType" => "error",
					"code" => "400",
					"type" => "invalid",
					"message" => "Title must be between " . $GLOBALS['nameMinLength'] . " and " . $GLOBALS['stringMaxLength'] . " characters" ,
					"origin" => ".php validateTitle()",
					"target" => "playlistTitle",
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
				"message" => "Title is empty",
				"origin" => ".php validateTitle()",
				"target" => "playlistTitle",
				"class" => "inputError",
			);

			array_push($errorObjectArray, $errorObject);
			return false;
		}
	}

	function validateVisibility(&$visibility, &$errorObjectArray) {
		if (!empty($visibility)) {
			if (in_array($visibility, $GLOBALS['visibilityStates'])) {
				return true;
			} else {
				$errorObject = array(
					"objectType" => "error",
					"code" => "400",
					"type" => "invalid",
					"message" => "Invalid visibility selected",
					"origin" => ".php validateVisibility()",
					"target" => "playlistVisibility",
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
				"message" => "Visibility is not selected",
				"origin" => ".php validateVisibility()",
				"target" => "playlistVisibility",
				"class" => "inputError",
			);

			array_push($errorObjectArray, $errorObject);
			return false;
		}
	}

	function validateDescription(&$description, &$errorObjectArray) {
		$description = trim($description);

		if(strlen($description) <= $GLOBALS['bigStringMaxLength']) {
			return true;
		} else {
			$errorObject = array(
				"objectType" => "error",
				"code" => "400",
				"type" => "invalid",
				"message" => "Description must be shorter than " . $GLOBALS['bigStringMaxLength'] . " characters",
				"origin" => ".php validateDescription()",
				"target" => "playlistDescription",
				"class" => "inputError",
			);

			array_push($errorObjectArray, $errorObject);
			return false;
		}

	}

	function validateColor(&$color, &$errorObjectArray) {
		$color = trim($color);

		if (!empty($color)) {
			#([a-f0-9]{3}){1,2}\b
			
			if(preg_match("/#([a-f0-9]{3}){1,2}\b/", $color) === 1) {
				return true;
			} else {
				$errorObject = array(
					"objectType" => "error",
					"code" => "400",
					"type" => "invalid",
					"message" => "Color must be in hex format: #xxxxxx",
					"origin" => ".php validateColor()",
					"target" => "playlistColor",
					"class" => "inputError",
				);

				array_push($errorObjectArray, $errorObject);
				return false;
			}
		} else {
			$color = $GLOBALS['defaultColor'];
			return true;
		}
	}

	function validateImage(&$image, &$errorObjectArray) {
		$image = trim($image);

		if(strlen($image) <= $GLOBALS['bigStringMaxLength']) {
			return true;
		} else {
			$errorObject = array(
				"objectType" => "error",
				"code" => "400",
				"type" => "invalid",
				"message" => "Image link must be shorter than " . $GLOBALS['bigStringMaxLength'] . " characters",
				"origin" => ".php validateImage()",
				"target" => "playlistImage",
				"class" => "inputError",
			);

			array_push($errorObjectArray, $errorObject);
			return false;
		}
	}
	
	// addPlaylist
	function addPlaylist($title, $visibility, $description, $color, $image) {
		// check if user is logged in
		if (isset($_SESSION['userId'])) {
			$errorObjectArray = [];

			validateTitle($title, $errorObjectArray);
			validateVisibility($visibility, $errorObjectArray);
			validateDescription($description, $errorObjectArray);
			validateColor($color, $errorObjectArray);
			validateImage($image, $errorObjectArray);

			if (empty($errorObjectArray)) {
				$db = openDB();
				// check openDB success
				if (getType($db) === 'object') {
					// prep query
					$stmt = $db->prepare("
						SELECT userId, title
						FROM playlists
						WHERE userId = ? AND title = ?
					");
					$stmt->bind_param('is', $_SESSION['userId'], $title);
			
					// check query success
					if ($stmt->execute()) {
						$result = $stmt->get_result();
						
						// check for existing playlist
						if ($result->num_rows == 0) {
							// prep insert
							$stmt = $db->prepare("
							INSERT INTO playlists (userId, title, visibility, description, color, image)
							VALUES (?, ?, ?, ?, ?, ?)
							");
							$stmt->bind_param('isssss', $_SESSION['userId'], $title, $visibility, $description, $color, $image);

							if ($stmt->execute()) {
								$successObject = array(
									"objectType" => "success",
									"code" => "200",
									"type" => "finished",
									"message" => "Playlist added",
									"origin" => ".php addPlaylist()",
									"target" => "",
									"class" => "",
									"content" => $title,
								);

								close($stmt, $result, $db);
								return $successObject;
							} else {
								$errorObject = array(
									"objectType" => "error",
									"code" => "",
									"type" => "sql failure",
									"message" => $stmt->error,
									"origin" => ".php addPlaylist()",
									"target" => "",
									"class" => "",
								);

								close($stmt, $result, $db);
								return $errorObject;
							}
						} else {
							$errorObject = array(
								"objectType" => "error",
								"code" => "403",
								"type" => "forbidden",
								"message" => "Playlist already exists",
								"origin" => ".php addPlaylist()",
								"target" => "playlistTitle",
								"class" => "inputError",
							);
				
							close($stmt, $result, $db);
							return $errorObject;
						}
					} else {
						$errorObject = array(
							"objectType" => "error",
							"code" => "",
							"type" => "sql failure",
							"message" =>  $stmt->error,
							"origin" => ".php addPlaylist()",
							"target" => "",
							"class" => "",
						);
		
						close($stmt, $result, $db);
						return $errorObject;	
					}
				} else {
					return $db;
				}
			} else {
				return $errorObjectArray;
			}
		} else {
			$errorObject = array(
				"objectType" => "error",
				"code" => "403",
				"type" => "forbidden",
				"message" => "No user logged in",
				"origin" => "addPlaylist()",
				"target" => "",
				"class" => "",
			);

			return $errorObject;
		}
	}

	function deletePlaylist($id) {
		// check if user is logged in
		if (isset($_SESSION['userId'])) {
			$db = openDB();
			// check openDB success
			if (getType($db) === 'object') {
				// search for playlist
				$stmt = $db->prepare("
					SELECT playlistId
					FROM playlists
					WHERE playlistId = ? AND userId = ?
				");
				$stmt->bind_param('ii', $id, $_SESSION['userId']);
		
				// check query success
				if ($stmt->execute()) {
					$result = $stmt->get_result();
						
					// check that playlist exists
					if ($result->num_rows === 1) {
						// delete playlist
						$stmt = $db->prepare("
							DELETE FROM playlists
							WHERE playlistId = ? AND userId = ?
						");
						$stmt->bind_param('ii', $id, $_SESSION['userId']);
				
						// check query success
						if ($stmt->execute()) {
							$successObject = array(
								"objectType" => "success",
								"code" => "200",
								"type" => "finished",
								"message" => "Playlist deleted",
								"origin" => ".php deletedPlaylist()",
								"target" => "",
								"class" => "",
								"content" => "",
							);

							close($stmt, $result, $db);
							return $successObject;
						} else {
							$errorObject = array(
								"objectType" => "error",
								"code" => "",
								"type" => "sql failure",
								"message" =>  $stmt->error,
								"origin" => ".php deletePlaylist()",
								"target" => "",
								"class" => "",
							);
			
							close($stmt, $result, $db);
							return $errorObject;	
						}
					} else {
						$errorObject = array(
							"objectType" => "error",
							"code" => "403",
							"type" => "forbidden",
							"message" => "Playlist does not exist",
							"origin" => ".php deletePlaylist()",
							"target" => "",
							"class" => "",
						);
			
						close($stmt, $result, $db);
						return $errorObject;
					}
				} else {
					$errorObject = array(
						"objectType" => "error",
						"code" => "",
						"type" => "sql failure",
						"message" =>  $stmt->error,
						"origin" => ".php addPlaylist()",
						"target" => "",
						"class" => "",
					);

					close($stmt, $result, $db);
					return $errorObject;	
				}
			} else {
				return $db;
			}
		} else {
			$errorObject = array(
				"objectType" => "error",
				"code" => "403",
				"type" => "forbidden",
				"message" => "No user logged in",
				"origin" => ".php deletePlaylist()",
				"target" => "",
				"class" => "",
			);

			return $errorObject;
		}
	}

	function getPlaylist($id) {
		// check valid id
		if (is_numeric($id)) {
			$db = openDB();
			// check openDB success
			if (getType($db) === 'object') {
				// search for playlist
				$stmt = $db->prepare("
					SELECT *
					FROM playlists
					WHERE playlistId = ?
				");
				$stmt->bind_param('i', $id);
		
				// check query success
				if ($stmt->execute()) {
					// check if exists
					$result = $stmt->get_result();
					if ($result->num_rows === 1) {
						// fetch data
						while($row = $result->fetch_assoc()) {
							$playlistObject = array(
								"objectType" => "playlist",
								"id" => $row['playlistId'],
								"userId" => $row['userId'],
								"title" => $row['title'],
								"visibility" => $row['visibility'],
								"description" => $row['description'],
								"color" => $row['color'],
								"image" => $row['image'],
								"tracks" => [],
							);
						}

						// check valid permissions, public, linkOnly, or private and same user
						if ($playlistObject['visibility'] === 'public' || $playlistObject['visibility'] === 'linkOnly' || ($playlistObject['visibility'] === 'private' && $playlistObject['userId'] === $_SESSION['userId'])) {
							// retrieve tracks
							$stmt = $db->prepare("
								SELECT *
								FROM tracks
								WHERE playlistId = ?
							");
							$stmt->bind_param('i', $id);
					
							// check query success
							if ($stmt->execute()) {
								$result = $stmt->get_result();

								// fetch data
								$trackList = [];
								while($row = $result->fetch_assoc()) {
									array_push($trackList, [
										"objectType" => "track",

										"playlistId" => $row['playlistId'],
										"position" => $row['position'],
										"source" => $row['source'],
										"id" => $row['trackId'],
										"title" => $row['title'],
										"artists" => explode('|||', $row['artists']),
										"duration" => $row['duration'],
									]);
								}

								$playlistObject['tracks'] = $trackList;

								close($stmt, $result, $db);
								return $playlistObject;
							} else {
								$errorObject = array(
									"objectType" => "error",
									"code" => "",
									"type" => "sql failure",
									"message" =>  $stmt->error,
									"origin" => ".php getPlaylist()",
									"target" => "",
									"class" => "",
								);
				
								close($stmt, $result, $db);
								return $errorObject;	
							}
						} else {
							$errorObject = array(
								"objectType" => "error",
								"code" => "403",
								"type" => "forbidden",
								"message" => "You don not permission to view this playlist",
								"origin" => ".php getPlaylist()",
								"target" => "",
								"class" => "",
							);
				
							close($stmt, $result, $db);
							return $errorObject;
						}
					} else {
						$errorObject = array(
							"objectType" => "error",
							"code" => "403",
							"type" => "forbidden",
							"message" => "Playlist does not exist",
							"origin" => ".php getPlaylist()",
							"target" => "",
							"class" => "",
						);
			
						close($stmt, $result, $db);
						return $errorObject;
					}
				} else {
					$errorObject = array(
						"objectType" => "error",
						"code" => "",
						"type" => "sql failure",
						"message" =>  $stmt->error,
						"origin" => ".php getPlaylist()",
						"target" => "",
						"class" => "",
					);
	
					close($stmt, $result, $db);
					return $errorObject;	
				}
			} else {
				return $db;
			}
		} else {
			$errorObject = array(
				"objectType" => "error",
				"code" => "400",
				"type" => "invalid",
				"message" =>  "Playlist ID must be a number",
				"origin" => ".php getPlaylist()",
				"target" => "",
				"class" => "",
			);

			return $errorObject;
		}	
	}

	function addTrack($playlistId, $source, $id, $title, $artists, $duration) {
		// TODO add validation for track details
		
		// get playlist (or error)
		$playlistObject = getPlaylist($playlistId);
		if ($playlistObject['objectType'] === 'playlist') {
			$db = openDB();
			// check openDB success
			if (getType($db) === 'object') {
				// set position
				$count = 0;;
				forEach($playlistObject['tracks'] as $track) {
					$count++;
				}
				$position = $count + 1;

				// implode array, tripple pipe delimiter
				// TODO 
				$artists = implode('|||', $artists);

				// prep insert
				$stmt = $db->prepare("
				INSERT INTO tracks (playlistId, position, source, trackId, title, artists, duration)
				VALUES (?, ?, ?, ?, ?, ?, ?)
				");
				$stmt->bind_param('iissssi', $playlistId, $position, $source, $id, $title, $artists, $duration);

				if ($stmt->execute()) {
					$successObject = array(
						"objectType" => "success",
						"code" => "200",
						"type" => "finished",
						"message" => "Track added",
						"origin" => ".php addTrack()",
						"target" => "",
						"class" => "",
						"content" => "",
					);

					close($stmt, $result, $db);
					return $successObject;
				} else {
					$errorObject = array(
						"objectType" => "error",
						"code" => "",
						"type" => "sql failure",
						"message" => $stmt->error,
						"origin" => ".php addTrack()",
						"target" => "",
						"class" => "",
					);

					close($stmt, $result, $db);	
					return $errorObject;
				}
			} else {
				return $db;
			}
		} else {
			return $playlistObject;
		}
	}

	// function addTrack($id, , , , ) {

	// }

	// function deleteTrack($id)
?>