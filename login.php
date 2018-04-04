<?php
    require_once('top.php');

    require_once('header.php');

	// // initialize
	// $email = isset($_POST['email']) ? $_POST['email'] : '';
	// $password = isset($_POST['password']) ? $_POST['password'] : '';

	// $errors = [];
	// $message = '';

	
	// if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
	// 	// manage logout request
	// 	if ($_GET['action'] === 'logout') {
	// 		session_regenerate_id();
	// 		unset($_SESSION['userID']);

	// 		header('Location: showmodels.php');
	// 	}

	// 	// manage requested login
	// 	if ($_GET['action'] === 'requestLogin') {
	// 		$message = 'please login first';
	// 	}

	// }


?>


<input id='loginUserName' type='text' placeholder='username'>
<input id='loginPassword' type='password' name='password' placeholder='password'>
<button id='loginSubmit'>Login</button>


<input id='registerEmail' type='text' placeholder='e-mail'>
<input id='registerUserName' type='text' placeholder='username'>
<input id='registerPassword1' type='password' placeholder='password'>
<input id='registerPassword2' type='password' placeholder='password again'>

<button id='registerSubmit'>Register</button>

	
<?php
	require_once('footer.php');
?>