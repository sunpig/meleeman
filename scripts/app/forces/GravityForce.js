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
		updateSceneElement: function(sceneElement) {
			sceneElement.dvy = 0.3;
		}
	});

	return GravityForce;
});