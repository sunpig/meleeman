define(
'app/forces/GravityForce',
[
	'jquery',
	'app/forces/Force'
],
function($, Force){

	function GravityForce () {
		Force.apply(this, arguments);
	}
	GravityForce.prototype = Object.create(Force.prototype);
	GravityForce.prototype.constructor = GravityForce;

	$.extend(GravityForce.prototype, {
		updateParticle: function(particle) {
			particle.dvy = 0.2;
		}
	});

	return GravityForce;
});