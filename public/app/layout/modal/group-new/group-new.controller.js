(function () {
    'use strict';

    angular
        .module('app')
        .controller('GroupNewModalController', GroupNewModalController);

    GroupNewModalController.$inject = ['$scope', '$log', '$uibModalInstance', 'GroupFactory'];

    function GroupNewModalController($scope, $log, $uibModalInstance, GroupFactory) {

        activate();

        function activate() {

            $log.info('GroupNewModalController Activated');

        }

        $scope.submitGroup = function () {

            console.log('Starting new group creation');

            // get group name from text input box
            var name = $scope.newGroupName;
            
            // use factory to create new group
            GroupFactory.addGroup(name).then(function (result) {
                
                console.log('Successfully created a new group named "' + result.title + '"');

                // close modal
                $uibModalInstance.close(result);

            });

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();
