(function () {
    'use strict';

    angular
        .module('app.auth', [])
        .config(['$httpProvider', 'adalAuthenticationServiceProvider', function ($httpProvider, adalAuthenticationServiceProvider) {

            adalAuthenticationServiceProvider.init(
                {
                    instance: 'https://login.microsoftonline.com/', 
                    tenant: 'common',
                    clientId: "0c979fac-8467-46b0-8711-2856ebfde62b"
                },
                $httpProvider   // pass http provider to inject request interceptor to attach tokens
            );

        }]);

})();