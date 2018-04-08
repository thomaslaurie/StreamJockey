<?php
	// function getReturnHeader() {
	// 	return $_SERVER['DOCUMENT_ROOT'] . $_SERVER['PHP_SELF'];
	// }

	// anonymous classes:
	// ... (new class() {
	// 	public $var = 'something';
	// });

	// TODO add back in error codes
	// TODO add back in sql error reasons via $stmt->error

	function test() {
		$result = new SjError(new class {
			function __construct() {
				$this->message = "E-mail must be shorter thancharacters";
				$this->origin = 'validateEmail()';
				$this->target = 'registerEmail';
				$this->class = 'inputError';
			}
		});

		return $result;
	}

	// classes
	class SjObject {
		function __construct($obj) {
			$this->objectType = 'SjObject';

			// what
			$this->code = !isset($obj->code) ? '' : $obj->code;
			$this->type = !isset($obj->type) ? '' : $obj->type;
			$this->origin = !isset($obj->origin) ? '' : $obj->origin;

			// return
			$this->message = !isset($obj->message) ? '' : $obj->message;
			// if no reason is given, reason is the same as the message
			$this->reason = !isset($obj->reason) ? $this->message : $obj->reason;
			$this->content = !isset($obj->content) ? '' : $obj->content;

			// element
			$this->target = !isset($obj->target) ? '' : $obj->target;
			$this->class = !isset($obj->class) ? '' : $obj->class;

			//$ = !isset($obj->) ? '' : $obj->;
			// all child object should call function __construct() { parent::__construct($obj); } to call the parent constructor
		}
	}

	class SjSuccess extends SjObject {
		function __construct($obj) {
			// super
			parent::__construct($obj);

			// overwritten properties
			$this->objectType = 'SjSuccess';

			// what
			$this->code = !isset($obj->code) ? '200' : $obj->code;
			$this->type = !isset($obj->type) ? 'Ok' : $obj->type;

		}
	}

	class SjError extends SjObject {
		function __construct($obj) {
			// super
			parent::__construct($obj);

			// overwritten properties
			$this->objectType = 'SjError';

			// what
			$this->code = !isset($obj->code) ? '400' : $obj->code;
			$this->type = !isset($obj->type) ? 'Invalid' : $obj->type;

		}
	}

	class SjErrorList extends SjObject {
		function __construct($obj) {
			// super
			parent::__construct($obj);

			// overwritten properties
			$this->objectType = 'SjErrorList';

			// what
			$this->code = !isset($obj->code) ? '400' : $obj->code;
			$this->type = !isset($obj->type) ? 'Invalid' : $obj->type;

			// return
			$this->reason = !isset($obj->reason) ? 'One or more errors from multiple calls' : $obj->reason;
			$this->content = !isset($obj->content) ? [] : $obj->content;

		}
	}

	class SjTrack extends SjObject {
		function __construct($obj) {
			// super
			parent::__construct($obj);

			// overwritten properties
			$this->objectType = 'SjTrack';

			// what
			$this->code = !isset($obj->code) ? '200' : $obj->code;
			$this->type = !isset($obj->type) ? 'Ok' : $obj->type;

			// new properties
			$this->source = !isset($obj->source) ? '' : $obj->source;
			$this->id = !isset($obj->id) ? '' : $obj->id;
			$this->artists = !isset($obj->artists) ? [] : $obj->artists;
			$this->title = !isset($obj->title) ? '' : $obj->title;
			$this->duration = !isset($obj->duration) ? '' : $obj->duration;
			$this->link = !isset($obj->link) ? '' : $obj->link;
		}
	}

	class SjPlaylist extends SjObject {
		function __construct($obj) {
			// super
			parent::__construct($obj);

			// overwritten properties
			$this->objectType = 'SjPlaylist';

			// what
			$this->code = !isset($obj->code) ? '200' : $obj->code;
			$this->type = !isset($obj->type) ? 'Ok' : $obj->type;

			// return
			$this->content = !isset($obj->content) ? [] : $obj->content;

			// new properties
			$this->id = !isset($obj->id) ? '' : $obj->id;
			$this->userId = !isset($obj->userId) ? '' : $obj->userId;
			$this->title = !isset($obj->title) ? '' : $obj->title;
			$this->visibility = !isset($obj->visibility) ? '' : $obj->visibility;
			$this->description = !isset($obj->description) ? '' : $obj->description;
			$this->color = !isset($obj->color) ? '' : $obj->color;
			$this->image = !isset($obj->image) ? '' : $obj->image;
		}
	}

	class SjUser extends SjObject {
		function __construct($obj) {
			// super
			parent::__construct($obj);

			// overwritten properties
			$this->objectType = 'SjUser';

			// what
			$this->code = !isset($obj->code) ? '200' : $obj->code;
			$this->type = !isset($obj->type) ? 'Ok' : $obj->type;

			// new properties
			$this->id = !isset($obj->id) ? '' : $obj->id;
			$this->name = !isset($obj->name) ? '' : $obj->name;
			$this->email = !isset($obj->email) ? '' : $obj->email;
		}
	}

	
