$(document).ready(function(){

	/*******GLOBAL VAR*********
	*******************************/
	var counter = 0;
	var zindexval = 5000;
	/*******************************
	********************************/
	
	/*-------------------------------------On page load Get Parent Frame Specification ----------------------------------*/
	addParentSpec();	
	
	/********************************************************************
	******************Getting the X and Y axis of the frame*************
	********************************************************************/
	var offset2 = $("#frame").offset();
	var w = $(window);
	var parentX = 	(offset2.left-w.scrollLeft());
	var parentY	=	(offset2.top-w.scrollTop());
	/********************************************************************
	********************************************************************
	********************************************************************/
	
	$("#frame").click(function()
	{
		showParSpec();
		$('.selected').removeClass('selected');
	});
	
	
	/***************************************************************
	**********Dragging an element from the tools box****************
	****************************************************************/
	/*-------------------------------------- function to drag an element -------------------------------------*/
	$(".drag").draggable({
		helper:'clone',
		containment: 'frame',
		/*--------------------------------------- first time drag -----------------------------------------------*/
		stop:function(ev, ui) { 
			$(this).css("z-index", zindexval); 
			if(ui.helper.attr('id') == 'drag1'){ var childType=1;}//Text
			else if(ui.helper.attr('id') == 'drag2'){ var childType=2;}//Image
			else if(ui.helper.attr('id') == 'drag3'){ var childType=3;}//Video
			else if(ui.helper.attr('id') == 'drag4'){ var childType=4;}//References
			
			var pos=$(ui.helper).offset();
			objName = "#clonediv"+counter
			$(objName).css({"left":pos.left,"top":pos.top});
			$(objName).removeClass("drag");
			/*------------------------------------------- drag element within the frame --------------------------------*/
			$(objName).draggable({
				containment: 'parent',
				stop:function(ev, ui) {  
					var pos=$(ui.helper).offset();
					console.log($(this).attr("id"));
					console.log(pos.left)
					console.log(pos.top);
					/*----------------------------------------- Function To Get Coordinates ----------------------------------*/
					var cordData = calCordinates(parentX,parentY,counter,childType);
				}
			});
			/*----------------------------------------- Function To Get Cordinates ----------------------------------*/
				//var cordData = calCordinates(parentX,parentY,counter,childType);
		}
	});
	/*------------------------------------------ drop an element function -----------------------------------------------*/
	$("#frame").droppable({ 
		drop: function(ev, ui) { 
			
			if(ui.helper.attr('id') == 'drag1'){ var childType=1;}//Text
			else if(ui.helper.attr('id') == 'drag2'){ var childType=2;}//Image
			else if(ui.helper.attr('id') == 'drag3'){ var childType=3;}//Video
			else if(ui.helper.attr('id') == 'drag4'){ var childType=4;}//References
		
			if (ui.helper.attr('id').search(/drag[0-9]/) != -1){
				counter++;
				zindexval++;
				var element=$(ui.draggable).clone();
				objName = "#clonediv"+counter;
				element.addClass("tempclass");
				$(this).append(element);
				$(".tempclass").attr("id","clonediv"+counter);
				$("#clonediv"+counter).removeClass("tempclass");
				$(objName).css({'z-index':zindexval});
				$(objName).resize();
				$(objName).bind("click", function () {
					counter = this.id.slice(-1);
					showChildSpec(counter);
				});
				if(childType ==1){
					$("#clonediv"+counter).addClass("text");
				}
				else if(childType ==2){
					$("#clonediv"+counter).addClass("image");
				}
				else if(childType ==3){
					$("#clonediv"+counter).addClass("video");
				}
				if(childType ==4){
					$("#clonediv"+counter).addClass("ref");
				}
				
			//Adding html content if its a video
			//var vidStatus = false;
			//if(childType == 3){
				
				//if(vidStatus == true){
				//$("#clonediv"+counter).append("<video width='200' height='100' controls autoplay><source src='movie.ogg' type='video/ogg'> <source src='movie.mp4' type='video/mp4'><object data='movie.mp4' width='320' height='240'><embed width='320' height='240' src='movie.swf'> </object></video>");
					//vidStatus = true;
				/*}
				else{
					$("#clonediv"+counter).append("");
					vidStatus = true;
				}*/
			//}
			/*$("input[name=videoUpload]").change(function() {
				$(this).closest("form").submit();
			});*/
			
				/*---------------------------------- Get the dynamically item id -------------------------------*/
				draggedNumber = ui.helper.attr('id').search(/drag([0-9])/)
				if(ui.helper.attr('id') == 'drag4'){ itemDragged = "dragged2" }
				else{itemDragged = "dragged1"}
				console.log(itemDragged)
				$("#clonediv"+counter).addClass(itemDragged);
				var cordData = calCordinates(parentX,parentY,counter,childType);
			}
		}
	});
	
	/***************************************************************
	****************Moving an element to FRONT/BACK*****************
	****************************************************************/
	
	$('#sndbk').click(function(event){
					
		var divId = $('.selected').attr('id');
		var currIndex = $('.selected').css('z-index');
		var indexArray = [];
		$('.dragged1 ').each(function () {
			 indexArray.push($(this).css('zIndex'));
		});
		var minIndex = Math.min.apply(Math,indexArray);//Getting minimum index value
		var newIndex  = minIndex - 1;
		$('#'+divId).css({'z-index':newIndex});
		event.stopPropagation();
	});
	
	$('#bngfrnt').click(function(event){
					
		var divId = $('.selected').attr('id');
		var currIndex = $('.selected').css('z-index');
		var indexArray = [];
		$('.dragged1 ').each(function () {
			 indexArray.push($(this).css('zIndex'));
		});
		var maxIndex = Math.max.apply(Math,indexArray);//Getting maximum index value
		var newIndex  = maxIndex + 1;
		$('#'+divId).css({'z-index':newIndex});
		event.stopPropagation();
	});

});

