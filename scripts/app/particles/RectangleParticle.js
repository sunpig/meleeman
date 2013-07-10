define(
'app/particles/RectangleParticle',
[
	'jquery',
	'app/particles/Particle'
],
function($, Particle){

	function RectangleParticle (options) {
		this.width = options.width || 5;
		this.height = options.height || 5;
		Particle.apply(this, arguments);
	}
	RectangleParticle.prototype = Object.create(Particle.prototype);
	RectangleParticle.prototype.constructor = RectangleParticle;

	$.extend(RectangleParticle.prototype, {
		draw: function(canvas) {
			var context = canvas.context;
			context.fillStyle = this.fillStyle;
			context.fillRect(canvas.getX(this.x), canvas.getY(this.y), this.width, this.height);
		},

		getBounds: function(){
			return {t:0,r:this.width,b:this.height,l:0};
		}
	});

	return RectangleParticle;
});