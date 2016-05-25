(function() {
    'use strict';

    angular
        .module('app')
        .factory('PartnerFactory', PartnerFactory);

    PartnerFactory.$inject = ['$http', '$log'];
    function PartnerFactory($http, $log) {
        var service = {
            getData: getData,
            addPartner: addPartner,
            editPartner: editPartner,
            deletePartner: deletePartner,
            getAssessments: getAssessments
        };

        return service;

        ////////////////
        function getData() {

            return $http.get('api/partners')
                .then(getDataComplete)
                .catch(getDataFailed);

            function getDataComplete(response) {
                return response.data;
            }

            function getDataFailed(error) {
                $log.error('XHR Failed for getData.' + error.data);
            }

        }

        function addPartner(name) {

            return $http.post('api/partners', { partnerName: name })
                .then(addPartnerComplete)
                .catch(addPartnerFailed);

            function addPartnerComplete(response) {
                return response.data;
            }

            function addPartnerFailed(error) {
                $log.error('XHR Failed for addPartner.' + error.data);
            }

        }

        function editPartner(partner) {

            return $http.put('api/partners', partner)
                .then(editPartnerComplete)
                .catch(editPartnerFailed);

            function editPartnerComplete(response) {
                return response.data;
            }

            function editPartnerFailed(error) {
                $log.error('XHR Failed for editPartner.' + error.data);
            }

        }

        function deletePartner(id) {

            return $http({
                url: 'api/partners',
                method: 'DELETE',
                data: { id: id },
                headers: { "Content-Type": "application/json;charset=utf-8" }
            })
                .then(deletePartnerComplete)
                .catch(deletePartnerFailed);

            function deletePartnerComplete(response) {
                return response.data;
            }

            function deletePartnerFailed(error) {
                $log.error('XHR Failed for deletePartner.' + error.data);
            }

        }

        function getAssessments(name) {

            return $http.get('api/partners/' + name + '/assessments')
                .then(getAssessmentsComplete)
                .catch(getAssessmentsFailed);

            function getAssessmentsComplete(response) {
                return response.data;
            }

            function getAssessmentsFailed(error) {
                $log.error('XHR Failed for getAssessments.' + error.data);
            }

        }

    }
})();