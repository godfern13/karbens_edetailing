<?php 
	include("classes/classes.php");
	$serVerName		=	$_SERVER['SERVER_NAME'];
	$upload_dir 	= 	'images/child/'; // Directory for file storing
	$filename		= 	'';
	$result 		= 	'ERROR';
	$result_msg 	= 	'';
	$allowed_image 	= 	array ('image/gif', 'image/jpeg', 'image/jpg', 'image/pjpeg','image/png');
	
	if (isset($_FILES['chldImg']))  // file was send from browser
	{
		if (in_array($_FILES['chldImg']['type'], $allowed_image)) {
			$filename = $_FILES['chldImg']['name'];
			move_uploaded_file($_FILES['chldImg']['tmp_name'], $upload_dir.$filename);
		}
	}
	exit(); // do not go futher
?>