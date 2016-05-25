(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'adalAuthenticationService']; 

    function LoginController($scope, adalAuthenticationService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'login';

        activate();

        function activate() {
        
            $scope.login = function () {
                adalAuthenticationService.login();
            };
        
        }
    }
})();
