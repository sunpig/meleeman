requirejs.config({
    baseUrl: 'scripts',
    urlArgs: "bust=" + (new Date()).getTime(), /* cache-buster for dev */
    paths: {
        jquery: 'lib/jquery-2.0.3.min',
        EventEmitter: 'lib/EventEmitter-4.1.1.min'
    }
});

require([
	'app/Scene'
],
function(
	Scene
) {

	var scene = new Scene('c');
	scene.run();

	var $pause = $('#pause');
	var $reset = $('#reset');

	function pause() {
		if (scene.isRunning()) {
			scene.pause();
			$pause.text('Resume');
		} else {
			scene.animate();
			$pause.text('Pause');
		}
	}

	function reset() {
		scene.reset();
	}

	$pause.on('click', pause);
	$reset.on('click', reset);
});
