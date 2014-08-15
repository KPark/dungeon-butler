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
            .when('/characters/:username', {
                templateUrl: 'characters',
                controller: 'character-controller'
            })
            .when('/loginForm', {
                templateUrl: 'loginForm',
                controller: 'login-controller'
            })
            .when('/characterCreate/:userId/:characterId', {
                templateUrl: 'characterCreate',
                controller: 'character-create-controller'
            })
            .when('/characterCreate/:userId', {
                templateUrl: 'characterCreate',
                controller: 'character-create-controller'
            })
            .otherwise({
                redirectTo: '/loginForm'
            });
    }]);

var dungeonButlerControllers = angular.module('dungeon-butler-controllers', []);

dungeonButlerControllers.controller('login-controller', ['$scope', '$rootScope', '$http', '$location', '$cookies',
        function ($scope, $rootScope, $http, $location, $cookies) {
//            if ($cookies.sessionId != null) {
//                $http.post('/login', { 'sessionId': $cookies.sessionId }).success(function (data) {
//                    $rootScope.loggedInUser.userName = data.username;
//                    $location.path('/characters/' + data.username);
//                });
//            }
            $scope.login = function () {
                var data = { "username": $scope.usernameInput, "password": $scope.passwordInput }
                $http.post('/login', data).success(function (data) {
                    $location.path('/characters/' + data.username);
                    $cookies.sessionId = data.sessionId;
                });
            };
            $scope.register = function () {
                console.log("I think you are drunk comp.");
                var data = { "username": $scope.usernameInput, "password": $scope.passwordInput }
                console.log("Data: " + data);
                $http.post('/register', data).success(function (data) {
                    $location.path('/characters/' + data.username);
                });
            };
            $scope.usernameInput = "";
            $scope.passwordInput = "";
            $rootScope.loggedInUser = { userName: "No User" };
        }]
);

dungeonButlerControllers.controller('character-controller', ['$scope', '$routeParams', '$rootScope', '$http', '$location', '$cookies',
        function ($scope, $routeParams, $rootScope, $http, $location, $cookies) {
            if ($routeParams.username != "No User") {
                $http.post('/getCharacterList', { "userId": $routeParams.username }).success(function (data) {
                    $scope.characterTemplates = data;
                })
            }
            $scope.newCharacter = function () {
                $location.path('/characterCreate/' + $routeParams.username);
            }
            $scope.showCharacter = function (characterId) {
                $location.path('/characterCreate/' + $routeParams.username + "/" + characterId);
            }
        }
    ]
);