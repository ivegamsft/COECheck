(function() {
    'use strict';

    angular
        .module('app')
        .controller('GroupsController', GroupsController);

    GroupsController.$inject = ['$scope', '$location', '$log', 'GroupFactory', 'AssessmentFactory'];
    function GroupsController($scope, $location, $log, GroupFactory, AssessmentFactory) {
        var vm = this;

        activate();

        ////////////////

        $scope.navigate = function(name) {
            document.location.href = '#/groups/' + name;
        }

        function activate() {

            $log.info('GroupsController Activated');
            getData();

        }

        function getData() {

            // show loading indicator
            $scope.loading = true;

            GroupFactory.getData().then(function(results) {

                // store the results in the scope
                $scope.groups = results;

                // hide loading indicator
                $scope.loading = false;

            });

        }

    }
    
})();