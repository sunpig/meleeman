define(
'app/behaviours/GravityBehaviour',
[
	'jquery',
	'app/Behaviour'
],
function($, Behaviour){

	function GravityBehaviour (options) {
		Behaviour.apply(this, arguments);
		options = options || {};
		this.gravityFactor = options.gravityFactor || 0.3;
	}
	GravityBehaviour.prototype = Object.create(Behaviour.prototype);
	GravityBehaviour.prototype.constructor = GravityBehaviour;

	$.extend(GravityBehaviour.prototype, {
		updateSceneElement: function(sceneElement) {
			sceneElement.vy += this.gravityFactor;
		}
	});

	return GravityBehaviour;
});