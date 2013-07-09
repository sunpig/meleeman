define(
'app/constraints/GroundConstraint',
[
	'jquery',
	'app/constraints/Constraint'
],
function($, Constraint){

	function GroundConstraint (groundY) {
		this.groundY = groundY;
		Constraint.apply(this, arguments);
	}
	GroundConstraint.prototype = Object.create(Constraint.prototype);
	GroundConstraint.prototype.constructor = GroundConstraint;

	$.extend(GroundConstraint.prototype, {
		updateParticle: function(particle) {
			if (particle.y > this.groundY && particle.vy > 0) {
				// bounce, losing energy
				particle.vy = -0.6 * particle.vy;
				// lose energy on the x-axis as well
				particle.vx = 0.6 * particle.vx;
			}
		}
	});

	return GroundConstraint;
});