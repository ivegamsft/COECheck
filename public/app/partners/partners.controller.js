(function() {
    'use strict';

    angular
        .module('app')
        .controller('PartnersController', PartnersController);

    PartnersController.$inject = ['$scope', '$location', '$log', 'PartnerFactory', 'AssessmentFactory'];
    function PartnersController($scope, $location, $log, PartnerFactory, AssessmentFactory) {
        var vm = this;

        activate();

        ////////////////

        $scope.navigate = function(name) {
            document.location.href = '#/partners/' + name;
        }

        function activate() {

            $log.info('PartnersController Activated');
            getData();

        }

        function getData() {

            // show loading indicator
            $scope.loading = true;

            PartnerFactory.getData().then(function(results) {

                // store the results in the scope
                $scope.partners = results;

                // hide loading indicator
                $scope.loading = false;

            });

        }

    }
    
})();