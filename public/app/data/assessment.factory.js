(function () {
    'use strict';

    angular
        .module('app')
        .factory('AssessmentFactory', AssessmentFactory);

    AssessmentFactory.$inject = ['$http', '$log'];
    function AssessmentFactory($http, $log) {
        var service = {
            getAssessments: getAssessments,
            getMyAssessments: getMyAssessments,
            getAssessment: getAssessment,
            createAssessment: createAssessment,
            deleteAssessment: deleteAssessment
        };

        return service;

        ////////////////	
        function getAssessments() {

            return $http.get('api/assessments')
                .then(getAssessmentsComplete)
                .catch(getAssessmentsFailed);

            function getAssessmentsComplete(response) {
                return response.data;
            }

            function getAssessmentsFailed(error) {
                $log.error('XHR Failed for getAssessments.' + error.data);
            }

        }

        function getMyAssessments(upn) {

            return $http.post('api/assessments/my', { upn: upn })
                .then(getAssessmentsComplete)
                .catch(getAssessmentsFailed);

            function getAssessmentsComplete(response) {
                return response.data;
            }

            function getAssessmentsFailed(error) {
                $log.error('XHR Failed for getAssessments.' + error.data);
            }

        }

        function getAssessment(id) {

            return $http.get('api/assessments/' + id)
                .then(getAssessmentComplete)
                .catch(getAssessmentFailed);

            function getAssessmentComplete(response) {
                return response.data;
            }

            function getAssessmentFailed(error) {
                $log.error('XHR Failed for getAssessment.' + error.data);
            }

        }

        function createAssessment(data) {

            return $http.post('api/assessments', data)
                .then(createAssessmentComplete)
                .catch(createAssessmentFailed);

            function createAssessmentComplete(response) {
                return response.data;
            }

            function createAssessmentFailed(error) {
                $log.error('XHR Failed for createAssessment.' + error.data);
            }

        }

        function deleteAssessment(id) {

            return $http.delete('api/assessments/' + id)
                .then(deleteAssessmentComplete)
                .catch(deleteAssessmentFailed);

            function deleteAssessmentComplete(response) {
                return response.data;
            }

            function deleteAssessmentFailed(error) {
                $log.error('XHR Failed for deleteAssessment.' + error.data);
            }

        }

    }
})();