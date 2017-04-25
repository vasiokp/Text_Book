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

	function slidesCtrl($scope, $rootScope, apiService, $http) {
		$rootScope.Topics = [];
		$rootScope.Subjects = [];
		$rootScope.countTopics = 1;
		apiService.get('https://api-fotki.yandex.ru/api/users/textbook.book/', null, saveAlbumsListURl, failure);

		function succes(result) {
			console.log(result.data)
		}

		//	apiService.get('https://api-fotki.yandex.ru/api/users/textbook-book/album/536798/', null, succes, failure);
		function request(url,parrentId) {
			return $http.get(url, null)
				.then(function (result) {
					result.data.parrentId = parrentId;
						return result.data;
					},
					function(error) {
						console.log(error.status)
					});
		}

		function saveAlbumsListURl(result) {
			apiService.get(result.data.collections['album-list'].href, null, saveAlbumsDescription, failure);
		}

		function saveAlbumsDescription(result) {
			for (let i = 0; i < result.data.entries.length; i++) {
				var parrentId = 0;
				if(result.data.entries[i].links.album != undefined)
					parrentId = result.data.entries[i].links.album.split('/')[7];
				else {
					var subject = {
						title: result.data.entries[i].title,
						id: result.data.entries[i].id.split(':').pop()
					}
					$rootScope.Subjects.push(subject);
				}

				request(result.data.entries[i].links.photos, parrentId).then(function (result) {
					if (result.parrentId==0)
						return;
					var slides = [];
					for (var i = result.entries.length - 1; i >= 0; i--) {
						slides.push(result.entries[i].img.orig.href);
					}
					var topic = {
						Slides: slides,
						Title: result.title + result.summary,
						Pos: parseInt(result.title.split(' ').pop().substring(0, 1)),
						ParrentId: result.parrentId,
						Id:result.id.split(':')[5]
					}
					$rootScope.Topics.push(topic);
					$rootScope.countTopics = $rootScope.Topics.length;

				});
			}
			}


	function failure(result) {
			console.log('failure');
			console.log(result);
		}
	}

})(angular.module('TextBookApp'));

