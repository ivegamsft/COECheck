(function() {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', '$log', '$uibModal', 'GroupFactory', 'AssessmentFactory'];
    function AdminController($scope, $log, $uibModal, GroupFactory, AssessmentFactory) {
        var vm = this;


        activate();

        ////////////////

        function activate() {

            $log.info('AdminController activated');

            getData();

        }

        $scope.openParterNewModal = function(e) {
                
            var modalInstance = $uibModal.open({
                templateUrl: '/app/layout/modal/group-new/group-new.modal.html',
                controller: 'GroupNewModalController',
                size: 'sm'
            });

            modalInstance.result.then(function(newGroup) {
                $scope.groups.push(newGroup);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        $scope.editGroup = function(group) {

            var modalInstance = $uibModal.open({
                templateUrl: '/app/layout/modal/group-edit/group-edit.modal.html',
                controller: 'GroupEditModalController',
                size: 'sm',
                resolve: {
                    group: function() {
                        return group;
                    }
                }
            });

            modalInstance.result.then(function(newGroup) {

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        $scope.deleteGroup = function(deletedGroup) {

            // pop confirmation window
            if (confirm("Are you sure you would like to delete the group " + deletedGroup.title + "?") === true) {

                // delete a group
                GroupFactory.deleteGroup(deletedGroup.id).then(function(result) {

                    if (result === true) {
                        // group was succesfully deleted
                        // remove from scope array

                        // loop through the array of groups and splice out the newly deleted group
                        $scope.groups.forEach(function(group, index) {

                            if (group.id == deletedGroup.id) {

                                // remove deleted group from the scope array
                                $scope.groups.splice(index, 1);

                            }

                        });

                    }
                    else {
                        console.log('There was a problem deleting group ' + deletedGroup.id);
                    }

                });

            }

        };

        $scope.formatDate = function(date) {
            return moment(date).calendar();
        };
        
        $scope.navigateGroup = function (title) {
            document.location.href = '#/groups/' + title;
        };
        
        $scope.navigateAssessment = function (id) {
            document.location.href = '#/assessments/' + id;
        };

        function getData() {

            getGroups();
            getAssessments();

        }

        function getGroups() {

            $scope.loadingGroups = true;

            // get all Groups
            GroupFactory.getData().then(function(results) {

                // store data in scope
                $scope.groups = results;

                // hide loading indicator
                $scope.loadingGroups = false;

            });

        }

        function getAssessments() {

            $scope.loadingAssessments = true;

            AssessmentFactory.getAssessments().then(function(results) {

                console.log('Retrieved assessment data');

                // store the results in the scope
                $scope.assessments = results;

                // hide loading indicator
                $scope.loadingAssessments = false;

            });

        }

    }

})();