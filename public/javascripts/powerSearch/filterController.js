dungeonButlerModule.controller('power-filter-controller', ['$scope', '$rootScope', '$routeParams', '$http', '$location',
    function ($scope, $rootScope, $routeParams, $http, $location) {
        $scope.fields = [
            { "name": "Name", "searchField": "name", "inputValues": "String", "inputValue": null },
            { "name": "Type", "searchField": "type", "inputValues": ["at-will", "encounter", "daily"], "inputValue": null },
            { "name": "Race", "searchField": "requirements.race", "inputValues": [], "inputValue": null },
            { "name": "Class", "searchField": "requirements.class", "inputValues": [], "inputValue": null },
            { "name": "Level", "searchField": "requirements.level", "inputValues": "Integer", "inputValue": null },
            { "name": "Power Source", "searchField": "powerSource", "inputValues": "String", "inputValue": null },
            { "name": "Damage Type", "searchField": "damageType", "inputValues": "String", "inputValue": null },
            { "name": "Action Type", "searchField": "actionType", "inputValues": [ "Minor", "Standard", "Move" ], "inputValue": null },
            { "name": "Range", "searchField": "range", "inputValues": "String", "inputValue": null },
            { "name": "Target", "searchField": "target", "inputValues": "String", "inputValue": null },
            { "name": "Attack", "searchField": "attack.attack", "inputValue": null, "inputValues": [ "Strength", "Dexterity", "Intelligence", "Wisdom", "Charisma", "Constitution"]},
            { "name": "Defense", "searchField": "attack.defense", "inputValue": null, "inputValues": [ "AC", "Reflex", "Fortitude" ]},
            { "name": "Hit", "searchField": "hit.modifier", "inputValue": null, "inputValues": [ "Strength", "Dexterity", "Intelligence", "Wisdom", "Charisma", "Constitution" ]}
        ];
        $scope.powers = [];
        $scope.editPower = {};
        $scope.showEdit = false;

        $scope.init = function() {
            $http.post('/getRaces', {}).success(function (data) {
                var inputValues = [];
                for (var i = 0; i < data.length; i++) {
                    inputValues.push(data[i].name);
                }
                $scope.fields[2].inputValues = inputValues;
            });
            $http.post('/getClasses', {}).success(function (data) {
                var inputValues = [];
                for (var i = 0; i < data.length; i++) {
                    inputValues.push(data[i].name);
                }
                $scope.fields[3].inputValues = inputValues;
            });
            jQuery("#editPowerDialog").dialog({
                width: 600,
                autoOpen: false,
                modal: true
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

        $scope.openEditPowerDialog = function(power) {
            $scope.editPower = power;
            $scope.showEdit = true;
        };

        $scope.newPower = function() {
            $scope.editPower = {};
            $scope.showEdit = true;
        }

        $scope.savePower = function(power) {
            $http.post('/savePower', power).success(function (data) {
                alert("Power saved successfully.  If this is a new power, you will need to re-search to view.");
                $scope.showEdit = false;
            }).error(function () {
                alert("An unexpected error occurred... Need better error handling, but talk to Matt.");
            });
        }
    }
]);