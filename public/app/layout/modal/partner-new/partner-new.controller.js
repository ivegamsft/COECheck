(function () {
    'use strict';

    angular
        .module('app')
        .controller('PartnerNewModalController', PartnerNewModalController);

    PartnerNewModalController.$inject = ['$scope', '$log', '$uibModalInstance', 'PartnerFactory'];

    function PartnerNewModalController($scope, $log, $uibModalInstance, PartnerFactory) {

        activate();

        function activate() {

            $log.info('PartnerNewModalController Activated');

        }

        $scope.submitPartner = function () {

            console.log('Starting new partner creation');

            // get partner name from text input box
            var name = $scope.newPartnerName;
            
            // use factory to create new partner
            PartnerFactory.addPartner(name).then(function (result) {
                
                console.log('Successfully created a new partner named "' + result.title + '"');

                // close modal
                $uibModalInstance.close(result);

            });

        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();
