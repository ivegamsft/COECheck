(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewAssessmentController', NewAssessmentController);

    NewAssessmentController.$inject = ['$scope', '$window', '$location', '$log', 'GroupFactory', 'SchemaFactory', 'AssessmentFactory', '$uibModal'];
    function NewAssessmentController($scope, $window, $location, $log, GroupFactory, SchemaFactory, AssessmentFactory, $uibModal) {
            var vm = this;


            activate();
        
            ////////////////
        
            function activate() {

                $log.info('NewAssessmentController activated');

                // instantiate object to hold assessment values
                $scope.newAssessment = {
                    assessment: {}
                };

                // retrieve rubric data
                getData();

                // setup debug mode
                setupDebugMode();

            }

            $scope.answer = function (section, group, answer) {
            
                // store the selected answer in the scope
                // check first if value exists for toggle behavior
                if ($scope.newAssessment.assessment[section][group].title == answer.title) {
                
                    // a value exists, clear the object
                    $scope.newAssessment.assessment[section][group] = {};

                }
                else {
                
                    // a value does not exist for this option
                    // add the selected value to newAssessment object
                    $scope.newAssessment.assessment[section][group] = answer;

                }

            };

            $scope.submitAssessment = function () {
            
                // create a new assessment with the Assessment Factory
                AssessmentFactory.createAssessment($scope.newAssessment).then(function (response) {

                    $log.log('Finished posting new assessment');

                    // redirect user to the review assessment page
                    $location.path("assessments/" + response.id);

                });

            };

            $scope.cancelAssessment = function () {
                $window.location = '/#/home';
            };

            $scope.calculateAverage = function () {
            
                // define a spot in the model to hold scores
                $scope.newAssessment.score = {};
            
                // calculate the overall average
                calculateAverageOverall();
                            
                // loop through each of the sections and pass to parsing functions
                $.each($scope.newAssessment.assessment, function (section, sectionValues) {

                    calculateAverageSection(section, sectionValues);

                });

            };

            $scope.selectGroup = function (group) {
                $scope.newAssessment.group = group.title;
            };

            $scope.selectGroupNew = function () {
                alert('Coming Soon');
            };

            $scope.$watch('groupTypeahead', function (val) {
                if (val === "") {
                    setupNewAssessmentObject();
                }
            });

            $scope.openNewGroupModal = function () {

                var modalInstance = $uibModal.open({
                    templateUrl: '/app/layout/modal/group-new/group-new.modal.html',
                    controller: 'GroupNewModalController',
                    size: 'sm'
                });

                modalInstance.result.then(function (newGroup) {
                    $scope.newAssessment.group = newGroup.title;
                    $scope.groupTypeahead = newGroup.title;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };

            function getData() {

                $scope.loadingGroups = true;

                // get all Groups
                GroupFactory.getData().then(function (results) {
                
                    // store data in scope
                    $scope.groups = results;

                    // hide loading indicator
                    $scope.loadingGroups = false;

                });
            
                // get rubric questions
                SchemaFactory.getData().then(function (results) {

                    $scope.rubricData = results;

                    setupNewAssessmentObject();

                });

            }

            function setupNewAssessmentObject() {         

                // instantiate an object to hold a new assessment
                $scope.newAssessment = {
                    version: $scope.rubricData.version,
                    author: {
                        userName: $scope.userInfo.userName,
                        name: $scope.userInfo.profile.name,
                        upn: $scope.userInfo.profile.upn
                    },
                    created: new Date().toISOString(),
                    assessment: {},
                    deleted: false
                };
            
                // scaffold out a JSON object for a new assessment
                // loop through each section and then subgroup, establishing objects for each 
                $.each($scope.rubricData.values, function (i, obj) {

                    $scope.newAssessment.assessment[i] = {};

                    $.each(obj, function (j, obj2) {
                        $scope.newAssessment.assessment[i][j] = {};
                    });

                });

            }

            function calculateAverageSection(section, sectionValues) {

                // calculates an average for a particular section
                        
                var sectionAnswers = [];
                var sectionSum = 0;

                $.each(sectionValues, function (group, groupValue) {
                    
                    // push all values to the array to calculate an overall score
                    if (groupValue.value >= 0) {
                        sectionAnswers.push(groupValue.value);
                    }

                });

                // calculate a sum of all values
                for (var i = 0; i < sectionAnswers.length; i++) {
                    sectionSum += parseInt(sectionAnswers[i]);
                }
            
                // calculate an average with the sum and number of values
                var sectionScore = +(sectionSum / sectionAnswers.length).toFixed(2);
            
                //if (isNaN(sectionScore)) {}
                $scope.newAssessment.score[section] = sectionScore;

            }

            function calculateAverageOverall() {
            
                // calculates the overall average for the entire assessment
            
                var overallAnswers = [];
                var sum = 0;

                $.each($scope.newAssessment.assessment, function (section, sectionValues) {

                    $.each(sectionValues, function (group, groupValue) {
                    
                        // push all values to the array to calculate an overall score
                        if (groupValue.value >= 0) {
                            overallAnswers.push(groupValue.value);
                        }

                    });

                });
            
                // calculate a sum of all values
                for (var i = 0; i < overallAnswers.length; i++) {
                    sum += parseInt(overallAnswers[i]);
                }
            
                // calculate an average with the sum and number of values
                var scoreOverall = +(sum / overallAnswers.length).toFixed(2);
            
                // update the newAssessment object
                $scope.newAssessment.score.overall = scoreOverall;

            }

            function setupDebugMode() {

                if ($location.search().debug) {
                    $scope.debug = true;
                    console.info('Debug mode initiated');
                }

            }
        }
        
})();