define(
'app/behaviours/GravityBehaviour',
[
	'jquery',
	'app/Behaviour'
],
function($, Behaviour){

	function GravityBehaviour () {
		Behaviour.apply(this, arguments);
	}
	GravityBehaviour.prototype = Object.create(Behaviour.prototype);
	GravityBehaviour.prototype.constructor = GravityBehaviour;

	$.extend(GravityBehaviour.prototype, {
		updateSceneElement: function(sceneElement) {
			sceneElement.dvy = 0.3;
		}
	});

	return GravityBehaviour;
});