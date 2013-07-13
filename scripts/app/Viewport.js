define(
'app/Viewport',
[
	'app/game',
	'app/gameState',
	'jquery'
],
function(game, gameState, $){
	var Viewport = function(options){
		this.htmlCanvas = options.htmlCanvas;
		this.graphicsContext = this.htmlCanvas.getContext('2d');

		this.htmlCanvas.height = options.height;
		this.htmlCanvas.width = options.width;

		this.viewportHeight = options.height;
		this.viewportWidth = options.width;

		this.sceneOffsetX = 0;
		this.sceneOffsetY = 0;

		this.listen();
	};

	$.extend(Viewport.prototype, {
		listen: function() {
			$(this.htmlCanvas).on('click', $.proxy(this.onClick, this));
		},

		onClick: function(e) {
			e.preventDefault();
			var viewportX, viewportY;
			var sceneX, sceneY;

			if (e.offsetX) {
				viewportX = e.offsetX;
				viewportY = e.offsetY;
			} else {
				// Firefox doesn't have the offsetX and offsetY properties
				viewportX = e.pageX - $(e.target).offset().left;
				viewportY = e.pageY - $(e.target).offset().top;
			}

			sceneX = this.getSceneX(viewportX);
			sceneY = this.getSceneY(viewportY);
			gameState.trigger('viewport/tap', [{sceneX:sceneX, sceneY:sceneY}]);
		},

		clear: function() {
			var ctx = this.graphicsContext;
			ctx.fillStyle = "rgba(255,255,100,0.2)";
			ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
		},

		left: function() {
			this.sceneOffsetX -= 20;
		},

		right: function() {
			this.sceneOffsetX += 20;
		},

		getSceneX: function(viewportX) {
			return viewportX - this.sceneOffsetX;
		},

		getViewportX: function(sceneX) {
			return sceneX + this.sceneOffsetX;
		},

		getSceneY: function(viewportY) {
			return viewportY - this.sceneOffsetY;
		},

		getViewportY: function(sceneY) {
			return sceneY + this.sceneOffsetY;
		},

		keepInView: function(player) {
			var leftViewportBoundary = 20;
			var rightViewportBoundary = this.viewportWidth - 20;

			var playerViewportX = this.getViewportX(player.sceneX);
			var playerLeftExtent = playerViewportX - player.bounds.l;
			var playerRightExtent = playerViewportX + player.bounds.r;

			if (playerLeftExtent < leftViewportBoundary) {
				this.sceneOffsetX += (leftViewportBoundary - playerLeftExtent);
			} else if (playerRightExtent > rightViewportBoundary) {
				this.sceneOffsetX -= (playerRightExtent - rightViewportBoundary);
			}
		}
	});

	return Viewport;
});