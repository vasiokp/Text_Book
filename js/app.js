var Reveal;


(function () {
	'use strict';

	angular.module('TextBookApp', [])
	.run(['$timeout', run])

	function run($timeout) {
		$timeout(function () {
			Reveal.initialize(
				{
					width: 500,
					height: 500,
					margin: 0,
					viewDistance: 1,
					center: false,
					mouseWheel: false,
					progress: false,
					controls: false
				}
			);
		}, 300);
	}

})();