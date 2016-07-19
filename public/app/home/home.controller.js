(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$location', '$log', 'AssessmentFactory'];
    function HomeController($scope, $location, $log, AssessmentFactory) {
        var vm = this;

        activate();

        ////////////////

        $scope.formatDate = function (date) {
            return moment(date).calendar();
        };

        $scope.navigate = function (id) {
            document.location.href = '#/assessments/' + id;
        };

        function activate() {

            $log.info('HomeController Activated');
            getData();
            setupDebugMode();

        }

        function getData() {

            // show loading indicator
            $scope.loading = true;

            AssessmentFactory.getMyAssessments($scope.userInfo.profile.upn).then(function (results) {

                // store the results in the scope
                $scope.assessments = results;

                // hide loading indicator
                $scope.loading = false;

            });

        }

        function setupDebugMode() {

            if ($location.search().debug) {
                $scope.debug = true;
                console.info('Debug mode initiated');
            }

        }

    }
})();