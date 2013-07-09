define(
'app/Scene',
[
	'jquery',
	'app/Canvas',
	'app/particles/RoundParticle',
	'app/forces/GravityForce',
	'app/forces/StaticFrictionForce',
	'app/constraints/GroundConstraint'
],
function(
	$,
	Canvas,
	RoundParticle,
	GravityForce,
	StaticFrictionForce,
	GroundConstraint
) {

	function Scene(id, height, width) {
		this.canvas = new Canvas(id, height, width);
		this.raf = null;
		this.reset();
	}

	$.extend(Scene.prototype, {
		reset: function() {
			var gravityForce = new GravityForce();
			var groundConstraint = new GroundConstraint(this.canvas.height);
			var staticFrictionForce = new StaticFrictionForce(300);
			var p = new RoundParticle(70, 180, 1, -1, [gravityForce, staticFrictionForce], [groundConstraint]);
			this.particles = [p];
		},

		run: function() {
			this.raf = window.requestAnimationFrame($.proxy(this.run, this));
			this.canvas.clear();
			this.particles.forEach(function(particle){
				particle.update();
				particle.draw(this.canvas);
			}, this);
		},

		pause: function() {
			window.cancelAnimationFrame(this.raf);
		}

	});

	return Scene;
});
