	$(document).ready(function(){
	/***************************************************************
	*******************Hiding/Showing the tool box******************
	****************************************************************/
	
	var shwStatus = false;
	
	$('#hdToolKit').click(function(event){
		if(shwStatus == false){
			$('#hdToolKit').text('show');
			alert(shwStatus);
			//$('#rightDiv').animate({left:'250px'});
			shwStatus = true;
		}
		else{
			$('#hdToolKit').text('hide');
			//$('#rightDiv').animate({right:'0px'});
			alert(shwStatus);
			shwStatus = false;
		}
		//$('#rightDiv').toggle();
		
	});
});
