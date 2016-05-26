(function() {
	'use strict';

	angular.module('app', [
		
		// Angular Modules
		'ngAnimate',
		'ngRoute',

		// Vendor Modules
        'AdalAngular',
		'ui.bootstrap',
        'ApplicationInsightsModule',
        //'ng-fx'
	
		// Custom Modules
		'app.auth',
        'app.routes',
		'app.settings'
		
	]);
	
})();