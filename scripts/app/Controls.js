define(
'app/Controls',
[
	'app/gameState',
	'jquery'
],
function(gameState, $){
	var Controls = function(el){
		this.el = el;
		this.$el = $(el);
		this.init();
	};

	$.extend(Controls.prototype, {
		init: function() {
			this.$leftButton = $('<button>&lt;-</button>').on('click', this.onLeftClick).appendTo(this.$el);
			this.$rightButton = $('<button>-&gt;</button>').on('click', this.onRightClick).appendTo(this.$el);

			this.$pauseButton = $('<button>Pause</button>').on('click', this.onPauseClick).appendTo(this.$el);
			this.$resetButton = $('<button>Reset</button>').on('click', this.onResetClick).appendTo(this.$el);

			gameState.on('game/paused', this.onGamePaused.bind(this));
			gameState.on('game/resumed', this.onGameResumed.bind(this));
		},
		onGamePaused: function() {
			this.$pauseButton.text('Resume');
		},
		onGameResumed: function() {
			this.$pauseButton.text('Pause');
		},
		onPauseClick: function() {
			gameState.trigger('controls/pause');
		},
		onResetClick: function() {
			gameState.trigger('controls/reset');
		},
		onLeftClick: function() {
			gameState.trigger('controls/left');
		},
		onRightClick: function() {
			gameState.trigger('controls/right');
		}
	});

	return Controls;
});