define(
'app/behaviours/GroundBehaviour',
[
	'jquery',
	'app/Behaviour'
],
function($, Behaviour){

	function GroundBehaviour (groundY) {
		this.groundY = groundY;
		Behaviour.apply(this, arguments);
	}
	GroundBehaviour.prototype = Object.create(Behaviour.prototype);
	GroundBehaviour.prototype.constructor = GroundBehaviour;

	$.extend(GroundBehaviour.prototype, {
		updateSceneElement: function(sceneElement) {
			var lowerExtent = sceneElement.bounds.b;
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

	return GroundBehaviour;
});