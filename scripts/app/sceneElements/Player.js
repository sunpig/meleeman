define(
'app/sceneElements/Player',
[
	'jquery',
	'app/SceneElement'
],
function($, SceneElement){

	function Player (options) {
		SceneElement.apply(this, arguments);
		this.resources = options.resources;
		this.bounds = {t:13,r:8,b:15,l:8};
		this.jumping = false;
	}
	Player.prototype = Object.create(SceneElement.prototype);
	Player.prototype.constructor = Player;

	$.extend(Player.prototype, {
		draw: function(viewport) {
			var context = viewport.graphicsContext;
			var viewportX = viewport.getViewportX(this.sceneX);
			var viewportY = viewport.getViewportY(this.sceneY);

			var playerImg = this.resources.playerImg;

			context.drawImage(playerImg, viewportX - 25, viewportY - 25);
		},

		resetAt: function(scenePosition) {
			this.sceneX = scenePosition.sceneX;
			this.sceneY = scenePosition.sceneY;
			this.vx = 0;
			this.vy = 0;
			this.jumping = false;
		}

	});

	return Player;
});