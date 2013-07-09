define(
'app/Canvas',
[
	'jquery',
	'app/ee'
],
function($, ee){
	var Canvas = function(options){
		this.el = document.getElementById(options.id);
		this.context = this.el.getContext('2d');

		this.el.height = options.height;
		this.el.width = options.width;

		this.viewportHeight = options.height;
		this.viewportWidth = options.width;

		$(this.el).on('click', $.proxy(this.onClick, this));
	};

	$.extend(Canvas.prototype, {
		onClick: function(e) {
			e.preventDefault();
			ee.trigger('canvas/tap', [{x: e.offsetX, y: e.offsetY}]);
		},

		clear: function() {
			this.context.fillStyle = "rgba(255,255,100,0.2)";
			this.context.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
		}
	});

	return Canvas;
});