dungeonButlerModule.controller('power-filter-controller', ['$scope', '$rootScope', '$routeParams', '$http', '$location',
    function ($scope, $rootScope, $routeParams, $http, $location) {
        $scope.fields = [
            { "name": "Name", "searchField": "name", "inputValues": "String", "inputValue": null },
            { "name": "Race", "searchField": "requirements.race", "inputValues": [], "inputValue": null },
            { "name": "Class", "searchField": "requirements.class", "inputValues": [], "inputValue": null },
            { "name": "Level", "searchField": "requirements.level", "inputValues": "Integer", "inputValue": null },
            { "name": "Power Source", "searchField": "powerSource", "inputValues": "String", "inputValue": null },
            { "name": "Damage Type", "searchField": "damageType", "inputValues": "String", "inputValue": null },
            { "name": "Action Type", "searchField": "actionType", "inputValues": "String", "inputValue": null },
            { "name": "Range", "searchField": "range", "inputValues": "String", "inputValue": null },
            { "name": "Target", "searchField": "target", "inputValues": "String", "inputValue": null },
            { "name": "Attack", "searchField": "attack.attack", "inputValue": null, "inputValues": [ { "name": "Strength" }, { "name": "Dexterity" }, { "name": "Intelligence" }, { "name": "Wisdom" }, { "name": "Charisma" }, { "name": "Constitution" }]},
            { "name": "Defense", "searchField": "attack.defense", "inputValue": null, "inputValues": [ { "name": "AC" }, { "name": "Reflex" }, { "name": "Fortitude" }]},
            { "name": "Hit", "searchField": "hit.modifier", "inputValue": null, "inputValues": [ { "name": "Strength" }, { "name": "Dexterity" }, { "name": "Intelligence" }, {"name": "Wisdom" }, { "name": "Charisma" }, { "name": "Constitution" }]},
            { "name": "Has Special", "searchField": "special", "inputValues": "Boolean", "inputValue": null },
            { "name": "Has Effect", "searchField": "effect", "inputValues": "Boolean", "inputValue": null },
            { "name": "Has Miss", "searchField": "miss", "inputValues": "Boolean", "inputValue": null }
        ];
        $scope.powers = [];

        $scope.init = function() {
            $http.post('/getRaces', {}).success(function (data) {
                $scope.fields[1].inputValues = data;
            });
            $http.post('/getClasses', {}).success(function (data) {
                $scope.fields[2].inputValues = data;
            });
        };

        $scope.isArray = function(filter) {
            if (angular.isArray(filter.inputValues)) {
                return true;
            }
            return false;
        };

        $scope.findPowers = function() {
            var searchCriteria = {}
            for (var i = 0; i < $scope.fields.length; i++) {
                if ($scope.fields[i].inputValue != "" && $scope.fields[i].inputValue != null && $scope.fields[i].inputValue != "null" && $scope.fields[i].inputValues != "Boolean") {
                    if ($scope.fields[i].inputValues == "Integer") {
                        searchCriteria[$scope.fields[i].searchField] = parseInt($scope.fields[i].inputValue);
                    } else {
                        searchCriteria[$scope.fields[i].searchField] = $scope.fields[i].inputValue;
                    }
                } else if ($scope.fields[i].inputValue != null && $scope.fields[i].inputValues == "Boolean") {
                    searchCriteria[$scope.fields[i].searchField] = $scope.fields[i].inputValue;
                }
            }
            $http.post('/getPowersWithCriteria', searchCriteria).success(function (powers) {
                $scope.powers = powers;
            });
        }
    }
]);