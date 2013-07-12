define(
'app/game',
[
	'app/gameState',
	'app/Scene',
	'app/Controls',
	'app/DebugConsole'
],
function(
	gameState,
	Scene,
	Controls,
	DebugConsole
) {
	var _scene = null;
	var _debugConsole = null;
	var _raf = null;

	function pause() {
		if (_raf) {
			suspendAnimation();
			gameState.trigger('game/paused');
		} else {
			animate();
			gameState.trigger('game/resumed');
		}
	}

	function reset() {
		_scene.reset();
	}

	function suspendAnimation() {
		if (_raf) {
			window.cancelAnimationFrame(_raf);
			_raf = null;
		}
		gameState.running = false;
	}

	function animate() {
		_raf = window.requestAnimationFrame(animate);
		_scene.animate();
		_debugConsole.update();
		gameState.running = true;
	}

	var game = {
		init: function(id) {
			var gameContainer = document.getElementById('game');
			if (gameContainer) {
				var htmlCanvas = document.createElement('canvas');
				htmlCanvas.className = 'viewport';
				gameContainer.appendChild(htmlCanvas);
				_scene = new Scene({htmlCanvas: htmlCanvas});

				var controlsContainer = document.createElement('div');
				controlsContainer.className = 'controls';
				gameContainer.appendChild(controlsContainer);
				_controls = new Controls(controlsContainer);

				var debugConsoleContainer = document.createElement('div');
				debugConsoleContainer.className = 'debugconsole';
				gameContainer.appendChild(debugConsoleContainer);
				_debugConsole = new DebugConsole(debugConsoleContainer);

				animate();

				gameState.on('controls/pause', pause);
				gameState.on('controls/reset', reset);
			}
		}
	};

	return game;
});
