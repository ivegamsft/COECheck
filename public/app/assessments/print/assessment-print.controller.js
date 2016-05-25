(function() {
    'use strict';

    angular
        .module('app')
        .controller('AssessmentPrintController', AssessmentPrintController);

    AssessmentPrintController.$inject = ['$scope', '$log', '$routeParams', '$window', '$location', 'SchemaFactory', 'AssessmentFactory'];
    function AssessmentPrintController($scope, $log, $routeParams, $window, $location, SchemaFactory, AssessmentFactory) {
        var vm = this;


        activate();

        ////////////////

        function activate() {

            $log.info('AssessmentPrintController activated');

            //getData();

        }

        $scope.date = function() {
            return moment().format('M/D/YYYY');
        };

        $scope.formatMaturity = function(value) {

            var formattedMaturityLevel = null;

            switch (value) {
                case 1:
                    formattedMaturityLevel = 'Basic';
                    break;
                case 2:
                    formattedMaturityLevel = 'Standardized';
                    break;
                case 3:
                    formattedMaturityLevel = 'Advanced';
                    break;
                case 4:
                    formattedMaturityLevel = 'Dynamic';
                    break;
            }

            return formattedMaturityLevel;

        };

        function getData() {

            $scope.loading = true;

            SchemaFactory.getData().then(function(results) {

                $scope.rubricData = results;

            });

            AssessmentFactory.getAssessment($routeParams.id).then(function(result) {

                $scope.assessment = result;
                $scope.loading = false;
                toggleScores();
                
                // pop the print dialog after a brief pause
                setTimeout(function() {
                    $window.print();
                }, 3000);

            });

        }

        function toggleScores() {

            // check if the scores object is larger than only 1
            // old assessments only supported overall
            // new assessments support section level scoring
            if (_.size($scope.assessment.score) > 1) {
                $scope.sectionScores = true;
            }

        }

    }
})();