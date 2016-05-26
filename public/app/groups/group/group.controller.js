(function() {
    'use strict';

    angular
        .module('app')
        .controller('GroupController', GroupController);

    GroupController.$inject = ['$scope', '$location', '$log', '$routeParams', 'GroupFactory', 'AssessmentFactory'];
    function GroupController($scope, $location, $log, $routeParams, GroupFactory, AssessmentFactory) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            $log.info('GroupController Activated');
            getData();

        }

        $scope.navigate = function(id) {
            document.location.href = '#/assessments/' + id;
        };

        $scope.formatDate = function(date) {
            return moment(date).calendar();
        };

        $scope.firstDate = function() {
            if ($scope.assessments.length > 0) {
                return $scope.formatDate($scope.assessments.slice(-1)[0].created);
            }
        };

        $scope.lastDate = function() {
            if ($scope.assessments.length > 0) {
                return $scope.formatDate($scope.assessments[0].created);
            }
        };

        function getData() {
                
            // show loading indicator
            $scope.loading = true;

            // get group's name
            $scope.groupName = $routeParams.name;
            
            // create an array for assessment data
            $scope.assessments = [];
            
            GroupFactory.getAssessments($scope.groupName).then(function(results) {

                // store the results in the scope
                $scope.assessments = results;

                // hide loading indicator
                $scope.loading = false;

            });

        }

    }

})();