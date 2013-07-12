define(
'app/SceneElement',
['jquery'],
function($){
	var SceneElement = function(options){
		this.sceneX = options.sceneX;
		this.sceneY = options.sceneY;
		this.nextx = options.sceneX;
		this.nexty = options.sceneY;
		this.vx = options.vx || 0;
		this.vy = options.vy || 0;
		this.dvx = 0;
		this.dvy = 0;
		this.movementPhaseBehaviours = options.movementPhaseBehaviours || [];
		this.collisionPhaseBehaviours = options.collisionPhaseBehaviours || [];
		this.actionPhaseBehaviours = options.actionPhaseBehaviours || [];
		this.setColour(options.colour);
		this.bounds = {t:0,r:0,b:0,l:0};
	};

	$.extend(SceneElement.prototype, {
		destroy: function() {},

		// Update anticipated position and velocity
		doMovementPhase: function() {
			this.movementPhaseBehaviours.forEach(function(movementPhaseBehaviour){
				movementPhaseBehaviour.updateSceneElement(this);
			}, this);

			this.vx += this.dvx;
			this.vy += this.dvy;
			this.nextx = this.sceneX + this.vx;
			this.nexty = this.sceneY + this.vy;
		},

		// Detect collisions based on anticipated position and velocity
		doCollisionPhase: function() {
			this.collisionPhaseBehaviours.forEach(function(collisionPhaseBehaviour){
				collisionPhaseBehaviour.updateSceneElement(this);
			}, this);

			this.sceneX = this.nextx;
			this.sceneY = this.nexty;
		},

		// Detect collisions based on anticipated position and velocity
		doActionPhase: function() {
			this.actionPhaseBehaviours.forEach(function(actionPhaseBehaviour){
				actionPhaseBehaviour.updateSceneElement(this);
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

		draw: function(viewport) {}

	});

	return SceneElement;
});