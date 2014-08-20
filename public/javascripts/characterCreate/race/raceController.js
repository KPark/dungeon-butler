dungeonButlerModule.controller('race-controller', ['$scope', '$rootScope', '$http', 'raceSelection',
    function ($scope, $rootScope, $http, raceSelection) {

        $scope.races = [];
        $scope.currentRace = 'Dragonborn';

        $http.post('/getRaces', {}).success(function (data) {
            $scope.races = data;
            $scope.currentRace = $scope.races[0].name;
        });

        $scope.pickRace = function (race) {
            raceSelection($rootScope.activeCharacter, race);
            $rootScope.currentTab = 'cc.classes.html';
        };
        $scope.getNextRace = function (index) {
            if (index >= $scope.races.length) {
                index = 0;
            } else if (index == -1) {
                index = $scope.races.length - 1;
            }
            $scope.currentRace = $scope.races[index].name;
        };
        $scope.goToRace = function (race) {
            $scope.currentRace = race;
        };
    }
]);