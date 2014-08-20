dungeonButlerModule.controller('class-controller', ['$scope', '$rootScope', '$http', 'classSelection',
    function ($scope, $rootScope, $http, classSelection) {

        $scope.classes = [];
        $scope.currentClass = 'Paladin';

        $http.post('/getClasses', {}).success(function (data) {
            $scope.classes = data;
            $scope.currentClass = $scope.classes[0].name;
        });

        $scope.pickBuild = function (build, selectedClass) {
            classSelection($rootScope.activeCharacter, build, selectedClass);
        };

        $scope.getNextClass = function (index) {
            if (index >= $scope.classes.length) {
                index = 0;
            } else if (index == -1) {
                index = $scope.classes.length - 1;
            }
            $scope.currentClass = $scope.classes[index].name;
        };

        $scope.goToClass = function (className) {
            $scope.currentClass = className;
        }
    }
]);