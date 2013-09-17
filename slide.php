<?php
	require_once("classes/csGeneral.php");
	require_once "library/dbcon.php";
	require_once "library/functions.php";
	sessionCheck();
	//session_start();
	include("classes/classes.php");
	
	$slideId = base64_decode($_GET['id']);	
	
	$contentCnt		=	$_SESSION['contentCnt'];
	$addParentObj 	=   unserialize($_SESSION['contentObject'.$contentCnt]);
	$parentCount	=	$addParentObj->getParentCount();
	$addParentObj->addParents($parentCount);
	$addParentObj		=	new parentClass();
	$_SESSION['parentObject'.$parentCount] = serialize($addParentObj);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="content-script-type" content="text/javascript" />
    <meta http-equiv="content-style-type" content="text/css" />
	<title>E-Detailing</title>
   
	<script src="http://www.google.com/jsapi" type="text/javascript"></script>
	<script type="text/javascript">
	    google.load("jquery", "1.4.2");
		google.load("jqueryui", "1.7.2");
	</script>
	<link rel="stylesheet" type="text/css" href="css/framework.css" media="all" />
	<script type="text/javascript" src="script/slide.js"></script>
	<script type="text/javascript" src="script/dragresize.js"></script>
		
	<style type="text/css">

	/* Required CSS classes: must be included in all pages using this script */

	/* Apply the element you want to drag/resize */
	.drsElement {
	 position: absolute;
	 border: 1px solid #333;
	 word-wrap:break-word;
	}
	
	/* Apply the Rect element you want to drag/resize */
	.drsRectElement{
	 position: absolute;
	 border: 1px solid #333;
	 word-wrap:break-word;
	 text-align:center;
	}
	
	/* Apply the Text element you want to drag/resize */
	.drsTextElement {
	 position: absolute;
	 border: 1px dotted #333;
	 word-wrap:break-word;
	 text-align:center;
	}
	
	.border 
	{ 
	  border-color: #C1E0FF; 
	  border-width:1px; 
	  border-style:solid; 
	}
	
	 The main mouse handle that moves the whole element.
	 You can apply to the same tag as drsElement if you want.
	*/
	.drsMoveHandle {
	 height: 20px;
	 background-color: #CCC;
	 border-bottom: 1px solid #666;
	 cursor: move;
	 text-align:center;
	}
	
	.drsMoveTextHandle {
	 height: 20px;
	 background-color: #CCC;
	 /*border-bottom: 1px solid #666;*/
	 cursor: move;
	 text-align:center;
	}
	
	.drsMoveRectHandle {
	 height: 20px;
	 background-color: #CCC;
	 border-bottom: 1px solid #666;
	 cursor: move;
	 text-align:center;
	}

	/*
	 The DragResize object name is automatically applied to all generated
	 corner resize handles, as well as one of the individual classes below.
	*/
	.dragresize {
	 position: absolute;
	 width: 5px;
	 height: 5px;
	 font-size: 1px;
	 background: #EEE;
	 border: 1px solid #333;
	}

	/*
	 Individual corner classes - required for resize support.
	 These are based on the object name plus the handle ID.
	*/
	.dragresize-tl {
	 top: -8px;
	 left: -8px;
	 cursor: nw-resize;
	}
	.dragresize-tm {
	 top: -8px;
	 left: 50%;
	 margin-left: -4px;
	 cursor: n-resize;
	}
	.dragresize-tr {
	 top: -8px;
	 right: -8px;
	 cursor: ne-resize;
	}

	.dragresize-ml {
	 top: 50%;
	 margin-top: -4px;
	 left: -8px;
	 cursor: w-resize;
	}
	.dragresize-mr {
	 top: 50%;
	 margin-top: -4px;
	 right: -8px;
	 cursor: e-resize;
	}

	.dragresize-bl {
	 bottom: -8px;
	 left: -8px;
	 cursor: sw-resize;
	}
	.dragresize-bm {
	 bottom: -8px;
	 left: 50%;
	 margin-left: -4px;
	 cursor: s-resize;
	}
	.dragresize-br {
	 bottom: -8px;
	 right: -8px;
	 cursor: se-resize;
	}
	
	</style>
	
</head>
	<body>
		<div id="wrapper">
			<div id="headerDiv">
			<?//include('include/header.php');?>
				<ul style="width:950px">
					<li>
						<input type="image" name="saveSlide" id="saveSlide" src="images/submit.png" onclick="return slideSaveCall()"/>
						<input type="hidden" id="prntId" name="prntId" value="<?echo $slideId?>">
					</li>
				</ul>
			</div>
			<div id="frame">
				<!--<input type="button" name="" id="" value="save" onclick="return saveDta()"/>-->
			</div>
			<div id="rightDiv">
				<div id="specfcatnDiv">
					<img src="images/loader.gif" style="margin:120px 0 0 80px" id="specLoader">
				</div>
				<div id="options">
					<iframe name="upload_iframe" id="upload_iframe" style="display:none;"></iframe>
					<div id="drag1" class="drag"></div>
				</div>
			</div>
		</div>
		<div id="div_id"></div>
	</body>
</html>