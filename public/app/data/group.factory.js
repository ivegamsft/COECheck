(function() {
    'use strict';

    angular
        .module('app')
        .factory('GroupFactory', GroupFactory);

    GroupFactory.$inject = ['$http', '$log'];
    function GroupFactory($http, $log) {
        var service = {
            getData: getData,
            addGroup: addGroup,
            editGroup: editGroup,
            deleteGroup: deleteGroup,
            getAssessments: getAssessments
        };

        return service;

        ////////////////
        function getData() {

            return $http.get('api/groups')
                .then(getDataComplete)
                .catch(getDataFailed);

            function getDataComplete(response) {
                return response.data;
            }

            function getDataFailed(error) {
                $log.error('XHR Failed for getData.' + error.data);
            }

        }

        function addGroup(name) {

            return $http.post('api/groups', { groupName: name })
                .then(addGroupComplete)
                .catch(addGroupFailed);

            function addGroupComplete(response) {
                return response.data;
            }

            function addGroupFailed(error) {
                $log.error('XHR Failed for addGroup.' + error.data);
            }

        }

        function editGroup(group) {

            return $http.put('api/groups', group)
                .then(editGroupComplete)
                .catch(editGroupFailed);

            function editGroupComplete(response) {
                return response.data;
            }

            function editGroupFailed(error) {
                $log.error('XHR Failed for editGroup.' + error.data);
            }

        }

        function deleteGroup(id) {

            return $http({
                url: 'api/groups',
                method: 'DELETE',
                data: { id: id },
                headers: { "Content-Type": "application/json;charset=utf-8" }
            })
                .then(deleteGroupComplete)
                .catch(deleteGroupFailed);

            function deleteGroupComplete(response) {
                return response.data;
            }

            function deleteGroupFailed(error) {
                $log.error('XHR Failed for deleteGroup.' + error.data);
            }

        }

        function getAssessments(name) {

            return $http.get('api/groups/' + name + '/assessments')
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