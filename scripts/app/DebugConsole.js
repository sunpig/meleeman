define(
'app/DebugConsole',
[
	'app/gameState',
	'jquery'
],
function(gameState, $){
	var DebugConsole = function(el){
		this.el = el;
		this.$el = $(el);
		this.init();
	};

	$.extend(DebugConsole.prototype, {
		init: function() {
			this.$p = $('<p>').appendTo(this.$el);
		},

		update: function() {
			var txt = "Particles: " + gameState.particles;
			txt += "; Player move left: " + !!gameState.PLAYER_MOVE_LEFT;
			txt += "; Player move right: " + !!gameState.PLAYER_MOVE_RIGHT;
			this.$p.text(txt);
		}
	});

	return DebugConsole;
});