(function (app) {
	'use strict';
	app.directive('slides', slides);
	app.controller('slidesCtrl', slidesCtrl);


	function slides() {
		return {
			bindToController: true,
			controller: 'slidesCtrl',
			replace: true,
			restrict: 'E',
			templateUrl: 'components/content/slides.template.html'
		}
	}

	function slidesCtrl($scope, $rootScope, $timeout, apiService,$http) {
		$rootScope.topics = [];
		$rootScope.Topics = [];
		$scope.albumInfo = {}
		$rootScope.countTopics = 3;
		apiService.get('https://api-fotki.yandex.ru/api/users/textbook.book/', null, saveAlbumsListURl, failure);
		function succes(result) {
			console.log(result.data)
		}
	//	apiService.get('https://api-fotki.yandex.ru/api/users/textbook-book/album/536798/', null, succes, failure);
		function request(url) {
				return $http.get(url, null)
						.then(function (result) {
							return result.data;
						}, function (error) {
							console.log(error.status)
						});
			 }
		function saveAlbumsListURl(result) {
			apiService.get(result.data.collections['album-list'].href, null, saveAlbumsDescription, failure);
		}
		function saveAlbumsDescription(result) {
			for (var i = 0; i < result.data.entries.length; i++) 
				request(result.data.entries[i].links.photos).then(function (result) {
					var slides = [];
					console.log(result);
					for (var i = result.entries.length-1; i >=0 ; i--) {
						slides.push(result.entries[i].img.orig.href);
					}
					var topic = {
						Slides: slides,
						Title: result.title + result.summary,
						Pos:parseInt(result.title.split(' ').pop().substring(0,1))
					}
					$rootScope.Topics.push(topic);
				});
			console.log($rootScope.Topics);

			//$rootScope.Topics = $rootScope.Topics.sort(compare);
			//$scope.Topics2 = $rootScope.Topics.sort(compare);
			$scope.countTopics = result.data.entries.length;

		}
		function saveSlide(result, opt) {
			var slides = [];
			var myI = angular.copy($scope.currentIndex);
			for (var i = 0; i < result.data.entries.length; i++) 
				slides.push(result.data.entries[i].img.orig.href)
			
			obj.Slides=slides;
			$scope.slides.push(obj);
			$rootScope.Topics[myI].Slides = slides;
			console.log($rootScope.Topics);
			console.log($scope.slides);
		}

		function failure(result) {
			console.log('failure');
			console.log(result);
		}

	}

})(angular.module('TextBookApp'));

