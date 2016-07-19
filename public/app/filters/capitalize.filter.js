(function () {
    'use strict';

    angular
        .module('app')
        .filter('capitalize', CapitalizeFilter);

    function CapitalizeFilter() {

        return function (string) {

            // for a given string, return it capitalized
            return _.startCase(string);

        };

    }
})();