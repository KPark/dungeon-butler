dungeonButlerModule.controller('class-controller', ['$scope', '$rootScope', '$http', 'classSelection',
    function ($scope, $rootScope, $http, classSelection) {

        $scope.classes = [];
        $scope.currentClass = {};

        $http.post('/getClasses', {}).success(function (data) {
            $scope.classes = data;
            if ($rootScope.activeCharacter.class) {
                for (var i = 0; i < $scope.classes.length; i++) {
                    if ($scope.classes[i].name == $rootScope.activeCharacter.class) {
                        $scope.currentClass = $scope.classes[i];
                    }
                }
            } else {
                $scope.currentClass = $scope.classes[0];
            }
        });

        $scope.pickBuild = function (build) {
            classSelection($rootScope.activeCharacter, build, $scope.currentClass);
        };

        $scope.getNextClass = function (indexJump) {
            var index = 0;
            for (var i = 0; i < $scope.classes.length; i++) {
                if ($scope.classes[i].name == $scope.currentClass.name) {
                    index = i;
                }
            }
            index += indexJump;
            if (index >= $scope.classes.length) {
                index = 0;
            } else if (index == -1) {
                index = $scope.classes.length - 1;
            }
            $scope.currentClass = $scope.classes[index];
        };

        $scope.goToClass = function (className) {
            for (var i = 0; i < $scope.classes.length; i++) {
                if ($scope.classes[i].name == className) {
                    $scope.currentClass = $scope.classes[i];
                }
            }
        }
    }
]);