/**
 * Created by mathe_000 on 4/5/2014.
 */

var dungeonButlerApp = angular.module('dungeon-butler', [
    'ngRoute',
    'ngCookies',
    'dungeon-butler-controllers'
]);

dungeonButlerApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/characters', {
                templateUrl: 'characters',
                controller: 'character-controller'
            })
            .when('/loginForm', {
                templateUrl: 'loginForm',
                controller: 'login-controller'
            })
            .when('/characterCreate', {
                templateUrl: 'characterCreate',
                controller: 'character-controller'
            })
            .otherwise({
                redirectTo: '/loginForm'
            });
    }]);

var dungeonButlerControllers = angular.module('dungeon-butler-controllers', []);

dungeonButlerControllers.controller('login-controller', ['$scope', '$rootScope', '$http', '$location', '$cookies',
        function ($scope, $rootScope, $http, $location, $cookies) {
            if ($cookies.sessionId != null) {
                $http.post('/login', { 'sessionId': $cookies.sessionId }).success(function (data) {
                    $rootScope.loggedInUser.userName = data.username;
                    $location.path('/characters');
                });
            }
            $scope.login = function () {
                var data = { "username": $scope.usernameInput, "password": $scope.passwordInput }
                $http.post('/login', data).success(function (data) {
                    $rootScope.loggedInUser.userName = data.username;
                    $location.path('/characters');
                    $cookies.sessionId = data.sessionId;
                });
            };
            $scope.register = function () {
                var data = { "username": $scope.usernameInput, "password": $scope.passwordInput }
                $http.post('/register', data).success(function (data) {
                    $rootScope.loggedInUser.userName = data.username;
                    $location.path('/characters');
                });
            };
            $scope.usernameInput = "";
            $scope.passwordInput = "";
            $rootScope.loggedInUser = { userName: "No User" };
        }]
);

dungeonButlerControllers.controller('character-controller', ['$scope', '$rootScope', '$http', '$location', '$cookies',
        function ($scope, $rootScope, $http, $location, $cookies) {
            $scope.newCharacter = function () {
                $http.post('/getRaces', { "ruleSet": "dndv4"}).success(function (data) {
                    $rootScope.races = data;
                    $location.path('/characterCreate');
                })
            }
            $scope.characterTemplates = [
                {
                    firstName: "Gimli",
                    lastName: "Son of Gloin",
                    hp: "24"
                },
                {
                    firstName: "Harry",
                    lastName: "Potter",
                    hp: "14"
                }
            ]
        }
    ]
);