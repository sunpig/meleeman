define(
'app/game',
[
	'app/gameEvents',
	'app/Scene',
	'app/Controls'
],
function(
	gameEvents,
	Scene,
	Controls
) {
	var _scene = null;
	var _raf = null;

	function pause() {
		if (_raf) {
			suspendAnimation();
			gameEvents.trigger('game/paused');
		} else {
			animate();
			gameEvents.trigger('game/resumed');
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
	}

	function animate() {
		_raf = window.requestAnimationFrame(animate);
		_scene.animate();
	}

	var game = {
		init: function(id) {
			var gameContainer = document.getElementById('game');
			if (gameContainer) {
				var sceneCanvas = document.createElement('canvas');
				sceneCanvas.className = 'scene';
				gameContainer.appendChild(sceneCanvas);
				_scene = new Scene(sceneCanvas);

				var controlsContainer = document.createElement('div');
				controlsContainer.className = 'controls';
				gameContainer.appendChild(controlsContainer);
				_controls = new Controls(controlsContainer);

				animate();

				gameEvents.on('controls/pause', pause);
				gameEvents.on('controls/reset', reset);
			}
		}
	};

	return game;
});