//  ██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗
//  ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
//  ██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗  
//  ██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝  
//  ██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗
//  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
//                                                                   

	function openDB() {
		// path TODO ??? this breaks prepared statements if set to require_once
		require('connect.php');

		// create new database object, @ suppresses errors
		@$db = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

		if(!mysqli_connect_errno()) {
			return $db;
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->code = mysqli_connect_errno();
					$this->code = 'database connection failure';
					$this->origin = 'openDB()';
					$this->message = 'could not connect to database';
				}
			});

			close($stmt, $stmtResult, $db);
			return $result;
		}
	}

	function close(&$stmt, &$stmtResult, &$db) {
		if(isset($stmt)) { $stmt->close(); }
		if(isset($stmtResult) && $stmtResult != true && $stmtResult != false) { $stmtResult->free(); }
		if(isset($db)) { $db->close(); }
	}


//   █████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗
//  ██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝
//  ███████║██║     ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   
//  ██╔══██║██║     ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   
//  ██║  ██║╚██████╗╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   
//  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   
//                                                               

	// validation
	function validateEmail(&$email, &$errorList) {
		$email = trim($email);

		if (!empty($email)) {
			if(strlen($email) <= $GLOBALS['stringMaxLength']) {
				if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
					return true;
				} else {
					$result = new SjError(new class {
						function __construct() {
							$this->origin = 'validateEmail()';
							$this->message = 'field must be a valid e-mail';
							$this->target = 'registerEmail';
							$this->class = 'inputError';
						}
					});
	
					array_push($errorList->content, $result);
					return false;
				}
			} else {
				$result = new SjError(new class {
					function __construct() {
						$this->origin = 'validateEmail()';
						$this->message = "e-mail must be shorter than " . $GLOBALS['stringMaxLength'] . " characters";
						$this->target = 'registerEmail';
						$this->class = 'inputError';
					}
				});

				array_push($errorList->content, $result);
				return false;
			}
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'validateEmail()';
					$this->message = "e-mail cannot be empty";
					$this->target = 'registerEmail';
					$this->class = 'inputError';
				}
			});

			array_push($errorList->content, $result);
			return false;
		}
	}

	function validateUserName(&$userName, &$errorList) {
		$userName = trim($userName);

		if(!empty($userName)) {
			if ($GLOBALS['nameMinLength'] <= strlen($userName) && strlen($userName) <= $GLOBALS['stringMaxLength']) {
				return true;
			} else {
				$result = new SjError(new class {
					function __construct() {
						$this->origin = 'validateUserName()';
						$this->message = "username must be between " . $GLOBALS['nameMinLength'] . " and " . $GLOBALS['stringMaxLength'] . " characters";
						$this->target = 'registerUserName';
						$this->class = 'inputError';
					}
				});
	
				array_push($errorList->content, $result);
				return false;
			}
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'validateUserName()';
					$this->message = 'username cannot be empty';
					$this->target = 'registerUserName';
					$this->class = 'inputError';
				}
			});

			array_push($errorList->content, $result);
			return false;
		}
	}

	function validatePassword(&$password1, &$password2, &$errorList) {
		if (!empty($password1)) {
			if ($GLOBALS['passwordMinLength'] <= strlen($password1) && strlen($password1) <= $GLOBALS['stringMaxLength']) {
				if ($password1 === $password2) {
					return true;
				} else {
					$result = new SjError(new class {
						function __construct() {
							$this->origin = 'validatePassword()';
							$this->message = 'passwords must match';
							$this->target = 'registerPassword2';
							$this->class = 'inputError';
						}
					});
		
					array_push($errorList->content, $result);
					return false;
				}
			} else {
				$result = new SjError(new class {
					function __construct() {
						$this->origin = 'validatePassword()';
						$this->message = "password must be between " . $GLOBALS['passwordMinLength'] . " and " . $GLOBALS['stringMaxLength'] . " characters";
						$this->target = 'registerPassword1';
						$this->class = 'inputError';
					}
				});
	
				array_push($errorList->content, $result);
				return false;
			}
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'validatePassword()';
					$this->message = 'password cannot be empty';
					$this->target = 'registerPassword';
					$this->class = 'inputError';
				}
			});

			array_push($errorList->content, $result);
			return false;
		}
	}

	function register($email, $userName, $password1, $password2) {
		$errorList = new SjErrorList(new class{});

		validateEmail($email, $errorList);
		validateUserName($userName, $errorList);
		validatePassword($password1, $password2, $errorList);

		if (empty($errorList->content)) {
			$db = openDB();
			// check openDB success
			if (!isset($db->objectType)) {
				// prep query
				$stmt = $db->prepare("
					SELECT userName
					FROM users
					WHERE userName = ?
				");
				$stmt->bind_param('s', $userName);
		
				// check query success
				if ($stmt->execute()) {
					$stmtResult = $stmt->get_result();
					
					// check for existing user
					if ($stmtResult->num_rows == 0) {
						// add user
						$passwordHash = password_hash($password1, PASSWORD_DEFAULT);
		
						// prep insert
						$stmt = $db->prepare("
							INSERT INTO users (userName, password, email)
							VALUES (?, ?, ?)
						");
						$stmt->bind_param('sss', $userName, $passwordHash, $email);
		
						if ($stmt->execute()) {
							$result = new SjSuccess(new class {
								function __construct() {
									$this->origin = 'register()';
									$this->message = $userName.' registered';
									$this->target = 'notify';
									$this->class = 'notifySuccess';
									$this->content = $userName;
								}
							});
	
							close($stmt, $stmtResult, $db);
							return $result;
						} else {
							$result = new SjError(new class {
								function __construct() {
									$this->origin = 'register()';
									$this->message = "could not insert user";
									$this->target = 'notify';
									$this->class = 'notifyError';
								}
							});
			
							close($stmt, $stmtResult, $db);
							return $result;
						}
					} else {
						$result = new SjError(new class {
							function __construct() {
								$this->origin = 'register()';
								$this->message = "user already exists";
								$this->target = 'registerUserName';
								$this->class = 'inputError';
							}
						});
		
						close($stmt, $stmtResult, $db);
						return $result;
					}
				} else {
					$result = new SjError(new class {
						function __construct() {
							$this->origin = 'register()';
							$this->message = "could not insert user";
							$this->reason = $stmt->error;
							$this->target = 'notify';
							$this->class = 'notifyError';
						}
					});
	
					close($stmt, $stmtResult, $db);
					return $result;
				}
			} else {
				return $db;
			}
		} else {
			return $errorList;
		} 		
	}

	// login
	function login($userName, $password) {
		// trim on login because it is also trimmed on register
		$userName = trim($userName);

		$db = openDB();
		// check openDB success
		if (!isset($db->objectType)) {
			// prep query
			$stmt = $db->prepare("
				SELECT userId, userName, password
				FROM users
				WHERE userName = ?;
			");
			$stmt->bind_param('s', $userName);

			// check query success
			if ($stmt->execute()) {
				$stmtResult = $stmt->get_result();

				// check if found
				if ($stmtResult->num_rows == 1) {
					$row = $stmtResult->fetch_assoc();
					$DBpassword = $row['password'];

					// check password
					if(password_verify($password, $DBpassword)) {
						// login user
						session_regenerate_id();
						$_SESSION['userId'] = $row['userId'];

						$result = new SjSuccess(new class {
							function __construct() {
								$this->origin = 'login()';
								$this->message = 'user logged in';
								$this->target = 'notify';
								$this->class = 'notifySuccess';
								$this->content = $_SESSION['userId'];
							}
						});

						close($stmt, $stmtResult, $db);
						return $result;
					} else {
						$result = new SjError(new class {
							function __construct() {
								$this->origin = 'login()';
								$this->message = "incorrect password";
								$this->target = 'loginPassword';
								$this->class = 'inputError';
							}
						});
		
						close($stmt, $stmtResult, $db);
						return $result;
					}
				} else {
					$result = new SjError(new class {
						function __construct() {
							$this->origin = 'login()';
							$this->message = "user does not exist";
							$this->target = 'loginUserName';
							$this->class = 'inputError';
						}
					});
	
					close($stmt, $stmtResult, $db);
					return $result;
				}
			} else {
				$result = new SjError(new class {
					function __construct() {
						$this->origin = 'login()';
						$this->message = "could not login user";
						$this->target = 'notify';
						$this->class = 'notifyError';
					}
				});

				close($stmt, $stmtResult, $db);
				return $result;
			}
		} else {
			return $db;
		}
	}

	function logout() {
		session_regenerate_id();
		unset($_SESSION['userId']);

		$result = new SjSuccess(new class {
			function __construct() {
				$this->origin = 'logout()';
				$this->message = 'user logged out';
				$this->target = 'notify';
				$this->class = 'notifySuccess';
			}
		});

		close($stmt, $stmtResult, $db);
		return $result;
	}

	// get
	function getCurrentUser() {
		// check if user is logged in
		if (isset($_SESSION['userId'])) {
			$db = openDB();
			// check openDB success
			if (!isset($db->objectType)) {
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
					$stmtResult = $stmt->get_result();
					if ($stmtResult->num_rows === 1) {
						while($row = $stmtResult->fetch_assoc()) {
							// !!! does not return password
							$result = new SjUser(new class {
								function __construct() {
									$this->id = $row['userId'];
									$this->name = $row['userName'];
									$this->email = $row['email'];
								}
							});
						}

						close($stmt, $stmtResult, $db);
						return $result;
					} else {
						$result = new SjError(new class {
							function __construct() {
								$this->origin = 'getCurrentUser()';
								$this->message = "user does not exist";
								$this->target = 'notify';
								$this->class = 'notifyError';
							}
						});
		
						close($stmt, $stmtResult, $db);
						return $result;
					}
				} else {
					$result = new SjError(new class {
						function __construct() {
							$this->origin = 'getCurrentUser()';
							$this->message = "could not retrieve user information";
							$this->target = 'notify';
							$this->class = 'notifyError';
						}
					});
	
					close($stmt, $stmtResult, $db);
					return $result;
				}
			} else {
				return $db;
			}
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'getCurrentUser()';
					$this->message = 'no user logged in';
					$this->target = 'notify';
					$this->class = 'notifyError';
				}
			});

			return $result;
		}
	}

	function getUser($id) {
		// check if number
		if (is_numeric($id)) {
			$db = openDB();
			// check openDB success
			if (!isset($db->objectType)) {
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
					$stmtResult = $stmt->get_result();
					if ($stmtResult->num_rows === 1) {
						while($row = $stmtResult->fetch_assoc()) {
							// !!! does not return password or email
							$result = new SjUser(new class {
								function __construct() {
									$this->id = $row['userId'];
									$this->name = $row['userName'];
								}
							});
						}
	
						close($stmt, $stmtResult, $db);
						return $result;
					} else {
						$result = new SjError(new class {
							function __construct() {
								$this->origin = 'getUser()';
								$this->message = 'user does not exist';
								$this->target = 'notify';
								$this->class = 'notifyError';
							}
						});
		
						close($stmt, $stmtResult, $db);
						return $result;
					}
				} else {
					$result = new SjError(new class {
						function __construct() {
							$this->origin = 'getUser()';
							$this->message = 'could not retrieve user information';
							$this->target = 'notify';
							$this->class = 'notifyError';
						}
					});
	
					close($stmt, $stmtResult, $db);
					return $result;
				}
			} else {
				return $db;
			}
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'getUser()';
					$this->message = 'user id is invalid';
					$this->target = 'notify';
					$this->class = 'notifyError';
				}
			});

			return $result;
		}	
	}


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝   
//                                                               

	// validation
	function validateTitle(&$title, &$errorList) {
		$title = trim($title);

		if (!empty($title)) {
			if($GLOBALS['nameMinLength'] <= strlen($title) && strlen($title) <= $GLOBALS['stringMaxLength']) {
				return true;
			} else {
				$result = new SjError(new class {
					function __construct() {
						$this->origin = 'validateTitle()';
						$this->message = 'title must be between ' . $GLOBALS['nameMinLength'] . ' and ' . $GLOBALS['stringMaxLength'] . ' characters';
						$this->target = 'playlistTitle';
						$this->class = 'inputError';
					}
				});
	
				array_push($errorList->content, $result);
				return false;
			}
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'validateTitle()';
					$this->message = 'title cannot be empty';
					$this->target = 'playlistTitle';
					$this->class = 'inputError';
				}
			});

			array_push($errorList->content, $result);
			return false;
		}
	}

	function validateVisibility(&$visibility, &$errorList) {
		if (!empty($visibility)) {
			if (in_array($visibility, $GLOBALS['visibilityStates'])) {
				return true;
			} else {
				$result = new SjError(new class {
					function __construct() {
						$this->origin = 'validateVisibility()';
						$this->message = 'visibility is not valid';
						$this->target = 'playlistVisibility';
						$this->class = 'inputError';
					}
				});
	
				array_push($errorList->content, $result);
				return false;
			}
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'validateVisibility()';
					$this->message = 'must select a visibility';
					$this->target = 'playlistVisibility';
					$this->class = 'inputError';
				}
			});

			array_push($errorList->content, $result);
			return false;
		}
	}

	function validateDescription(&$description, &$errorList) {
		$description = trim($description);

		if(strlen($description) <= $GLOBALS['bigStringMaxLength']) {
			return true;
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'validateDescription()';
					$this->message = 'Description must be shorter than ' . $GLOBALS['bigStringMaxLength'];
					$this->target = 'playlistDescription';
					$this->class = 'inputError';
				}
			});

			array_push($errorList->content, $result);
			return false;
		}
	}

	function validateColor(&$color, &$errorList) {
		$color = trim($color);

		if (!empty($color)) {
			if(preg_match("/#([a-f0-9]{3}){1,2}\b/", $color) === 1) {
				return true;
			} else {
				$result = new SjError(new class {
					function __construct() {
						$this->origin = 'validateColor()';
						$this->message = 'color must be hex format: #xxxxxx';
						$this->target = 'playlistColor';
						$this->class = 'inputError';
					}
				});
	
				array_push($errorList->content, $result);
				return false;
			}
		} else {
			$color = $GLOBALS['defaultColor'];
			return true;
		}
	}

	function validateImage(&$image, &$errorList) {
		$image = trim($image);

		if(strlen($image) <= $GLOBALS['bigStringMaxLength']) {
			return true;
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'validateImage()';
					$this->message = 'image link must be shorter than ' . $GLOBALS['bigStringMaxLength'] . ' characters';
					$this->target = 'playlistImage';
					$this->class = 'inputError';
				}
			});

			array_push($errorList->content, $result);
			return false;
		}
	}
	
	// playlist
	function addPlaylist($title, $visibility, $description, $color, $image) {
		// check if user is logged in
		if (isset($_SESSION['userId'])) {
			$errorList = new SjErrorList(new class{});

			validateTitle($title, $errorList);
			validateVisibility($visibility, $errorList);
			validateDescription($description, $errorList);
			validateColor($color, $errorList);
			validateImage($image, $errorList);

			if (empty($errorList->content)) {
				$db = openDB();
				// check openDB success
				if (!isset($db->objectType)) {
					// prep query
					$stmt = $db->prepare("
						SELECT userId, title
						FROM playlists
						WHERE userId = ? AND title = ?
					");
					$stmt->bind_param('is', $_SESSION['userId'], $title);
			
					// check query success
					if ($stmt->execute()) {
						$stmtResult = $stmt->get_result();
						
						// check for existing playlist
						if ($stmtResult->num_rows == 0) {
							// prep insert
							$stmt = $db->prepare("
							INSERT INTO playlists (userId, title, visibility, description, color, image)
							VALUES (?, ?, ?, ?, ?, ?)
							");
							$stmt->bind_param('isssss', $_SESSION['userId'], $title, $visibility, $description, $color, $image);

							if ($stmt->execute()) {
								$result = new SjSuccess(new class {
									function __construct() {
										$this->origin = 'addPlaylist()';
										$this->message = 'playlist added';
										$this->target = 'notify';
										$this->class = 'notifySuccess';
									}
								});
						
								close($stmt, $stmtResult, $db);
								return $result;
							} else {
								$result = new SjError(new class {
									function __construct() {
										$this->origin = 'addPlaylist()';
										$this->message = 'could not add playlist';
										$this->target = 'notify';
										$this->class = 'notifyError';
									}
								});
				
								close($stmt, $stmtResult, $db);
								return $result;
							}
						} else {
							$result = new SjError(new class {
								function __construct() {
									$this->origin = 'addPlaylist()';
									$this->message = 'playlist already exists';
									$this->target = 'playlistTitle';
									$this->class = 'inputError';
								}
							});
			
							close($stmt, $stmtResult, $db);
							return $result;
						}
					} else {
						$result = new SjError(new class {
							function __construct() {
								$this->origin = 'addPlaylist()';
								$this->message = 'could not add playlist';
								$this->target = 'notify';
								$this->class = 'notifyError';
							}
						});
		
						close($stmt, $stmtResult, $db);
						return $result;
					}
				} else {
					return $db;
				}
			} else {
				return $errorList;
			}
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'addPlaylist()';
					$this->message = 'you must be logged in';
					$this->target = 'notify';
					$this->class = 'notifyError';
				}
			});

			return $result;
		}
	}

	function deletePlaylist($id) {
		// check if user is logged in
		if (isset($_SESSION['userId'])) {
			$db = openDB();
			// check openDB success
			if (!isset($db->objectType)) {
				// search for playlist
				$stmt = $db->prepare("
					SELECT playlistId
					FROM playlists
					WHERE playlistId = ? AND userId = ?
				");
				$stmt->bind_param('ii', $id, $_SESSION['userId']);
		
				// check query success
				if ($stmt->execute()) {
					$stmtResult = $stmt->get_result();
						
					// check that playlist exists
					if ($stmtResult->num_rows === 1) {
						// delete playlist
						$stmt = $db->prepare("
							DELETE FROM playlists
							WHERE playlistId = ? AND userId = ?
						");
						$stmt->bind_param('ii', $id, $_SESSION['userId']);
				
						// check query success
						if ($stmt->execute()) {
							$result = new SjSuccess(new class {
								function __construct() {
									$this->origin = 'deletePlaylist()';
									$this->message = 'playlist deleted';
									$this->target = 'notify';
									$this->class = 'notifySuccess';
								}
							});
					
							close($stmt, $stmtResult, $db);
							return $result;
						} else {
							$result = new SjError(new class {
								function __construct() {
									$this->origin = 'deletePlaylist()';
									$this->message = 'could not delete playlist';
									$this->target = 'notify';
									$this->class = 'notifyError';
								}
							});
				
							close($stmt, $stmtResult, $db);
							return $result;
						}
					} else {
						$result = new SjError(new class {
							function __construct() {
								$this->origin = 'deletePlaylist()';
								$this->message = 'playlist does not exist';
								$this->target = 'notify';
								$this->class = 'notifyError';
							}
						});
			
						close($stmt, $stmtResult, $db);
						return $result;
					}
				} else {
					$result = new SjError(new class {
						function __construct() {
							$this->origin = 'deletePlaylist()';
							$this->message = 'could not delete playlist';
							$this->target = 'notify';
							$this->class = 'notifyError';
						}
					});
		
					close($stmt, $stmtResult, $db);
					return $result;
				}
			} else {
				return $db;
			}
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'deletePlaylist()';
					$this->message = 'you are not logged in';
					$this->target = 'notify';
					$this->class = 'notifyError';
				}
			});

			close($stmt, $stmtResult, $db);
			return $result;
		}
	}

	function getPlaylist($id) {
		// check valid id
		if (is_numeric($id)) {
			$db = openDB();
			// check openDB success
			if (!isset($db->objectType)) {
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
					$stmtResult = $stmt->get_result();
					if ($stmtResult->num_rows === 1) {
						// fetch data
						while($row = $stmtResult->fetch_assoc()) {
							$playlist = new SjPlaylist(new class {
								function __construct() {
									$this->id => $row['playlistId'];
									$this->userId => $row['userId'];
									$this->title => $row['title'];
									$this->visibility => $row['visibility'];
									$this->description => $row['description'];
									$this->color => $row['color'];
									$this->image => $row['image'];
								}
							});
						}

						// check valid permissions, public, linkOnly, or private and same user
						if ($playlist['visibility'] === 'public' || $playlist['visibility'] === 'linkOnly' || ($playlist['visibility'] === 'private' && $playlist['userId'] === $_SESSION['userId'])) {
							// retrieve tracks
							$stmt = $db->prepare("
								SELECT *
								FROM tracks
								WHERE playlistId = ?
								ORDER BY position ASC
							");
							$stmt->bind_param('i', $id);
					
							// check query success
							if ($stmt->execute()) {
								$stmtResult = $stmt->get_result();

								// fetch data
								while($row = $stmtResult->fetch_assoc()) {
									array_push($playlist->content, new SjTrack(new class {
										$this->playlistId = $row['playlistId'];
										$this->position = $row['position'];
										$this->source = $row['source'];
										$this->id = $row['trackId'];
										$this->title = $row['title'];
										$this->artists = explode('|||', $row['artists']);
										$this->duration = $row['duration'];
									}));
								}

								close($stmt, $stmtResult, $db);
								return $playlist;
							} else {
								$result = new SjError(new class {
									function __construct() {
										$this->origin = 'getPlaylist()';
										$this->message = 'could not retrieve playlist';
										$this->target = 'notify';
										$this->class = 'notifyError';
									}
								});
					
								close($stmt, $stmtResult, $db);
								return $result;
							}
						} else {
							$result = new SjError(new class {
								function __construct() {
									$this->origin = 'getPlaylist()';
									$this->message = 'you do not have permission to view this playlist';
									$this->target = 'notify';
									$this->class = 'notifyError';
								}
							});
				
							close($stmt, $stmtResult, $db);
							return $result;
						}
					} else {
						$result = new SjError(new class {
							function __construct() {
								$this->origin = 'getPlaylist()';
								$this->message = 'playlist does not exist';
								$this->target = 'notify';
								$this->class = 'notifyError';
							}
						});
			
						close($stmt, $stmtResult, $db);
						return $result;
					}
				} else {
					$result = new SjError(new class {
						function __construct() {
							$this->origin = 'getPlaylist()';
							$this->message = 'could not retrieve playlist';
							$this->target = 'notify';
							$this->class = 'notifyError';
						}
					});
		
					close($stmt, $stmtResult, $db);
					return $result;
				}
			} else {
				return $db;
			}
		} else {
			$result = new SjError(new class {
				function __construct() {
					$this->origin = 'getPlaylist()';
					$this->message = 'playlist id is invalid';
					$this->target = 'notify';
					$this->class = 'notifyError';
				}
			});

			close($stmt, $stmtResult, $db);
			return $result;
		}	
	}

	function orderPlaylist($id) {
		$playlist = getPlaylist($id);

		// check for no errors
		if ($playlist['objectType'] == 'playlist') {
			// get position list
			$oldPositionList = [];
			forEach($playlist['tracks'] as $track) {
				array_push($oldPositionList, $track['position']);
			}
			sort($oldPositionList);

			// copy values
			$newPositionList = $oldPositionList;

			// order

			// set first item to first position
			$newPositionList[0] = 1;

			// if at least two items
			if (sizeof($newPositionList) >= 2) {
				// loop through all items, except last
				for ($i = 0; $i < sizeof($newPositionList) - 1; $i++) {
					$thisPosition = $newPositionList[$i];
					$nextPosition = $newPositionList[$i + 1];
	
					// if next index is the same as this index
					if ($nextPosition === $thisPosition) {
						// loop through all items, starting at the next index
						for ($j = $i + 1; $j < sizeof($newPositionList); $j++) {
							// increase
							$newPositionList[$j]++;
						}
					// else if next inext is not this index + 1
					} else if ($nextPosition !== ($thisPosition + 1)) {
						// get difference from where it should be
						$difference = $nextPosition - ($thisPosition + 1);

						// loop through all items, starting at the next index
						for ($j = $i + 1; $j < sizeof($newPositionList); $j++) {
							// remove difference
							$newPositionList[$j] = $newPositionList[$j] - $difference;
						}
					}
				}
			}

			// apply
			$errorList = new SjErrorList(new class {
				function __construct() {
					$this->origin = 'orderPlaylist()';
					$this->message = 'could not order playlist';
					$this->target = 'notify';
					$this->class = 'notifyError';
					$this->content = [];
				}
			});

			// because two positions cant be the same, sending the old positions to negative before applying the new ones can solve this, TODO there has to be a better way to to this though
			for ($i = 0; $i < sizeof($oldPositionList); $i++) {
				$result = setTrackPosition($id, $oldPositionList[$i], 'position', (-1 * $oldPositionList[$i]));

				if ($result['objectType'] !== 'success') {
					push_array($errorList->content, $result);
				}				
			}
			for ($i = 0; $i < sizeof($oldPositionList); $i++) {
				$result = setTrackPosition($id, (-1 * $oldPositionList[$i]), 'position', $newPositionList[$i]);

				if ($result['objectType'] !== 'success') {
					push_array($errorList->content, $result);
				}				
			}

			if (sizeof($errorList->content) === 0) {
				$result = new SjSuccess(new class {
					function __construct() {
						$this->origin = 'orderPlaylist()';
						$this->message = 'playlist ordered';
						$this->target = 'notify';
						$this->class = 'notifySuccess';
					}
				});
		
				close($stmt, $stmtResult, $db);
				return $result;
			} else {
				close($stmt, $stmtResult, $db);
				return $errorList;
			}
		}
	}

	function addTrack($playlistId, $source, $id, $title, $artists, $duration) {
		// TODO add validation for track details
		
		// get playlist (or error)
		$playlist = getPlaylist($playlistId);
		if ($playlist['objectType'] === 'playlist') {
			$db = openDB();
			// check openDB success
			if (!isset($db->objectType)) {
				// set position
				$length = sizeof($playlist['tracks']);
				// last track, position + 1;
				$position = $playlist['tracks'][$length - 1]['position'] + 1;

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
					$result = new SjSuccess(new class {
						function __construct() {
							$this->origin = 'addTrack()';
							$this->message = 'track added';
							$this->target = 'notify';
							$this->class = 'notifySuccess';
						}
					});
			
					close($stmt, $stmtResult, $db);
					return $result;
				} else {
					$result = new SjError(new class {
						function __construct() {
							$this->origin = 'addTrack()';
							$this->message = 'could not add track';
							$this->target = 'notify';
							$this->class = 'notifyError';
						}
					});
		
					close($stmt, $stmtResult, $db);
					return $result;
				}
			} else {
				return $db;
			}
		} else {
			return $playlist;
		}
	}

	function deleteTrack($playlistId, $position) {
		$db = openDB();
		// check openDB success
		if (!isset($db->objectType)) {
			// prep query
			$stmt = $db->prepare("
				DELETE FROM tracks
				WHERE playlistId = ? AND position = ?
			");
			$stmt->bind_param('ii', $playlistId, $position);

			// check query success
			if ($stmt->execute()) {
				$result = new SjSuccess(new class {
					function __construct() {
						$this->origin = 'deleteTrack()';
						$this->message = 'track deleted';
						$this->target = 'notify';
						$this->class = 'notifySuccess';
					}
				});
		
				close($stmt, $stmtResult, $db);
				return $result;
			} else {		
				$result = new SjError(new class {
					function __construct() {
						$this->origin = 'deleteTrack()';
						$this->message = 'could not delete track';
						$this->target = 'notify';
						$this->class = 'notifyError';
					}
				});
	
				close($stmt, $stmtResult, $db);
				return $result;
			}
		} else {
			return $db;
		}
	}

	function setTrackPosition($playlistId, $position, $attribute, $value) {
		$db = openDB();
		// check openDB success
		if (!isset($db->objectType)) {
			// prep query
			$stmt = $db->prepare("
				UPDATE tracks
				SET position = ?
				WHERE playlistId = ? AND position = ?
			");
			$stmt->bind_param('iii', $value, $playlistId, $position);

			// check query success
			if ($stmt->execute()) {
				$result = new SjSuccess(new class {
					function __construct() {
						$this->origin = 'setTrackPosition()';
						$this->message = 'track moved';
						$this->target = 'notify';
						$this->class = 'notifySuccess';
					}
				});
		
				close($stmt, $stmtResult, $db);
				return $result;
			} else {
				$result = new SjError(new class {
					function __construct() {
						$this->origin = 'setTrackPosition()';
						$this->message = 'could not move track';
						$this->target = 'notify';
						$this->class = 'notifyError';
					}
				});
	
				close($stmt, $stmtResult, $db);
				return $result;
			}
		} else {
			return $db;
		}
	}
?>