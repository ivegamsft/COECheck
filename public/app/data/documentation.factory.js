(function () {
	'use strict';

	angular
		.module('app')
		.factory('DocumentationFactory', DocumentationFactory);

	DocumentationFactory.$inject = ['$http', '$log'];
	function DocumentationFactory($http, $log) {
		var service = {
			getHelp: getHelp
		};

		return service;

		function getHelp() {

			return $http.get('api/documentation/help')
				.then(getHelpComplete)
				.catch(getHelpFailed);

			function getHelpComplete(response) {
				return response.data;
			}

			function getHelpFailed(error) {
				$log.error('XHR Failed for getHelp.' + error.data);
			}

		}
	}
})();