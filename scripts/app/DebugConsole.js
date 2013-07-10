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
			this.$p.text(txt);
		}
	});

	return DebugConsole;
});