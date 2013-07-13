define(
'app/Scene',
[
	'app/gameState',
	'jquery',
	'app/Viewport',
	'app/Player',
	'app/particles/RoundParticle',
	'app/particles/RectangleParticle',
	'app/behaviours/GravityBehaviour',
	'app/behaviours/GroundBehaviour',
	'app/behaviours/player/PlayerMovementBehaviour',
	'app/behaviours/player/PlayerGroundBehaviour',
	'app/util'
],
function(
	gameState,
	$,
	Viewport,
	Player,
	RoundParticle,
	RectangleParticle,
	GravityBehaviour,
	GroundBehaviour,
	PlayerMovementBehaviour,
	PlayerGroundBehaviour,
	util
) {

	var HEIGHT = 360;
	var WIDTH = 640;

	function Scene(options) {
		this.resources = options.resources;
		this.initViewport(options.htmlCanvas);
		this.initParticles();
		this.initPlayer();
	}

	$.extend(Scene.prototype, {
		initViewport: function(htmlCanvas) {
			this.viewport = new Viewport({
				htmlCanvas: htmlCanvas,
				height: HEIGHT,
				width: WIDTH
			});
			gameState.on('viewport/tap', $.proxy(this.addParticle, this));
		},

		initParticles: function() {
			this.particles = [];
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
				collisionPhaseBehaviours: [new PlayerGroundBehaviour(HEIGHT - 20)]
			});
			this.resetPlayer();
		},

		reset: function() {
			this.resetParticles();
			this.resetPlayer();
		},

		resetParticles: function() {
			var i = this.particles.length;
			while (i--) {
				this.particles[i].destroy();
				this.particles.pop();
			}
			gameState.particles = this.particles.length;
		},

		resetPlayer: function() {
			this.player.resetAt({
				sceneX: this.viewport.getSceneX((this.viewport.viewportWidth / 2) + this.player.bounds.l),
				sceneY: 0
			});
		},

		addParticle: function(options) {
			var p = new RoundParticle({
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
			this.particles.push(p);
			gameState.particles = this.particles.length;
		},

		animate: function() {
			this.viewport.clear();

			// Movement phase
			this.particles.forEach(function(particle){
				particle.doMovementPhase();
			}, this);
			this.player.doMovementPhase();

			// Collision phase
			this.particles.forEach(function(particle){
				particle.doCollisionPhase();
			}, this);
			this.player.doCollisionPhase();

			// Action phase
			this.particles.forEach(function(particle){
				particle.doActionPhase();
			}, this);
			this.player.doActionPhase();

			// Draw phase
			this.viewport.keepInView(this.player);
			this.particles.forEach(function(particle){
				particle.draw(this.viewport);
			}, this);
			this.player.draw(this.viewport);
		}

	});

	return Scene;
});
