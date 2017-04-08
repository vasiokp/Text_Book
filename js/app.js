var Reveal;


(function () {
	'use strict';

	angular.module('TextBookApp', [])
	.run(['$timeout', run])

	function run($timeout) {
		$timeout(function () {
			Reveal.initialize(
				{

					margin: 0,
					minScale: 1,
					maxScale: 1,
					center: false,
					mouseWheel: false,
					progress: false,
					controls: false
				}
			);
		}, 300);
	}

})();