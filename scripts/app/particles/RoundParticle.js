define(
'app/particles/RoundParticle',
[
	'jquery',
	'app/SceneElement'
],
function($, SceneElement){

	function RoundParticle (options) {
		SceneElement.apply(this, arguments);
		this.radius = options.radius || 5;
		this.bounds = {t:this.radius,r:this.radius,b:this.radius,l:this.radius};
	}
	RoundParticle.prototype = Object.create(SceneElement.prototype);
	RoundParticle.prototype.constructor = RoundParticle;

	$.extend(RoundParticle.prototype, {
		draw: function(viewport) {
			var context = viewport.graphicsContext;
			var viewportX = viewport.getViewportX(this.sceneX);
			var viewportY = viewport.getViewportY(this.sceneY);

			// Only need to draw when then particle is in view
			if ( ((viewportX + this.radius) > 0) && ((viewportX - this.radius) < viewport.viewportWidth) ) {
				context.fillStyle = this.fillStyle;
				context.beginPath();
				context.arc(viewportX, viewportY, this.radius, 2 * Math.PI, false);
				context.closePath();
				context.fill();
			}
		}

	});

	return RoundParticle;
});