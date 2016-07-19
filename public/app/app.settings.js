(function () {
    'use strict';

    angular
        .module('app')
        .config(['applicationInsightsServiceProvider', 'environment', function (applicationInsightsServiceProvider, environment) {

            // If an AppInsights Telemetry Key is returned in the environment constant then configure the AppInsights service
            if (environment.appinsights_instrumentationkey !== null) {

                console.log('Configuring Application Insights');

                // Define options
                var options = { applicationName: 'app' };

                // Use the Provider to setup the service with our telemetry key
                applicationInsightsServiceProvider
                    .configure(environment.appinsights_instrumentationkey, options);

            }
            else {
                console.log('Skipping configuration of Application Insights');
            }

        }]);

})();
