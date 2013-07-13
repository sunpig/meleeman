define(
'app/Controls',
[
	'app/gameState',
	'jquery'
],
function(gameState, $){
	var KEYCODE_MAPPINGS = {
		37: 'PLAYER_MOVE_LEFT', // cursor-left
		65: 'PLAYER_MOVE_LEFT', // A
		39: 'PLAYER_MOVE_RIGHT', // cursor-right
		68: 'PLAYER_MOVE_RIGHT', // D
		38: 'PLAYER_JUMP', // cursor-up
		32: 'PLAYER_JUMP' // space
	};

	var Controls = function(el){
		this.el = el;
		this.$el = $(el);
		this.init();
	};

	$.extend(Controls.prototype, {
		init: function() {
			this.$pauseButton = $('<button>Pause</button>').on('click', this.onPauseClick).appendTo(this.$el);
			this.$resetButton = $('<button>Reset</button>').on('click', this.onResetClick).appendTo(this.$el);

			gameState.on('game/paused', this.onGamePaused.bind(this));
			gameState.on('game/resumed', this.onGameResumed.bind(this));

			$(document).on('keydown', this.onKeydown);
			$(document).on('keyup', this.onKeyup);
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
		onKeydown: function(evt) {
			var keyCodeAction = KEYCODE_MAPPINGS[evt.which];
			if (keyCodeAction) {
				gameState[keyCodeAction] = true;
			}
		},
		onKeyup: function(evt) {
			var keyCodeAction = KEYCODE_MAPPINGS[evt.which];
			if (keyCodeAction) {
				gameState[keyCodeAction] = false;
			}
		}
	});

	return Controls;
});