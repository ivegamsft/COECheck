(function() {
    'use strict';

    angular
        .module('app')
        .controller('PartnerController', PartnerController);

    PartnerController.$inject = ['$scope', '$location', '$log', '$routeParams', 'PartnerFactory', 'AssessmentFactory'];
    function PartnerController($scope, $location, $log, $routeParams, PartnerFactory, AssessmentFactory) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            $log.info('PartnerController Activated');
            getData();

        }

        $scope.navigate = function(id) {
            document.location.href = '#/assessments/' + id;
        }

        $scope.formatDate = function(date) {
            return moment(date).calendar();
        }

        $scope.firstDate = function() {
            if ($scope.assessments.length > 0) {
                return $scope.formatDate($scope.assessments.slice(-1)[0].created);
            }
        }

        $scope.lastDate = function() {
            if ($scope.assessments.length > 0) {
                return $scope.formatDate($scope.assessments[0].created);
            }
        }

        function getData() {
                
            // show loading indicator
            $scope.loading = true;

            // get partner's name
            $scope.partnerName = $routeParams.name;
            
            // create an array for assessment data
            $scope.assessments = [];
            
            PartnerFactory.getAssessments($scope.partnerName).then(function(results) {

                // store the results in the scope
                $scope.assessments = results;

                // hide loading indicator
                $scope.loading = false;

            });

        }

    }

})();