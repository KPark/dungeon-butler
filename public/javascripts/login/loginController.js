dungeonButlerModule.controller('login-controller', ['$scope', '$rootScope', '$http', '$location', '$cookies',
        function ($scope, $rootScope, $http, $location, $cookies) {
            $scope.login = function () {
                var data = { "username": $scope.usernameInput, "password": $scope.passwordInput };
                $http.post('/login', data).success(function (data) {
                    $cookies.loggedInUser = data.username;
                    $rootScope.loggedInUser = data.username;
                    $location.path('/characters');
                });
            };
            $scope.usernameInput = "";
            $scope.passwordInput = "";
            $rootScope.loggedInUser = $cookies.loggedInUser;
        }]
);

dungeonButlerModule.controller('logout-controller', ['$scope', '$rootScope', '$http', '$location', '$cookies',
        function ($scope, $rootScope, $http, $location, $cookies) {
            $scope.logout = function () {
                $cookies.loggedInUser = undefined;
                $rootScope.loggedInUser = undefined;
                $location.path('/');
            };
        }]
);