define(
'app/particles/RoundParticle',
[
	'jquery',
	'app/particles/Particle'
],
function($, Particle){

	function RoundParticle (options) {
		this.radius = options.radius || 5;
		Particle.apply(this, arguments);
	}
	RoundParticle.prototype = Object.create(Particle.prototype);
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