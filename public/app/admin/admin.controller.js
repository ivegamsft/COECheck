(function() {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', '$log', '$uibModal', 'PartnerFactory', 'AssessmentFactory'];
    function AdminController($scope, $log, $uibModal, PartnerFactory, AssessmentFactory) {
        var vm = this;


        activate();

        ////////////////

        function activate() {

            $log.info('AdminController activated');

            getData();

        }

        $scope.openParterNewModal = function(e) {
                
            var modalInstance = $uibModal.open({
                templateUrl: '/app/layout/modal/partner-new/partner-new.modal.html',
                controller: 'PartnerNewModalController',
                size: 'sm'
            });

            modalInstance.result.then(function(newPartner) {
                $scope.partners.push(newPartner);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        $scope.editPartner = function(partner) {

            var modalInstance = $uibModal.open({
                templateUrl: '/app/layout/modal/partner-edit/partner-edit.modal.html',
                controller: 'PartnerEditModalController',
                size: 'sm',
                resolve: {
                    partner: function() {
                        return partner;
                    }
                }
            });

            modalInstance.result.then(function(newPartner) {

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        $scope.deletePartner = function(deletedPartner) {

            // pop confirmation window
            if (confirm("Are you sure you would like to delete the partner " + deletedPartner.title + "?") === true) {

                // delete a partner
                PartnerFactory.deletePartner(deletedPartner.id).then(function(result) {

                    if (result === true) {
                        // partner was succesfully deleted
                        // remove from scope array

                        // loop through the array of partners and splice out the newly deleted partner
                        $scope.partners.forEach(function(partner, index) {

                            if (partner.id == deletedPartner.id) {

                                // remove deleted partner from the scope array
                                $scope.partners.splice(index, 1);

                            }

                        });

                    }
                    else {
                        console.log('There was a problem deleting partner ' + deletedPartner.id);
                    }

                });

            }

        };

        $scope.formatDate = function(date) {
            return moment(date).calendar();
        };
        
        $scope.navigatePartner = function (title) {
            document.location.href = '#/partners/' + title;
        };
        
        $scope.navigateAssessment = function (id) {
            document.location.href = '#/assessments/' + id;
        };

        function getData() {

            getPartners();
            getAssessments();

        }

        function getPartners() {

            $scope.loadingPartners = true;

            // get all Partners
            PartnerFactory.getData().then(function(results) {

                // store data in scope
                $scope.partners = results;

                // hide loading indicator
                $scope.loadingPartners = false;

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