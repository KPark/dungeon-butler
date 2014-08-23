/**
 * Created by mathe_000 on 4/5/2014.
 */

var dungeonButlerApp = angular.module('dungeon-butler', [
    'ngRoute',
    'ngCookies',
    'dungeon-butler-controllers'
]);

dungeonButlerApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/characters', {
                templateUrl: 'characters',
                controller: 'character-controller'
            })
            .when('/characterCreate/:characterId', {
                templateUrl: 'characterCreate',
                controller: 'character-create-controller'
            })
            .when('/characterCreate/:userId', {
                templateUrl: 'characterCreate',
                controller: 'character-create-controller'
            });
    }]);

var dungeonButlerModule = angular.module('dungeon-butler-controllers', []);

dungeonButlerModule.controller('character-controller', ['$scope', '$routeParams', '$rootScope', '$http', '$location', '$cookies',
        function ($scope, $routeParams, $rootScope, $http, $location, $cookies) {
            if ($cookies.loggedInUser != "No User") {
                $http.post('/getCharacterList', { "userId": $cookies.loggedInUser }).success(function (data) {
                    $scope.characterTemplates = data;
                })
            }
            $scope.newCharacter = function () {
                $location.path('/characterCreate/' + $routeParams.username);
            };
            $scope.showCharacter = function (characterId) {
                $location.path('/characterCreate/' + characterId);
            };
            $scope.deleteCharacter = function (characterId) {
                alert("Not implemented yet.");
            };
        }
    ]
);