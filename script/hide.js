	$(document).ready(function(){
	/***************************************************************
	*******************Hiding/Showing the tool box******************
	****************************************************************/
	
	var shwStatus = false;
	
	$('#hdToolKit').click(function(event){
		if(shwStatus == false){
			$('#hdToolKit').text('show');
			$("#rightDiv").animate({left:'300px',width: "toggle"});
			shwStatus = true;
		}
		else{
			$('#hdToolKit').text('hide');
			$("#rightDiv").animate({left:'0px',width: "toggle"});
			shwStatus = false;
		}
		
		
	});
});
