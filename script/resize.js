(function($) {
    $.fn.resize = function(opt) {
		//alert('hi');
		var counter = 0;
		var offset2 = $("#frame").offset();
		var w 		= $(window);
		var parentX = (offset2.left-w.scrollLeft());
		var parentY	= (offset2.top-w.scrollTop());
		opt 		= $.extend({handle:""}, opt);
		
		if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }
		
		return $el.bind({
			hover: function() {
				$(this).css('cursor','all-scroll');
			},
			click:function(e){		
				var focused = 1;
				$el.addClass('drsElement');
				$el.css({"cursor": "default"});
				//$el.addClass('drsMoveHandle');
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
				
				dragresize.ondragfocus = function() { 
					$el.draggable( 'disable' );
				};
				dragresize.ondragstart 	= function(isResize) { };
				dragresize.ondragmove 	= function(isResize) { };
				dragresize.ondragend 	= function(isResize) { 
					var id 	= $el.attr('id');
					counter = id.slice(-1);
					calCordinates(parentX,parentY,counter);
				};
				dragresize.ondragblur = function() {
					$el.draggable( 'enable' );
					$el.css({"cursor": "all-scroll"});
				};
				
				dragresize.apply(document);
			}	
		});			
	};
})(jQuery);