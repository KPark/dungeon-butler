/**
 * Created by Matt on 4/29/2014.
 */

angular.module('dungeon-butler', []);

angular.module('dungeon-butler').controller('character-controller', ['$scope', '$http',
        function ($scope, $http) {
            $scope.hello = function() {
                alert('Work ya bastard');
            }
        }]
);