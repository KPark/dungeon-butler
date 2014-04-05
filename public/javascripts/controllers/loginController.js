/**
 * Created by mathe_000 on 4/5/2014.
 */

var dungeonButlerApp = angular.module('dungeon-butler', []);

dungeonButlerApp.controller('login-controller', ['$scope', '$http',
    function ($scope, $http) {
        $scope.login = function () {
            var data = { "username": $scope.usernameInput, "password": $scope.passwordInput }
            $http.post('/login', data).success(function (data) {
                $scope.loggedInUser = data.username;
            })
        };
        $scope.usernameInput = "";
        $scope.passwordInput = "";
        $scope.loggedInUser = "No User";
    }]
);