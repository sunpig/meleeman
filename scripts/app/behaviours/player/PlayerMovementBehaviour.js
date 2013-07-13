define(
'app/behaviours/player/PlayerMovementBehaviour',
[
	'jquery',
	'app/Behaviour',
	'app/gameState'
],
function($, Behaviour, gameState){

	var MAX_VX = 5;
	var X_ACCELERATION = 0.5;

	function PlayerMovementBehaviour () {
		Behaviour.apply(this, arguments);
	}
	PlayerMovementBehaviour.prototype = Object.create(Behaviour.prototype);
	PlayerMovementBehaviour.prototype.constructor = PlayerMovementBehaviour;

	$.extend(PlayerMovementBehaviour.prototype, {
		updateSceneElement: function(player) {
			// X
			if (gameState.PLAYER_MOVE_LEFT) {
				player.vx += -1 * X_ACCELERATION;
				if (Math.abs(player.vx) > Math.abs(MAX_VX)) {
					player.vx = -1 * MAX_VX;
				}
			} else if (gameState.PLAYER_MOVE_RIGHT) {
				player.vx += X_ACCELERATION;
				if (Math.abs(player.vx) > Math.abs(MAX_VX)) {
					player.vx = MAX_VX;
				}
			} else {
				var sign = player.vx > 0 ? -1 : 1;
				player.vx += sign * X_ACCELERATION;
				if (Math.abs(player.vx) < (X_ACCELERATION * 1.1) ) {
					player.vx = 0;
				}
			}

			// Y
			if (gameState.PLAYER_JUMP) {
				if (!player.jumping) {
					player.vy = -15;
					player.jumping = true;
				}
			}
		}
	});

	return PlayerMovementBehaviour;
});