<?php 
	require_once "../classes/csGeneral.php";
	require_once "../library/dbcon.php";
	require_once "../library/functions.php";
	sessionCheck();
	
	$generalObj = new general();
	$table_name	= 'content';
	$table_col	= 'id';
	$contentId		= $generalObj->getPK($table_name,$table_col);
	
	$name 	= $_POST['pName'];
	$query 	= "	INSERT INTO content(id,name)VALUES(".$contentId.",'".$name."')";
	$result = mysql_query($query)or die(mysql_error());
	$error 	= mysql_error() != '' ? true : false;

	if($error)
	{
		echo '1';
	}
	else{
		echo $contentId;
	}
	
	//header('Location:../add_slide.php');
	
?>


