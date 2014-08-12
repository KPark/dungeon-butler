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
            .when('/characterCreate/:characterId', {
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
//            if ($cookies.sessionId != null) {
//                $http.post('/login', { 'sessionId': $cookies.sessionId }).success(function (data) {
//                    $rootScope.loggedInUser.userName = data.username;
//                    $location.path('/characters/' + data.username);
//                });
//            }
            $scope.login = function () {
                var data = { "username": $scope.usernameInput, "password": $scope.passwordInput }
                $http.post('/login', data).success(function (data) {
                    console.log(data.username);
                    $location.path('/characters/' + data.username);
                    $cookies.sessionId = data.sessionId;
                });
            };
            $scope.register = function () {
                var data = { "username": $scope.usernameInput, "password": $scope.passwordInput }
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
                $http.post('/newCharacter', { "userId": $routeParams.username }).success(function (data) {
                    $location.path('/characterCreate/' + data);
                })
            }
            $scope.init = function () {
                if ($routeParams.characterId != null) {
                    $http.post('/getRaces').success(function (data) {
                        $scope.races = data;
                        $http.post('/getCharacter', {'id': $routeParams.characterId}).success(function (characterData) {
                            $scope.activeCharacter = characterData;
                        });
                    });
                }
            }
            $scope.pickRace = function (race) {
                $scope.activeCharacter.race = race;
                console.log($scope.activeCharacter);
            }
            $scope.characterTemplates = [];
            $scope.races = [];
            $scope.activeCharacter = {};
            $scope.tabs = [
                {
                    title: 'Race',
                    url: 'cc.races.html'
                }
            ];
            $scope.currentTab = 'cc.races.html';
        }
    ]
);