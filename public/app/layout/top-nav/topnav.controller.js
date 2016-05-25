(function () {
    'use strict';

    angular
        .module('app')
        .controller('TopNavController', TopNavController);

    TopNavController.$inject = ['$scope', 'adalAuthenticationService'];

    function TopNavController($scope, adalAuthenticationService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'topnav';

        activate();

        function activate() {

            //setup the navigation
            initNav();

        }

        function initNav() {

            // logout of the current user with the adal service
            $scope.logout = function () {
                adalAuthenticationService.logOut();
            };

            // implement the Bootstrap UI Dropdown control
            $scope.status = {
                isopen: false
            };

            $scope.toggled = function (open) {
                console.log('Dropdown is now: ', open);
            };

            $scope.toggleDropdown = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopen = !$scope.status.isopen;
            };

        }

    }
})();
