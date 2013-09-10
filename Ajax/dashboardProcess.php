<?php
require_once("../classes/csGeneral.php");
require_once("../library/dbcon.php");

	$query 	= "	SELECT content.id,content.name,content.downld_status,content.isPublished
				FROM content WHERE content.del_flag = 0";
	//echo $query; 
	$result	= mysql_query($query)or die(mysql_error());
	$row_nums = mysql_num_rows($result);
	
	$data = "";
	
	if($row_nums > 0){
		$data = "<div id='prsntDiv'>";
		while($rows = mysql_fetch_assoc($result)){
			$id		= $rows['id'];
			$name	= $rows['name'];
			
			$data .= '	<a href="add_slide.php?id='.base64_encode($id).'"><div id="prsntn'.$id.'" class="prsntContent">
							<span>'.$name.'</span>
							<input type="hidden" id="presnt_id" name="presnt_id" value='.$id.'>
						</div></a>';
		}
		$data = $data.'</div>';
		echo $data;
	}
	else{
		//$data = "No Presentations";
	}
?>