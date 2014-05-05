/**
 * Created by mathe_000 on 4/5/2014.
 */

var dungeonButlerApp = angular.module('dungeon-butler', [
    'ngRoute',
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
            .otherwise({
                redirectTo: '/loginForm'
            });
    }]);

var dungeonButlerControllers = angular.module('dungeon-butler-controllers', []);

dungeonButlerControllers.controller('login-controller', ['$scope', '$rootScope', '$http', '$location',
        function ($scope, $rootScope, $http, $location) {
            $scope.login = function () {
                var data = { "username": $scope.usernameInput, "password": $scope.passwordInput }
                $http.post('/login', data).success(function (data) {
                    $rootScope.loggedInUser.userName = data.username;
                    $location.path('/characters');
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

dungeonButlerControllers.controller('character-controller', ['$scope', '$rootScope', '$http',
        function ($scope, $rootScope, $http) {
            $scope.characterTemplates = [
                { characterName: "Bob" }
            ]
        }]
);