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
		$rootScope.Topics = {};
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
			$rootScope.AlbumsListURl = result.data.collections['album-list'].href;
			apiService.get($rootScope.AlbumsListURl, null, saveAlbumsDescription, failure);
		}

		function saveAlbumsDescription(result) {
			var a = {};
			for (var i = 0; i < result.data.entries.length; i++) {
				var albumInfo = {
					Title: result.data.entries[i].title + result.data.entries[i].summary,
					Count: result.data.entries[i].imageCount,
					Link: result.data.entries[i].links.photos,
					AlbumId: result.data.entries[i].id.split(':').pop(),
				}
				$rootScope.Topics[i] = albumInfo;
				$scope.currentIndex = angular.copy(i);
				$scope.albumId = angular.copy(albumInfo.AlbumId);
				console.log('before reqyest', i)
				request(result.data.entries[i].links.photos).then(function (result) {
					console.log('in reqyest',i)	
					//a.push(result);
				});
				console.log('after reqyest', i)
				//console.log(a);
				//apiService.get($rootScope.Topics[i].Link, null, saveSlide, failure);
			}
		}
		$scope.slides = [];
		function saveSlide(result, opt) {
			var obj = {
				Slides: [],
				IdAlb: $scope.albumId
			}
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

