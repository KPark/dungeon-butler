/**
 * Created by mathe_000 on 4/5/2014.
 */

angular.module('dungeon-butler', []);

angular.module('dungeon-butler').controller('login-controller', ['$scope', '$http',
    function ($scope, $http) {
        $scope.login = function () {
            var data = { "username": $scope.usernameInput, "password": $scope.passwordInput }
            $http.post('/login', data).success(function (data) {
                $scope.loggedInUser = data.username;
            });
        };
        $scope.register = function () {
            var data = { "username": $scope.usernameInput, "password": $scope.passwordInput }
            $http.post('/register', data).success(function (data) {
                $scope.loggedInUser = data.username;
            });
        };
        $scope.usernameInput = "";
        $scope.passwordInput = "";
        $scope.loggedInUser = "No User";
        $scope.templates = [
            { characterName: "Bob" }
        ];
    }]
);