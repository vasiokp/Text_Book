var Reveal;


(function () {
	'use strict';

	angular.module('TextBookApp', [])
	.run(['$timeout', run])

	function run($timeout) {
		$timeout(function () {
			Reveal.initialize(
				{

					margin: 0.1,
					minScale: 0.1,
					maxScale: 2,
					center: false,
					mouseWheel: false,
					progress: false,
					controls: false
				}
			);
		}, 300);
	}

})();