/********************************************************************************************************************
											PARENT FUNCTIONS START
*********************************************************************************************************************/

/*--------------------------------------------- Add Parent Specification Function ------------------------------------*/
function addParentSpec()
{ 
	var offset2 = $("#frame").offset();
	var w = $(window);
	var parentX = 	(offset2.left-w.scrollLeft());
	var parentY	=	(offset2.top-w.scrollTop());
	
	var parentWdth	=	$("#frame").width();
	var parentHght	=	$("#frame").height();
	var rgb	=	$("#frame").css("background-color");
	
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    var parentBgClr = hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);

	
	var parentName	=	$("#sepcName").val();
	var pBgImgName	=	$("#pBgImgName").val();
	var dataString	=	'parentWdth='+parentWdth+'&parentHght='+parentHght+'&parentBgClr='+parentBgClr+'&parentName='+parentName+'&pBgImgName='+pBgImgName+'&parentX='+parentX+'&parentY='+parentY;
	$.ajax({
		type: "POST",
		url: "Ajax/addParSpec.php",
		cache: false,
		data: dataString,
		success: function(data) { 
			$('#specfcatnDiv').html(data);
			$('#specLoader').hide();
			$('#sepcWdth').attr("disabled", true);
			$('#sepcHght').attr("disabled", true);
		}
	});
}
/*------------------------------------ OnChange Function ------------------------------------------------*/
function chngeParSpec()
{
	var offset2 = $("#frame").offset();
	var w = $(window);
	var parentX = 	(offset2.left-w.scrollLeft());
	var parentY	=	(offset2.top-w.scrollTop());
	
	$('#specLoader').show();
	var bColor		=	$('#sepcBgColor').val();
	var parentWdth	=	$("#sepcWdth").val();
	var parentHght	=	$("#sepcHght").val();
	var parentName	=	$("#sepcName").val();
	var pBgImgName	=	$("#pBgImgName").val();
	if(pBgImgName != ""){ $('#frame').css("background","url('images/parent/"+pBgImgName+"')no-repeat"); }
	else{$("#frame").css("background",'#'+bColor);}
	
	var dataString	=	'parentWdth='+parentWdth+'&parentHght='+parentHght+'&parentBgClr='+bColor+'&parentName='+parentName+'&pBgImgName='+pBgImgName+'&parentX='+parentX+'&parentY='+parentY;
	$.ajax({
		type: "POST",
		url: "Ajax/addParSpec.php",
		cache: false,
		data: dataString,
		success: function(data) { 
			$('#specfcatnDiv').html(data);
			$('#specLoader').hide();
			$('#sepcWdth').attr("disabled", true);
			$('#sepcHght').attr("disabled", true);
		}
	});
}
/*------------------------------------- On click On Frame Function ------------------------------*/
function showParSpec()
{
	//$('#frame').click( function(event) {
		//if(event.target.id == 'frame')
		//{
			$.ajax({
				type: "POST",
				url: "Ajax/showParSpec.php",
				cache: false,
				success: function(data) { 
					$('#specfcatnDiv').html(data);
				}
			});
		//}
	//});
}
/*------------------------------------------- Set Image To Frame Background --------------------------------*/
function ParntBgImgURL(upload_field) { 
	if (upload_field.files && upload_field.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) { 
			$('#frame').css("background","url('"+e.target.result+"')no-repeat");
			$('#frame').css("background-size","cover");
		};
		reader.readAsDataURL(upload_field.files[0]);
	}
