﻿(function (app) {
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

	function slidesCtrl($scope, $rootScope, apiService,$http) {
		$rootScope.Topics = [];
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
					for (var i = result.entries.length-1; i >=0 ; i--) {
						slides.push(result.entries[i].img.orig.href);
					}
					var topic = {
						Slides: slides,
						Title: result.title + result.summary,
						Pos:parseInt(result.title.split(' ').pop().substring(0,1))
					}
					$rootScope.Topics[topic.Pos-1]=topic;
				});
			console.log($rootScope.Topics);
			$scope.countTopics = result.data.entries.length;

		}

		function failure(result) {
			console.log('failure');
			console.log(result);
		}
	}

})(angular.module('TextBookApp'));

