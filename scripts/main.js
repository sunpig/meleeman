requirejs.config({
    baseUrl: 'scripts',
    urlArgs: "bust=" + (new Date()).getTime(), /* cache-buster for dev */
    paths: {
        jquery: 'lib/jquery-2.0.3.min',
        EventEmitter: 'lib/EventEmitter-4.1.1.min'
    }
});

require([
	'app/game'
],
function(
	game
) {
	game.init();
});
