define(
'app/forces/StaticFrictionForce',
[
	'jquery',
	'app/forces/Force'
],
function($, Force){

	function StaticFrictionForce (groundY) {
		this.groundY = groundY;
		Force.apply(this, arguments);
	}
	StaticFrictionForce.prototype = Object.create(Force.prototype);
	StaticFrictionForce.prototype.constructor = StaticFrictionForce;

	$.extend(StaticFrictionForce.prototype, {
		updateParticle: function(particle) {
			if (Math.sqrt(Math.pow(particle.vy, 2) + Math.pow(particle.vx, 2)) < 0.3) {
				particle.vx = 0;
				particle.vy = 0;
			}
		}
	});

	return StaticFrictionForce;
});