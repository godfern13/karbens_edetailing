<?php
	session_start();
	include("../classes/classes.php");
	$chldCrDte		=	date('Y-m-d');
	$chldUpDte		=	'';
	$childWdth		=	$_POST['childWdth'];
	$childHght		=	$_POST['childHght'];
	$childCnt		=	$_POST['chldCnt'];
	$chldX			=	$_POST['chldX'];
	$chldY			=	$_POST['chldY'];
	$childType		=	$_POST['childType'];
	$childText		=	$_POST['childText'];
	$childImgPath	=	$_POST['childImgPath'];
	
	$contentCnt		=	$_SESSION['contentCnt'];
	$addParentObj 	=   unserialize($_SESSION['contentObject'.$contentCnt]);
	$parentCount	=	$addParentObj->getParentCount();
	$parentObj 		=   unserialize($_SESSION['parentObject'.$parentCount]);
	$childCount		=	$parentObj->getChildCount();
	$parentObj->addChild($childCount);
	
	$chldSpecObj	=	new childClass();
	$childName		=	'Child'.$childCount;
	$chldSpecObj->addChildSpecification($childName,$chldCrDte,$chldUpDte,$childWdth,$childHght,$childCnt,$chldX,$chldY,$childType,$childText,$childImgPath);
	$speDispChld	=	$chldSpecObj->getChildSpecification();
	$_SESSION['childObject'.$childCnt] = serialize($chldSpecObj);
	echo $speDispChld;
?>