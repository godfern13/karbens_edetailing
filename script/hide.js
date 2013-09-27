	$(document).ready(function(){
	/***************************************************************
	*******************Hiding/Showing the tool box******************
	****************************************************************/
	
	var shwStatus = false;
	
	$('#hdToolKit').click(function(event){
		if(shwStatus == false){
			$('#hdToolKit').text('show');
			shwStatus = true;
			$('#rightDiv').hide('slide', {direction: 'right'}, 1000);
		}
		else{
			$('#hdToolKit').text('hide');
			shwStatus = false;
			$('#rightDiv').hide('slide', {direction: 'left'}, 1000);
			//$( '#rightDiv' ).unbind( "toggle");
			
		}
		//$('#rightDiv').toggle();
		
	});
});
