define(
'app/particles/Particle',
['jquery'],
function($){
	var Particle = function(x, y, vx, vy, forces, constraints){
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.forces = forces || [];
		this.constraints = constraints || [];
	};

	$.extend(Particle.prototype, {
		update: function() {
			this.applyForces();
			this.updatePosition();
			this.applyConstraints();
		},

		applyForces: function() {
			this.forces.forEach(function(force){
				force.updateParticle(this);
			}, this);
		},

		updatePosition: function() {
			this.x += this.vx;
			this.y += this.vy;
		},

		applyConstraints: function() {
			this.constraints.forEach(function(constraint){
				constraint.updateParticle(this);
			}, this);
		},

		draw: function(canvas) {
			var context = canvas.context;
			context.fillStyle = "rgba(255,0,0,0.5)";
			context.fillRect(this.x, this.y, 5, 5);
		}
	});

	return Particle;
});