define(
'app/particles/RoundParticle',
[
	'jquery',
	'app/SceneElement'
],
function($, SceneElement){

	function RoundParticle (options) {
		this.radius = options.radius || 5;
		SceneElement.apply(this, arguments);
	}
	RoundParticle.prototype = Object.create(SceneElement.prototype);
	RoundParticle.prototype.constructor = RoundParticle;

	$.extend(RoundParticle.prototype, {
		draw: function(canvas) {
			var context = canvas.context;
			context.fillStyle = this.fillStyle;
			context.beginPath();
			context.arc(canvas.getX(this.x), canvas.getY(this.y), this.radius, 2 * Math.PI, false);
			context.closePath();
			context.fill();
		},

		getBounds: function(){
			return {t:this.radius,r:this.radius,b:this.radius,l:this.radius};
		}
	});

	return RoundParticle;
});