/*---------------------------------------------- Upload Image To Server Script --------------------------------*/
	var re_text = /\.jpg|\.gif|\.jpeg/i;
	var filename = upload_field.value;
	if (filename.search(re_text) == -1) {
		alert("File should be either jpg or gif or jpeg");
		//upload_field.form.reset();
		var bColor		=	$('#sepcBgColor').val();
		$("#frame").css("background",bColor);
		return false;
	}
	upload_field.form.action = 'uploadParentImg.php';
	upload_field.form.target = 'upload_iframe';
	upload_field.form.submit();
	upload_field.form.action = '';
	upload_field.form.target = '';
	document.getElementById('pBgImgName').value = filename;
	chngeParSpec();
}
/********************************************************************************************************************
											PARENT FUNCTIONS ENDS
*********************************************************************************************************************/


/********************************************************************************************************************
											CHILD FUNCTION START
*********************************************************************************************************************/

/*----------------------------------- Get Child Cordinates Function ---------------------------------*/
function calCordinates(parentX,parentY,counter,childType)
{	
	//$("#clonediv"+counter).click(function(){showChildSpec(counter)});
	var offset 	= 	$("#clonediv"+counter).offset();
	var w = $(window);
	var width	=	$("#clonediv"+counter).width();
	var height	=	$("#clonediv"+counter).height();
	var	insideX1	=	parseFloat(offset.left-w.scrollLeft())-parseFloat(parentX);
	var	insideY1	=	parseFloat(offset.top-w.scrollTop())-parseFloat(parentY);
	var	insideX2	=	parseFloat(insideX1)+parseFloat(width);
	var	insideY2	=	parseFloat(insideY1)+parseFloat(height);
	var corData	=	("(x1,y1) => "+insideX1+","+insideY1 +" || (x2,y1)==>" +insideX2+","+insideY1 +" || (x1,y2)==>" +insideX1+","+insideY2 +" || (x2,y2)==>" +insideX2+","+insideY2);
	$("#div_id").data("data",{pX:parentX,pY:parentY,cX:insideX1,cY:insideY1,cW:width,cH:height});
	addChildSpec(width,height,counter,insideX1,insideY1,childType);
	
	$("#chldImg"+counter).attr({width: width});
	$("#chldImg"+counter).attr({height: height});
	return corData;
	
}
/*----------------------------------------- Add Child Specification ----------------------------------------------*/
function addChildSpec(childWdth,childHeght,counter,chldX,chldY,childType)
{ 
	$('#specLoader').show();
	var childImgPath	=	$('input#chldImgName'+counter).val();
	var childText		=	$('textarea#chldTxt'+counter).val();
	var childTextClr	=	$('select#chldTxtClr'+counter).val();
	var childTextSize	=	$('select#chldTxtSize'+counter).val(); 
	var childVdoPath	=	$('input#childVdoPath'+counter).val(); 
	var childRefLink	=	$('input#childRefLink'+counter).val(); 
	var childRefPath	=	$('input#chldRefBgImg'+counter).val(); 
	var dataString		=	'childWdth='+childWdth+'&childHght='+childHeght+'&chldCnt='+counter+'&chldX='+chldX+'&chldY='+chldY+'&childType='+childType+'&childImgPath='+childImgPath+'&childText='+childText
						+'&childTextClr='+childTextClr+'&childTextSze='+childTextSize+'&childVdoPath='+childVdoPath+'&childRefLink='+childRefLink+'&childRefPath='+childRefPath;
	
	$.ajax({
		type: "POST",
		url: "Ajax/addChldSpec.php",
		cache: false,
		data: dataString,
		success: function(data) { 
			$('#specfcatnDiv').html(data);
			$('#specLoader').hide();
		}
	});
}
/*------------------------------------- On Change Function ----------------------------------------------*/
function chngChldSpec(chldCunt,childType)
{	
	var childWdth	=	parseFloat($('input#chldWdth').val());
	$("#clonediv"+chldCunt).css("width",childWdth);
	var childHeght	=	parseFloat($('input#chldHght').val());
	$("#clonediv"+chldCunt).css("height",childHeght);
	
	if(childType == 2){
		$('#chldImg'+chldCunt).css("width",childWdth);
		$('#chldImg'+chldCunt).css("height",childHeght);
	}
	if(childType == 3){	
		$("#chldVdO"+chldCnt).attr({width: childWdth});
		$("#chldVdO"+chldCnt).attr({height: childWdth});
	}
	if(childType == 4){
		$('#chldRefImg'+chldCunt).css("width",childWdth);
		$('#chldRefImg'+chldCunt).css("height",childHeght);
	}
	
	var childX			=	parseFloat($('input#childX').val());
	var childY			=	parseFloat($('input#childY').val());
	
	addChildSpec(childWdth,childHeght,chldCunt,childX,childY,childType);
}
/*------------------------------------ OnClick of Child Div function --------------------------------------*/
function showChildSpec(counter)
{	
	var dataStrng	=	'cunt='+counter;
	$.ajax({
		type: "POST",
		url: "Ajax/showChldSpec.php",
		cache: false,
		data: dataStrng,
		success: function(data) { 
			$('#specfcatnDiv').html(data);
		}
	});
}
/*------------------------------------- Text Child Function -------------------------------------------*/
function changeChildText(chldCunt,childType)
{	
	var childText	=	$('textarea#chldTxt'+chldCunt).val();
	$("#clonediv"+chldCunt).html(childText);
	
	var childWdth	=	parseFloat($('input#chldWdth').val());
	var childHeght	=	parseFloat($('input#chldHght').val());
	var childX		=	parseFloat($('input#childX').val());
	var childY		=	parseFloat($('input#childY').val());
	addChildSpec(childWdth,childHeght,chldCunt,childX,childY,childType);
}

