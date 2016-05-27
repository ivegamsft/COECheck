(function () {
    'use strict';

    angular
        .module('app')
        .config(['applicationInsightsServiceProvider', 'environment', function (applicationInsightsServiceProvider, environment) {

            console.log('Beginning settings');

            // If an AppInsights Telemetry Key is returned in the environment constant then configure the AppInsights service
            if (environment.appinsights_instrumentationkey !== null) {

                console.log('Setting up Application Insights');

                // Define options
                var options = { applicationName: 'app' };

                // Use the Provider to setup the service with our telemetry key
                applicationInsightsServiceProvider
                    .configure(environment.appinsights_instrumentationkey, options);

            }

        }]);

})();
