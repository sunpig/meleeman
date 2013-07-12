define(
'app/Behaviour',
['jquery'],
function($){
	var Behaviour = function(){
	};

	$.extend(Behaviour.prototype, {
		updateSceneElement: function(sceneElement) {}
	});

	return Behaviour;
});