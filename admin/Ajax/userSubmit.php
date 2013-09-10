<?php
include('../../library/dbcon.php');
require_once ("../../classes/csGeneral.php");
session_start();
	
$generalObj = new general();
$_SESSION['errmsg']= '';

$actionFlag 	= trim($_POST['queryFlag']);

if($actionFlag == 0 || $actionFlag == 1){
	$userFName		= $generalObj->setFormField($_POST['fName']);
	$userLName		= $generalObj->setFormField($_POST['lName']);
	$fullname 		= $userFName.' '.$userLName;
	$userCountry 	= trim($_POST['country']);
	$userState 		= trim($_POST['state']);
	$userCity		= $generalObj->setFormField($_POST['city']);
	$userContact	= trim($_POST['contact']);
	$userEmail		= $_POST['email'];

	if($userCity == '')
	{
		$userCity = null;
	}

	if($userContact == '')
	{
		$userContact = 0;
	}

	$userType = 1;
	
	//#INSERT
	if($actionFlag == 0){
	
		$userUsername	= trim($_POST['username']);
		$userPassword	= trim($_POST['pswd']);
		
		$password		= $generalObj->encrypt($userPassword ); 
			
				$id = $generalObj->getPK('users','id');
				$query = "INSERT INTO users(id,name,username,password,country,state,city,contact,email_id,u_type,added_on)
							VALUES(".$id.",'".$fullname."','".$userUsername ."','".$password."','".$userCountry."','".$userState."','".$userCity."',".$userContact.",'".$userEmail ."',".$userType.",current_timestamp)";
				echo $query;
				$result = mysql_query($query) or die('Error in connection'.mysql_error());
				
				$_SESSION['errmsg'] = 'New User Added';
				
				header('Location:../add_user.php');
	}
	
	//#EDIT
	if($actionFlag == 1){
		$userId = $_POST['user_id'];
		$query = "UPDATE users SET name='".$fullname."',country='".$userCountry."',state='".$userState."',city='".$userCity."',contact=".$userContact.",email_id='".$userEmail ."',updated_on = current_timestamp WHERE id = ".$userId." ";
		//echo $query;
		$result = mysql_query($query)or die('Error in connection'.mysql_error());
		$_SESSION["errMsg"] = "User Edited";
		$msg = "User Edited";
		echo $msg;
		header('Location:../view_users.php');
	}
}
	
//#DELETE
if($actionFlag == 2){
	$userId = $_POST['user_id'];
	
	$query = "UPDATE users SET del_flag=1 WHERE id = ".$userId." ";
	//echo $query;
	$result = mysql_query($query)or die('Error in connection'.mysql_error());
	$_SESSION["errMsg"] = "User Deleted";
	$msg = "User Deleted";
	echo $msg;
}


?>