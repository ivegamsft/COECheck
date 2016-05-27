(function () {
    'use strict';

    angular
        .module('app')
        .config(['$httpProvider', 'adalAuthenticationServiceProvider', 'environment', function ($httpProvider, adalAuthenticationServiceProvider, environment) {

            adalAuthenticationServiceProvider.init(
                {
                    instance: 'https://login.microsoftonline.com/',
                    tenant: 'common',
                    clientId: environment.aad_client_id // Use the returned Client ID from the environment constant
                },
                $httpProvider   // pass http provider to inject request interceptor to attach tokens
            );

        }]);

})();