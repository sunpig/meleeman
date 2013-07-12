define(
'app/constraints/Constraint',
['jquery'],
function($){
	var Constraint = function(){
	};

	$.extend(Constraint.prototype, {
		updateSceneElement: function(sceneElement) {}
	});

	return Constraint;
});