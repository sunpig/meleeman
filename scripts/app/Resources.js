define(
'app/Resources',
[
	'app/gameState',
	'jquery'
],
function(
	gameState,
	$
) {

	function Resources(options) {
	}

	$.extend(Resources.prototype, {
		init: function(options) {
			this.playerImg = new Image();
			this.playerImg.src = 'resources/img/player/standing-face-right.png';
			$(this.playerImg).on('load', $.proxy(this.onPlayerImgLoaded, this));
		},

		onPlayerImgLoaded: function() {
			gameState.trigger('resources/loaded');
		}
	});

	return Resources;
});
