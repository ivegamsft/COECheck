(function () {
    'use strict';

    angular
        .module('app')
        .filter('transformScore', TransformScoreFilter);

    function TransformScoreFilter() {

        return function (score) {

            // for a given numeric score, determine the textual maturity level
            
            if (score >= 1 && score < 1.74) {
                return 'Basic';
            }

            if (score >= 1.75 && score < 2.49) {
                return 'Standardized';
            }

            if (score >= 2.5 && score < 3.24) {
                return 'Advanced';
            }

            if (score >= 3.25 && score <= 4) {
                return 'Dynamic';
            }

        };

    }
})();