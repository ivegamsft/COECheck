(function () {
	'use strict';

	angular
		.module('app')
		.factory('SchemaFactory', RubricFactory);

	RubricFactory.$inject = ['$http', '$log'];
	function RubricFactory($http, $log) {
		var service = {
			getData: getData
		};

		return service;

		function getData() {

			return $http.get('api/schema')
				.then(getDataComplete)
				.catch(getDataFailed);

			function getDataComplete(response) {
				return response.data;
			}

			function getDataFailed(error) {
				$log.error('XHR Failed for getData.' + error.data);
			}

		}
	}
})();