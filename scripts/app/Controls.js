define(
'app/Controls',
[
	'app/gameEvents',
	'jquery'
],
function(gameEvents, $){
	var Controls = function(el){
		this.el = el;
		this.$el = $(el);
		this.init();
	};

	$.extend(Controls.prototype, {
		init: function() {
			this.$pauseButton = $('<button>Pause</button>').on('click', this.onPauseClick).appendTo(this.$el);
			this.$resetButton = $('<button>Reset</button>').on('click', this.onResetClick).appendTo(this.$el);

			gameEvents.on('game/paused', this.onGamePaused.bind(this));
			gameEvents.on('game/resumed', this.onGameResumed.bind(this));
		},
		onGamePaused: function() {
			this.$pauseButton.text('Resume');
		},
		onGameResumed: function() {
			this.$pauseButton.text('Pause');
		},
		onPauseClick: function() {
			gameEvents.trigger('controls/pause');
		},
		onResetClick: function() {
			gameEvents.trigger('controls/reset');
		}
	});

	return Controls;
});