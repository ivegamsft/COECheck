(function() {
    'use strict';

    angular
        .module('app')
        .controller('GroupEditModalController', GroupEditModalController);

    GroupEditModalController.$inject = ['$scope', '$log', '$uibModalInstance', 'GroupFactory', 'group'];

    function GroupEditModalController($scope, $log, $uibModalInstance, GroupFactory, group) {

        activate();

        function activate() {

            $log.info('GroupEditModalController Activated');
            
            $scope.edittedGroup = {};
            $scope.edittedGroup.title = group.title;

        }

        $scope.submitGroup = function() {
            
            group.title = $scope.edittedGroup.title;
            console.log('Starting edit group process');

            // use factory to create new group
            GroupFactory.editGroup(group).then(function(result) {

                if (result === false) {
                    console.log('There was an issue editing the group');
                }
                else {
                    console.log('Successfully edited a group now named "' + result.title + '"');
                }

                // close modal
                $uibModalInstance.close(result);

            });

        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();