function changeChildTextClr(chldCunt,childType)
{
	var textColor	=	$('select#chldTxtClr'+chldCunt).val();
	if(textColor != ""){
		$("#clonediv"+chldCunt).css("color",'#'+textColor);
	}
	else{
		textColor	=	'#000';
		$("#clonediv"+chldCunt).css("color",textColor);
	}
	
	var childWdth	=	parseFloat($('input#chldWdth').val());
	var childHeght	=	parseFloat($('input#chldHght').val());
	var childX		=	parseFloat($('input#childX').val());
	var childY		=	parseFloat($('input#childY').val());
	addChildSpec(childWdth,childHeght,chldCunt,childX,childY,childType);
}
function changeChildTextSize(chldCunt,childType)
{ 
	var textSize	=	$('select#chldTxtSize'+chldCunt).val();
	if(textSize != ""){
		var textSizeV	=	textSize+'px';
		$("#clonediv"+chldCunt).css("font-size",textSizeV);
	}
	else{
		var textSizeV	=	'8px';
		$("#clonediv"+chldCunt).css("font-size",textSizeV);
	}
	var childWdth	=	parseFloat($('input#chldWdth').val());
	var childHeght	=	parseFloat($('input#chldHght').val());
	var childX		=	parseFloat($('input#childX').val());
	var childY		=	parseFloat($('input#childY').val());
	addChildSpec(childWdth,childHeght,chldCunt,childX,childY,childType);
}
function changeFntWght(fontWght,chldCunt,childType)
{
	if(fontWght == 1)
	{	
		if($("#clonediv"+chldCunt).css("font-weight") == '700'){$("#clonediv"+chldCunt).css("font-weight",'normal');}
		else{$("#clonediv"+chldCunt).css("font-weight",'bold')};
	}
	if(fontWght == 2)
	{	
		if($("#clonediv"+chldCunt).css("font-style") == 'italic'){$("#clonediv"+chldCunt).css("font-style",'normal');}
		else{$("#clonediv"+chldCunt).css("font-style",'Italic')};
	}
	if(fontWght == 3)
	{	
		if($("#clonediv"+chldCunt).css("text-decoration") == 'underline'){$("#clonediv"+chldCunt).css("text-decoration",'none');}
		else{$("#clonediv"+chldCunt).css("text-decoration",'underline')};
	}
}
/*------------------------------------------- Set Image To Child Background --------------------------------*/
function ChldBgImgURL(upload_field,chldCunt,childType) { 
	if (upload_field.files && upload_field.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) { 
			var img = new Image();
			var chldWdth	=	$('#chldWdth').val();
			var chldHght	=	$('#chldHght').val();
			$('chldImg'+chldCunt).addClass('source-image');
			var ImgTag		=	'<img id="chldImg'+chldCunt+'" src="'+e.target.result+'" class="source-image" />';
			$('#clonediv'+chldCunt).html(ImgTag);
			$("#chldImg"+chldCunt).attr({width: chldWdth});
			$("#chldImg"+chldCunt).attr({height: chldHght});
		};
		reader.readAsDataURL(upload_field.files[0]);
	}
	/*---------------------------------------------- Upload Image To Server Script --------------------------------*/
	var re_text = /\.jpg|\.gif|\.jpeg/i;
	var filename = upload_field.value;
	if (filename.search(re_text) == -1) {
		alert("File should be either jpg or gif or jpeg");
		var bColor		=	$('#sepcBgColor').val();
		$("#frame").css("background",bColor);
		return false;
	}
	upload_field.form.action = 'uploadChildImg.php';
	upload_field.form.target = 'upload_iframe';
	upload_field.form.submit();
	upload_field.form.action = '';
	upload_field.form.target = '';
	document.getElementById('chldImgName'+chldCunt).value = filename;
	
	var childWdth	=	parseFloat($('input#chldWdth').val());
	var childHeght	=	parseFloat($('input#chldHght').val());
	var childX		=	parseFloat($('input#childX').val());
	var childY		=	parseFloat($('input#childY').val());
	addChildSpec(childWdth,childHeght,chldCunt,childX,childY,childType);
}
function ChldRefBgImgURL(upload_field,chldCunt,childType)
{
	if (upload_field.files && upload_field.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) { 
			var img = new Image();
			var chldWdth	=	$('#chldWdth').val();
			var chldHght	=	$('#chldHght').val();
			var ImgTag		=	'<img id="chldRefImg'+chldCunt+'" src="'+e.target.result+'" class="source-image" />';
			$('#clonediv'+chldCunt).html(ImgTag);
			$("#chldRefImg"+chldCunt).attr({width: chldWdth});
			$("#chldRefImg"+chldCunt).attr({height: chldHght});
		};
		reader.readAsDataURL(upload_field.files[0]);
	}
	/*---------------------------------------------- Upload Image To Server Script --------------------------------*/
	var re_text = /\.jpg|\.gif|\.jpeg/i;
	var filename = upload_field.value;
	if (filename.search(re_text) == -1) {
		alert("File should be either jpg or gif or jpeg");
		$('#clonediv'+chldCunt).html('');
		return false;
	}
	upload_field.form.action = 'uploadChildRefImg.php';
	upload_field.form.target = 'upload_iframe';
	upload_field.form.submit();
	upload_field.form.action = '';
	upload_field.form.target = '';
	document.getElementById('chldRefBgImg'+chldCunt).value = filename;
	
	var childWdth	=	parseFloat($('input#chldWdth').val());
	var childHeght	=	parseFloat($('input#chldHght').val());
	var childX		=	parseFloat($('input#childX').val());
	var childY		=	parseFloat($('input#childY').val());
	addChildSpec(childWdth,childHeght,chldCunt,childX,childY,childType);
}
/*------------------------------------- Function to change Child Video ----------------------------------*/
function changeChildVdo(chldCnt,childType)
{
	var childWdth	=	parseFloat($('input#chldWdth').val());
	var childHeght	=	parseFloat($('input#chldHght').val());
	var childVdo	=	$('input#childVdoPath'+chldCnt).val();
	var chldVdoFrm	=	"<video width='200' height='100' controls autoplay><source src="+childVdo+" type='video/ogg'> <source src="+childVdo+" type='video/mp4'><source src="+childVdo+" type='video/wmv'><object data="+childVdo+" width='320' height='240'><embed width='320' height='240' src='movie.swf'> </object></video>";
	//<iframe src="'+childVdo+'" frameborder="0" id="chldVdO'+chldCnt+'"></iframe>';
	$("#clonediv"+chldCnt).html(chldVdoFrm);
	$("#chldVdO"+chldCnt).attr({width: childWdth});
	$("#chldVdO"+chldCnt).attr({height: childHeght});
	
	
	var childX		=	parseFloat($('input#childX').val());
	var childY		=	parseFloat($('input#childY').val());
	addChildSpec(childWdth,childHeght,chldCnt,childX,childY,childType);
}

