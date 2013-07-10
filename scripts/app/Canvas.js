define(
'app/Canvas',
[
	'app/game',
	'app/gameState',
	'jquery'
],
function(game, gameState, $){
	var Canvas = function(options){
		this.el = options.el;
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
			var x,y;

			if (e.offsetX) {
				x = e.offsetX;
				y = e.offsetY;
			} else {
				x = e.pageX - $(e.target).offset().left;
				y = e.pageY - $(e.target).offset().top;
			}

			gameState.trigger('canvas/tap', [{x:x, y:y}]);
		},

		clear: function() {
			this.context.fillStyle = "rgba(255,255,100,0.2)";
			this.context.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
		}
	});

	return Canvas;
});