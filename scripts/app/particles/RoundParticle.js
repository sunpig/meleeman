define(
'app/particles/RoundParticle',
[
	'jquery',
	'app/particles/Particle'
],
function($, Particle){

	function RoundParticle (x, y, vx, vy, forces, constraints) {
		Particle.apply(this, arguments);
	}
	RoundParticle.prototype = Object.create(Particle.prototype);
	RoundParticle.prototype.constructor = RoundParticle;

	$.extend(RoundParticle.prototype, {
		draw: function(canvas) {
			var context = canvas.context;
			context.fillStyle = "rgba(255,0,0,0.5)";
			context.beginPath();
			context.arc(this.x, this.y, 5, 2 * Math.PI, false);
			context.closePath();
			context.fill();
		}
	});

	return RoundParticle;
});