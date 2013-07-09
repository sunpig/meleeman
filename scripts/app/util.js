define(
'app/util',
[
],
function(
) {
	var util = {
		// From MDC: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
		getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	};

	return util;
});
