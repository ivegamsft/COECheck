(function () {
	'use strict';

	// Manually bootstrap the application
	angular.element(document).ready(function () {

		// Query the environemt endpoint to retrieve values needed for Angular constants
		$.getJSON('api/environment', function (data) {

			// Create an Angular constant from the returned configuration data		
			angular
				.module('app')
				.constant('environment', data);

			// Manually initiate the application bootstrap process
			angular
				.bootstrap(document, ['app']);

		});

	});

	angular
		.module('app', [

			// Angular Modules
			'ngAnimate',
			'ngRoute',
			'ngSanitize',

			// Vendor Modules
			'AdalAngular',
			'ui.bootstrap',
			'ApplicationInsightsModule',
			//'ng-fx'

			// Custom Modules

		]);

})();