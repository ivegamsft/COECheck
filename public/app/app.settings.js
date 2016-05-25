(function () {
    'use strict';

    angular
        .module('app.settings', [])
        .config(['applicationInsightsServiceProvider', function (applicationInsightsServiceProvider) {
            
            var options = { applicationName: 'app' };
            applicationInsightsServiceProvider.configure('adeb09ea-93a3-456c-9624-6d089d538fd2', options);

        }]);

})();
