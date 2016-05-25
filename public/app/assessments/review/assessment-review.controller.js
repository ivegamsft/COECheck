(function() {
    'use strict';

    angular
        .module('app')
        .controller('AssessmentReviewController', AssessmentReviewController);

    AssessmentReviewController.$inject = ['$scope', '$log', '$routeParams', '$window', '$location', 'SchemaFactory', 'AssessmentFactory'];
    function AssessmentReviewController($scope, $log, $routeParams, $window, $location, SchemaFactory, AssessmentFactory) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            $log.info('AssessmentReviewController activated');

            getData();
            sharePage();
            setupDebugMode();

        }

        $scope.sendEmail = function(partnerName, url) {
            var link = "mailto:?subject=COE Assessment for " + escape(partnerName) + "&body=Assessment is available at " + escape(url);
            $window.location.href = link;
        };

        $scope.printPage = function() {
            // open new window directed at the print page
            $window.open($location.absUrl() + '/print');
        };

        $scope.deleteAssessment = function(id) {

            if (confirm("Are you sure you would like to delete this assessment?") === true) {

                AssessmentFactory.deleteAssessment(id).then(function() {

                    console.log('Deleted record ' + id);

                    // redirect user back to homepage
                    $location.path('home');

                });

            }
            else {
                console.log('You clicked cancel');
            }

        };

        $scope.formatDate = function(date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
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

            });

        }

        function sharePage() {

            $scope.shareUrl = $location.absUrl();

        }

        function toggleScores() {

            // check if the scores object is larger than only 1
            // old assessments only supported overall
            // new assessments support section level scoring
            if (_.size($scope.assessment.score) > 1) {
                $scope.sectionScores = true;
            }

        }

        function setupDebugMode() {

            if ($location.search().debug) {
                $scope.debug = true;
                console.info('Debug mode initiated');
            }

        }

    }
})();