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
			var lowerExtent = particle.getBounds().b;
			if ((particle.nexty + lowerExtent) >= this.groundY && particle.vy > 0) {
				particle.nexty = (this.groundY - lowerExtent);

				// bounce, losing energy
				particle.vy = -0.6 * particle.vy;
				if (Math.abs(particle.vy) < 0.2) {
					particle.vy = 0;
				}

				// lose energy on x-axis as well
				particle.vx = 0.95 * particle.vx;
				if (Math.abs(particle.vx) < 0.1) {
					particle.vx = 0;
				}

			}
		}
	});

	return GroundConstraint;
});