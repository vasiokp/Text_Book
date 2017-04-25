(function (app) {
	'use strict';
	app.directive('leftMenu', leftMenu);
	app.controller('leftMenuCtrl',leftMenuCtrl);

	function leftMenu(){
		return{
			bindToController: true,
			controller: 'leftMenuCtrl',
			replace: true,
			restrict: 'E',
			templateUrl: 'components/leftnav/leftMenu.template.html'
		}
	}

	function leftMenuCtrl($scope, $rootScope, $timeout) {
		$rootScope.currentTopic = 0;
		$timeout(function () {
			if ($rootScope.Topics[0])
				$rootScope.lastSlide = $rootScope.Topics[0].Slides.length;
			else
				$rootScope.lastSlide = 24;
		}, 1000);


		$scope.selectTopic = function (i) {
			$rootScope.currentTopic = i;
			if (i >= 0) 
				$rootScope.selectedTopic = true;
			else 
				$rootScope.selectedTopic = false;
			$rootScope.currentSlide = 1;
			Reveal.slide(i, 0);
			$rootScope.lastSlide = $rootScope.Topics[i].Slides.length;
		}

		$scope.getNumber = function (num) {
				return new Array(num);
			}

	}

})(angular.module('TextBookApp'));