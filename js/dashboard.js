$(function(){
	
	//SAVE PRESENTAION
	$("#prestnBtn").click(function() {
		var flag = true;
		var name = $.trim($('#prestnName').val());
		if(name == ''){
			alert('enter presentation name');
			flag = false;
		}
		
		var data = '&pName=' + name;
		$.ajax({
		url: 'Ajax/presentnSubmit.php',
		type: 'POST',
		data: data,
		cache: false,
		success: function(data){
			if(data == 1){
				$('#succesMsg').html('Error');
			} else if(data){
				$('#succesMsg').html(data).fadeOut();
				setTimeout("window.location='add_slide.php?id="+btoa(data)+"'",1000);
				$('#prestnName').val('');
			}
		}
		});
	
	});
	
	/************** end: functions. **************/
}); // jQuery End
