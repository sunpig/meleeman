requirejs.config({
    baseUrl: 'scripts',
    urlArgs: "bust=" + (new Date()).getTime(), /* cache-buster for dev */
    paths: {
        jquery: 'lib/jquery-2.0.3.min'
    }
});

require([
	'app/Scene'
],
function(
	Scene
) {

	var scene = new Scene('c', 300, 500);

	function run() {
		scene.run();
	}

	function pause() {
		scene.pause();
	}

	function reset() {
		scene.reset();
	}

	$('#run').on('click', run);
	$('#pause').on('click', pause);
	$('#reset').on('click', reset);
});
