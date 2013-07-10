define(
'app/game',
[
	'app/Scene'
],
function(
	Scene
) {
	var _scene = null;
	var _raf = null;

	var _$pause = null;
	var _$reset = null;

	function pause() {
		if (_raf) {
			suspendAnimation();
			$pause.text('Resume');
		} else {
			animate();
			$pause.text('Pause');
		}
	}

	function reset() {
		scene.reset();
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
		init: function() {

			_scene = new Scene('c');
			animate();

			_$pause = $('#pause').on('click', pause);
			_$reset = $('#reset').on('click', reset);
		}
	};

	return game;
});

require([
	'app/Scene'
],
function(
	Scene
) {

});
