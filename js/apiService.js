(function (app) {
    'use strict';

    app.factory('apiService', apiService);

    apiService.$inject = ['$http'];

    function apiService($http) {
        var service = {
            get: get,
            post: post
        };

        function get(url, config, success, failure) {
            return $http.get(url, config)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                    	console.log(error.status)
                        if (error.status == '401') {
                            console.log('Authentication required.');
                        }
                        else if (failure != null) {
                            failure(error);
                        }
                    });
        }

        function post(url, data, success, failure) {
            return $http.post(url, data)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                        if (error.status == '401') {
                        	console.log('Authentication required.');
                        }
                        else if (failure != null) {
                            failure(error);
                        }
                    });
        }

        return service;
    }

})(angular.module('TextBookApp'));