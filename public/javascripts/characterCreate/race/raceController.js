dungeonButlerModule.controller('race-controller', ['$scope', '$rootScope', '$http', 'raceSelection',
    function ($scope, $rootScope, $http, raceSelection) {

        $scope.races = [];
        $scope.currentRace = {};

        $http.post('/getRaces', {}).success(function (data) {
            $scope.races = data;
            if ($rootScope.activeCharacter.race) {
                for (var i = 0; i < $scope.races.length; i++) {
                    if ($scope.races[i].name == $rootScope.activeCharacter.race) {
                        $scope.currentRace = $scope.races[i];
                    }
                }
            } else {
                $scope.currentRace = $scope.races[0];
            }
        });

        $scope.pickRace = function () {
            raceSelection($rootScope.activeCharacter, $scope.currentRace);
            $rootScope.currentTab = 'cc.classes.html';
        };
        $scope.getNextRace = function (indexJump) {
            var index = 0;
            for (var i = 0; i < $scope.races.length; i++) {
                if ($scope.races[i].name == $scope.currentRace.name) {
                    index = i;
                }
            }
            index += indexJump;
            if (index >= $scope.races.length) {
                index = 0;
            } else if (index == -1) {
                index = $scope.races.length - 1;
            }
            $scope.currentRace = $scope.races[index];
        };
        $scope.goToRace = function (race) {
            for (var i = 0; i < $scope.races.length; i++) {
                if ($scope.races[i].name == race) {
                    $scope.currentRace = $scope.races[i];
                }
            }
        };
    }
]);