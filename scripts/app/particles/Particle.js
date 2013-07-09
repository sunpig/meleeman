define(
'app/particles/Particle',
['jquery'],
function($){
	var Particle = function(options){
		this.x = options.x;
		this.y = options.y;
		this.nextx = options.x;
		this.nexty = options.y;
		this.vx = options.vx || 0;
		this.vy = options.vy || 0;
		this.dvx = 0;
		this.dvy = 0;
		this.forces = options.forces || [];
		this.constraints = options.constraints || [];
		this.setColour(options.colour);
	};

	$.extend(Particle.prototype, {
		destroy: function() {},

		update: function() {
			this.applyForces();

			this.vx += this.dvx;
			this.vy += this.dvy;
			this.nextx = this.x + this.vx;
			this.nexty = this.y + this.vy;

			this.detectCollisions();

			this.x = this.nextx;
			this.y = this.nexty;
		},

		applyForces: function() {
			this.forces.forEach(function(force){
				force.updateParticle(this);
			}, this);
		},

		detectCollisions: function() {
			this.constraints.forEach(function(constraint){
				constraint.updateParticle(this);
			}, this);
		},

		setColour: function(colourOptions) {
			if (colourOptions.fill) {
				var fill = colourOptions.fill;
				this.fillStyle = "rgba(" + fill.r + "," + fill.g + "," + fill.b + "," + fill.a + ")";
			} else {
				this.fillStyle = "rgba(150,150,150,0.5)";
			}
		},

		draw: function(canvas) {},

		getBounds: function(){
			return {t:0,r:0,b:0,l:0};
		}
	});

	return Particle;
});