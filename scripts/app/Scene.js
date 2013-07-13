define(
'app/Scene',
[
	'app/gameState',
	'jquery',
	'app/Viewport',
	'app/sceneElements/Player',
	'app/sceneElements/Ball',
	'app/behaviours/GravityBehaviour',
	'app/behaviours/GroundBehaviour',
	'app/behaviours/player/PlayerMovementBehaviour',
	'app/behaviours/player/PlayerGroundBehaviour',
	'app/behaviours/player/PlayerBallCollisionBehaviour',
	'app/util'
],
function(
	gameState,
	$,
	Viewport,
	Player,
	Ball,
	GravityBehaviour,
	GroundBehaviour,
	PlayerMovementBehaviour,
	PlayerGroundBehaviour,
	PlayerBallCollisionBehaviour,
	util
) {

	var HEIGHT = 360;
	var WIDTH = 640;

	function Scene(options) {
		this.resources = options.resources;
		this.initViewport(options.htmlCanvas);
		this.initBalls();
		this.initPlayer();
	}

	$.extend(Scene.prototype, {
		initViewport: function(htmlCanvas) {
			this.viewport = new Viewport({
				htmlCanvas: htmlCanvas,
				height: HEIGHT,
				width: WIDTH
			});
			gameState.on('viewport/tap', $.proxy(this.addBall, this));
		},

		initBalls: function() {
			this.balls = [];
			this.movementPhaseBehaviours = [
				new GravityBehaviour({gravityFactor: 0.1})
			];
			this.collisionPhaseBehaviours = [
				new GroundBehaviour(HEIGHT - 20)
			];
		},

		initPlayer: function() {
			this.player = new Player({
				resources: this.resources,
				movementPhaseBehaviours: [new PlayerMovementBehaviour(), new GravityBehaviour({gravityFactor: 0.8})],
				collisionPhaseBehaviours: [new PlayerGroundBehaviour(HEIGHT - 20), new PlayerBallCollisionBehaviour()]
			});
			this.resetPlayer();
		},

		reset: function() {
			this.resetBalls();
			this.resetPlayer();
		},

		resetBalls: function() {
			while (this.balls.length) {
				this.balls.shift().destroy();
			}
			gameState.balls = this.balls.length;
		},

		resetPlayer: function() {
			this.player.resetAt({
				sceneX: this.viewport.getSceneX((this.viewport.viewportWidth / 2) + this.player.bounds.l),
				sceneY: 0
			});
		},

		addBall: function(options) {
			var b = new Ball({
				sceneX: options.sceneX,
				sceneY: options.sceneY,
				vx: (Math.random() - 0.5) * 5,
				vy: (Math.random() * 4) - 5,
				movementPhaseBehaviours: this.movementPhaseBehaviours,
				collisionPhaseBehaviours: this.collisionPhaseBehaviours,
				colour: {
					fill: {
						r: util.getRandomInt(0,255),
						g: util.getRandomInt(0,255),
						b: util.getRandomInt(0,255),
						a: 0.5
					}
				},
				radius: util.getRandomInt(5,30)
			});
			this.balls.push(b);
			gameState.balls = this.balls.length;
		},

		removeBall: function() {
			this.balls.shift().destroy();
			gameState.balls = this.balls.length;
		},

		doActionPhase: function() {
			if (Math.random() < 0.01) {
				this.addBall({
					sceneX: this.viewport.getSceneX((this.viewport.viewportWidth / 2) + this.player.bounds.l),
					sceneY: util.getRandomInt(50, HEIGHT - 100)
				});
			}

			if (this.balls.length > 50) {
				this.removeBall();
			}
		},

		animate: function() {
			this.viewport.clear();

			// Movement phase
			this.balls.forEach(function(ball){
				ball.doMovementPhase();
			}, this);
			this.player.doMovementPhase();

			// Collision phase
			this.balls.forEach(function(ball){
				ball.doCollisionPhase();
			}, this);
			this.player.doCollisionPhase({
				balls:this.balls
			});

			// Action phase
			this.doActionPhase();
			this.balls.forEach(function(ball){
				ball.doActionPhase();
			}, this);
			this.player.doActionPhase();

			// Draw phase
			this.viewport.keepInView(this.player);
			this.balls.forEach(function(ball){
				ball.draw(this.viewport);
			}, this);
			this.player.draw(this.viewport);
		}

	});

	return Scene;
});
