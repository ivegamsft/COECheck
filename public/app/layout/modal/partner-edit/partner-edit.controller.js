(function() {
    'use strict';

    angular
        .module('app')
        .controller('PartnerEditModalController', PartnerEditModalController);

    PartnerEditModalController.$inject = ['$scope', '$log', '$uibModalInstance', 'PartnerFactory', 'partner'];

    function PartnerEditModalController($scope, $log, $uibModalInstance, PartnerFactory, partner) {

        activate();

        function activate() {

            $log.info('PartnerEditModalController Activated');
            
            $scope.edittedPartner = {};
            $scope.edittedPartner.title = partner.title;

        }

        $scope.submitPartner = function() {
            
            partner.title = $scope.edittedPartner.title;
            console.log('Starting edit partner process');

            // use factory to create new partner
            PartnerFactory.editPartner(partner).then(function(result) {

                if (result === false) {
                    console.log('There was an issue editing the partner');
                }
                else {
                    console.log('Successfully edited a partner now named "' + result.title + '"');
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
