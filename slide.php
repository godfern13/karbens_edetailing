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
	<!--<link rel="stylesheet" type="text/css" href="css/framework.css" media="all" />-->
	<link href="css/general.css" type="text/css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/resize.css" media="all" />
	<style>
		#container{
			min-height:463px;
			width:100%;
			text-align:center;
			padding: 0px 0 0;
		}
	</style>
	<script type="text/javascript" src="script/slide.js"></script>
	<script type="text/javascript" src="script/dragresize.js"></script>
	<script type="text/javascript" src="jscolor/jscolor.js"></script>	
	<script type="text/javascript" src="script/resize.js"></script>
	<!--<script type="text/javascript" src="script/hide.js"></script>-->
</head>
	<body>
		<div id="wrapper">
			<?include('include/header.php');?>
			<div id="mainWrapper">
				<div id="container">
					<div id="webFrameBody">
						<div id="webFrameMenu">
							<ul style="width:1095px">
								<li >								
									<input type="image" name="saveSlide" id="saveSlide" src="images/sld_sv.png" onclick="return slideSaveCall()" title="SAVE SLIDE" style="width:35px;height:35px;"/>
									<input type="hidden" id="prntId" name="prntId" value="<?echo $slideId?>">
								</li>
								<li>
									<p id="sndbk" class="backBtn">SEND TO BACK</p>
									<p id="bngfrnt" class="frntBtn">BRING TO FRONT</p>	
								</li>
								<li style="float:right;width:100px; margin: 22px 0 0;">
									<p id="hdToolKit" class="toolBtn">Hide</p>
								</li>								
							</ul>
						</div>
						<div id="createArea">
							<div id="frame"></div>
						</div>
						<div id="rightDiv">
							<div id="specfcatnDiv">
								<img src="images/loader.gif" style="margin:120px 0 0 80px" id="specLoader">
							</div>
							<div id="options">
								<iframe name="upload_iframe" id="upload_iframe" style="display:none;"></iframe>
								<div id="drag1" class="drag">Text</div>
								<div id="drag2" class="drag">Image</div>
								<div id="drag3" class="drag">Video</div>
								<div id="drag4" class="drag">Reference</div>
							</div>			
						</div>
					</div>
				</div>
			</div>
			<?include('include/footer.php');?>
		</div>
	</body>
</html>