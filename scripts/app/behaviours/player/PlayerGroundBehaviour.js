define(
'app/behaviours/player/PlayerGroundBehaviour',
[
	'jquery',
	'app/Behaviour'
],
function($, Behaviour){

	function PlayerGroundBehaviour (groundY) {
		this.groundY = groundY;
		Behaviour.apply(this, arguments);
	}
	PlayerGroundBehaviour.prototype = Object.create(Behaviour.prototype);
	PlayerGroundBehaviour.prototype.constructor = PlayerGroundBehaviour;

	$.extend(PlayerGroundBehaviour.prototype, {
		updateSceneElement: function(player) {
			var lowerExtent = player.bounds.b;
			if ((player.nexty + lowerExtent) >= this.groundY && player.vy > 0) {
				player.nexty = (this.groundY - lowerExtent);

				player.jumping = false;
			}
		}
	});

	return PlayerGroundBehaviour;
});