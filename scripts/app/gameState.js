define(
'app/gameState',
[
	'EventEmitter'
],
function(
	EventEmitter
) {
	var gameState = new EventEmitter();

	gameState.particles = 0;
	gameState.running = false;

	return gameState;
});
