(function () {
    'use strict';

    angular
        .module('app')
        .controller('HelpController', HelpController);

    HelpController.$inject = ['$scope', '$log', 'DocumentationFactory'];
    function HelpController($scope, $log, DocumentationFactory) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            $log.info('HelpController activated');

            getData();

        }       

        function getData() {

            $scope.loading = true;

            // get all Groups
            DocumentationFactory.getHelp().then(function (results) {

                // store data in scope
                $scope.helpContent = results;

                // hide loading indicator
                $scope.loading = false;

            });

        }

    }

})();
