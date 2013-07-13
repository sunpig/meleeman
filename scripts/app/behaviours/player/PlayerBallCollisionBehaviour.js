define(
'app/behaviours/player/PlayerBallCollisionBehaviour',
[
	'jquery',
	'app/Behaviour'
],
function($, Behaviour){

	function PlayerBallCollisionBehaviour (groundY) {
		Behaviour.apply(this, arguments);
	}
	PlayerBallCollisionBehaviour.prototype = Object.create(Behaviour.prototype);
	PlayerBallCollisionBehaviour.prototype.constructor = PlayerBallCollisionBehaviour;

	$.extend(PlayerBallCollisionBehaviour.prototype, {
		updateSceneElement: function(player, options) {
			var balls = options.balls;
			if (balls && balls.length) {
				// Consider a spherical player of uniform density...
				var playerCentre = {x: player.sceneX, y: player.sceneY};
				var playerRadius = 10;

				balls.forEach(function(ball){
					centreOfMassDistance = Math.sqrt(Math.pow(ball.sceneX - playerCentre.x, 2) + Math.pow(ball.sceneY - playerCentre.y, 2));
					if (centreOfMassDistance < (ball.radius + playerRadius)) {
						// In contact - turn ball red
						ball.setColour({
							fill: {
								r: 255,
								g: 0,
								b: 0,
								a: 0.9
							}
						});
					}
				});
			}
			var lowerExtent = player.bounds.b;
			if ((player.nexty + lowerExtent) >= this.groundY && player.vy > 0) {
				player.nexty = (this.groundY - lowerExtent);

				player.jumping = false;
			}
		}
	});

	return PlayerBallCollisionBehaviour;
});