/********************************************************************************************************************
											CHILD FUNCTION ENDS
*********************************************************************************************************************/

/********************************************************************************************************************
											SAVE SLIDE FUNCTION STARTS
**********************************************************************************************************************/
function slideSaveCall()
{ 
	//document.getElementById("frame").disabled = true;
	//document.getElementById("rightDiv").disabled = true;
	var chldCunter	=	$('input#chldCnt').val();
	//var prntId	=	$('input#prntId').val();
	
	var dataStrng	=	'chldCunter='+chldCunter;
	
   // alert(dataStrng)
	$.ajax({
		type: "POST",
		url: "Ajax/saveSlideProcess.php",
		cache: false,
		data:dataStrng,
		success: function(data) { 
			setTimeout("window.location='add_slide.php?id="+btoa(data)+"'",300);
		}
	});
}

/**************************** function to generate an XML file*******************/
function saveDta()
{
	var parntX	=	$('#div_id').data("data").pX;
	var parntX	=	$('#div_id').data("data").pY;	
	var chldX	=	$('#div_id').data("data").cX;
	var chldY	=	$('#div_id').data("data").cY;
	var chldWd	=	$('#div_id').data("data").cW;
	var chldHg	=	$('#div_id').data("data").cH;			
	var dataString	=	"chldX="+chldX+"&chldY="+chldY+"&chldWd="+chldWd+"&chldHg="+chldHg;
	$.ajax({
		type: "POST",
		url: "slideXml.php",
		cache: false,
		data: dataString,
		success: function(data) {alert('sucess')
		}
	});
}
