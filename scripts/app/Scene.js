define(
'app/Scene',
[
	'app/gameEvents',
	'jquery',
	'app/Canvas',
	'app/particles/RoundParticle',
	'app/particles/RectangleParticle',
	'app/forces/GravityForce',
	'app/constraints/GroundConstraint',
	'app/util'
],
function(
	gameEvents,
	$,
	Canvas,
	RoundParticle,
	RectangleParticle,
	GravityForce,
	GroundConstraint,
	util
) {

	var HEIGHT = 360;
	var WIDTH = 640;

	function Scene(el) {
		this.initCanvas(el);
		this.initDebug();
		this.initParticles();
	}

	$.extend(Scene.prototype, {
		initCanvas: function(el) {
			this.canvas = new Canvas({
				el: el,
				height: HEIGHT,
				width: WIDTH
			});
			gameEvents.on('canvas/tap', $.proxy(this.addParticle, this));
		},

		initDebug: function() {
			this.$debugOutput = $('<p></p>').insertAfter(this.canvas.el);
		},

		initParticles: function() {
			this.particles = [];
			this.particleForces = [
				new GravityForce()
			];
			this.particleConstraints = [
				new GroundConstraint(HEIGHT - 20)
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
		},

		addParticle: function(options) {
			var p = new RoundParticle({
				x: options.x,
				y: options.y,
				vx: (Math.random() - 0.5) * 5,
				vy: (Math.random() * 7) - 10,
				forces: this.particleForces,
				constraints: this.particleConstraints,
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
		},

		updateDebugInfo: function() {
			if (this.$debugOutput) {
				this.$debugOutput.html('particles: ' + this.particles.length);
			}
		},

		animate: function() {
			this.canvas.clear();
			this.particles.forEach(function(particle){
				particle.update();
				particle.draw(this.canvas);
			}, this);
			this.updateDebugInfo();
		}

	});

	return Scene;
});
