define(
'app/Canvas',
['jquery'],
function($){
	var Canvas = function(id, height, width){
		var el = document.getElementById(id);
		this.context = el.getContext('2d');
		this.height = el.height = height;
		this.width = el.width = width;
		this.viewportWidth = width;
		this.viewportHeight = height;
	};

	$.extend(Canvas.prototype, {
		clear: function() {
			this.context.fillStyle = "rgba(255,255,100,0.2)";
			this.context.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
		}
	});

	return Canvas;
});