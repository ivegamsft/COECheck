(function () {
    'use strict';
    
    angular
        .module('app')
		.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        
            $routeProvider
                .when('/', {
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    requireADLogin: true
                })
                .when('/login', {
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginController'
                })
                .when('/groups', {
                    templateUrl: 'app/groups/groups.html',
                    controller: 'GroupsController',
                    requireADLogin: true
                })
                .when('/groups/:name', {
                    templateUrl: 'app/groups/group/group.html',
                    controller: 'GroupController',
                    requireADLogin: true
                })
                .when('/assessments/new', {
                    templateUrl: 'app/assessments/new/new-assessment.html',
                    controller: 'NewAssessmentController',
                    requireADLogin: true
                })
                .when('/assessments/:id', {
                    templateUrl: 'app/assessments/review/assessment-review.html',
                    controller: 'AssessmentReviewController',
                    requireADLogin: true
                })
                .when('/assessments/:id/print', {
                    templateUrl: 'app/assessments/print/assessment-print.html',
                    controller: 'AssessmentPrintController',
                    requireADLogin: true
                })
                .when('/admin', {
                    templateUrl: 'app/admin/admin.html',
                    controller: 'AdminController',
                    requireADLogin: true
                })
                .when('/help', {
                    templateUrl: 'app/help/help.html',
                    requireADLogin: true
                })
                .otherwise({
                    redirectTo: '/'
                });

    }]);
    
})();