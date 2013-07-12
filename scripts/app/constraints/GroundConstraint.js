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
		updateSceneElement: function(sceneElement) {
			var lowerExtent = sceneElement.getBounds().b;
			if ((sceneElement.nexty + lowerExtent) >= this.groundY && sceneElement.vy > 0) {
				sceneElement.nexty = (this.groundY - lowerExtent);

				// bounce, losing energy
				sceneElement.vy = -0.6 * sceneElement.vy;
				if (Math.abs(sceneElement.vy) < 0.2) {
					sceneElement.vy = 0;
				}

				// lose energy on x-axis as well
				sceneElement.vx = 0.95 * sceneElement.vx;
				if (Math.abs(sceneElement.vx) < 0.1) {
					sceneElement.vx = 0;
				}

			}
		}
	});

	return GroundConstraint;
});