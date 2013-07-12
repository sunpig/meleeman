define(
'app/Scene',
[
	'app/gameState',
	'jquery',
	'app/Canvas',
	'app/particles/RoundParticle',
	'app/particles/RectangleParticle',
	'app/behaviours/GravityBehaviour',
	'app/behaviours/GroundBehaviour',
	'app/util'
],
function(
	gameState,
	$,
	Canvas,
	RoundParticle,
	RectangleParticle,
	GravityBehaviour,
	GroundBehaviour,
	util
) {

	var HEIGHT = 360;
	var WIDTH = 640;

	function Scene(el) {
		this.initCanvas(el);
		this.initParticles();
	}

	$.extend(Scene.prototype, {
		initCanvas: function(el) {
			this.canvas = new Canvas({
				el: el,
				height: HEIGHT,
				width: WIDTH
			});
			gameState.on('canvas/tap', $.proxy(this.addParticle, this));
		},

		initParticles: function() {
			this.particles = [];
			this.movementPhaseBehaviours = [
				new GravityBehaviour()
			];
			this.collisionPhaseBehaviours = [
				new GroundBehaviour(HEIGHT - 20)
			];
		},

		reset: function() {
			this.resetParticles();
		},

		resetParticles: function() {
			var i = this.particles.length;
			while (i--) {
				this.particles[i].destroy();
				this.particles.pop();
			}
			gameState.particles = this.particles.length;
		},

		addParticle: function(options) {
			var p = new RoundParticle({
				x: options.x,
				y: options.y,
				vx: (Math.random() - 0.5) * 5,
				vy: (Math.random() * 7) - 10,
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
			this.canvas.clear();
			this.particles.forEach(function(particle){
				particle.doMovementPhase();
			}, this);
			this.particles.forEach(function(particle){
				particle.doCollisionPhase();
			}, this);
			this.particles.forEach(function(particle){
				particle.doActionPhase();
			}, this);
			this.particles.forEach(function(particle){
				particle.draw(this.canvas);
			}, this);
		}

	});

	return Scene;
});
