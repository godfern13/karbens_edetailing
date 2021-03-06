(function($) {
    $.fn.resize = function(opt) {
		//alert('hi');
		var counter 	= 0;
		//var checkImg	= 0;
		//var index 		= 0;
		var clicked 	= false;
		var offset2 	= $("#frame").offset();
		var w 			= $(window);
		var parentX 	= (offset2.left-w.scrollLeft());
		var parentY		= (offset2.top-w.scrollTop());
		opt 			= $.extend({handle:""}, opt);
		
		if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
		}
		
		
		
		return $el.bind({
			click:function(e){//alert('clicked');
				//showChildSpec(1);
				e.stopPropagation();
				$el.draggable( 'disable' );
				$el.addClass('drsElement');
				$el.css({"cursor": "default","z-index":index});
				var childType1 = $el.hasClass( "text" );
				var childType2 = $el.hasClass( "image" );
				var childType3 = $el.hasClass( "video" );
				var childType4 = $el.hasClass( "ref" );
				
				if(childType1 == true){
					childType = 1;
				}
				else{
					childType1 = false;
				}
				if(childType2 == true){
					childType = 2;
				}
				else{
					childType2 = false;
				}
				if(childType3 == true){
					childType = 3;
				}
				else{
					childType3 = false;
				}
				if(childType4 == true){
					childType = 4;
				}
				else{
					childType4 = false;
				}
				
				$('.drsElement').click(function(e){
					e.stopPropagation();
					$('.selected').removeClass('selected');
					$(this).addClass('selected');
				});
				
				/*--------------------------------------------Drag and Resize--------------------------------------------------------*/
				var dragresize = new DragResize('dragresize', { 
														minWidth: 50, 
														minHeight: 50, 
														minLeft: 186, 
														minTop: 51, 
														maxLeft: 833, 
														Top: 200 
														});
				
				dragresize.isElement = function(elm)
				{
				 if (elm.className && elm.className.indexOf('drsElement') > -1) return true;
				};
				dragresize.isHandle = function(elm)
				{
				 if (elm.className && elm.className.indexOf('drsMoveHandle') > -1) return true;
				};					
				
				dragresize.ondragfocus = function() {};
				dragresize.ondragstart 	= function(isResize) { 					
					 clicked = true; 					
				};
				dragresize.ondragmove 	= function(isResize) {
					var id 	= $el.attr('id');
					counter = id.slice(-1);
					var wi = $el.width();
					var hi = $el.height();
					
					$("#chldImg"+counter).attr({width: wi});
					$("#chldImg"+counter).attr({height: hi});
				};
				//if(clicked == true){
					dragresize.ondragend 	= function(isResize) {
						clicked = true;
						if(clicked == true){
							var id 	= $el.attr('id');
							counter = id.slice(-1);
							//alert('calling in ondragend');
							calCordinates(parentX,parentY,counter,childType);
							clicked = false;
						}
					};
				//}
				dragresize.ondragblur = function() {
					$el.css({"cursor": "all-scroll"});
					$el.draggable( 'enable' );					
				};				
				dragresize.apply(document);
				
			},
			mouseover: function() {
				index = $(this).css("z-index");
				$(this).css('cursor','all-scroll');
			},
			mouseout:function(e){
				$el.css({"z-index":index});
				
			}			
		});		
	};
	
})(jQuery);