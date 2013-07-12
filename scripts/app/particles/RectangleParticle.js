define(
'app/particles/RectangleParticle',
[
	'jquery',
	'app/SceneElement'
],
function($, SceneElement){

	function RectangleParticle (options) {
		SceneElement.apply(this, arguments);
		this.width = options.width || 5;
		this.height = options.height || 5;
		this.bounds = {t:0,r:this.width,b:this.height,l:0};
	}
	RectangleParticle.prototype = Object.create(SceneElement.prototype);
	RectangleParticle.prototype.constructor = RectangleParticle;

	$.extend(RectangleParticle.prototype, {
		draw: function(canvas) {
			var context = canvas.context;
			context.fillStyle = this.fillStyle;
			context.fillRect(canvas.getX(this.x), canvas.getY(this.y), this.width, this.height);
		}

	});

	return RectangleParticle;
});