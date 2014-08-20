dungeonButlerModule.controller('character-create-controller', ['$scope', '$routeParams', '$http', '$location', 'raceSelection', 'classSelection',
        function ($scope, $routeParams, $http, $location, raceSelection, classSelection) {
            $scope.characterTemplates = [];
            $scope.races = [];
            $scope.classes = [];
            $scope.activeCharacter = {};
            $scope.currentTab = 'cc.races.html';
            $scope.currentRace = 'Dragonborn';
            $scope.currentClass = 'Paladin';
            $scope.skills = [
                { "name": "Acrobatics", score: "Dexterity" },
                { "name": "Arcana", score: "Intelligence" },
                { "name": "Athletics", score: "Strength" },
                { "name": "Bluff", score: "Charisma" },
                { "name": "Diplomacy", score: "Charisma" },
                { "name": "Dungeoneering", score: "Wisdom" },
                { "name": "Endurance", score: "Constitution" },
                { "name": "Heal", score: "Wisdom" },
                { "name": "History", score: "Intelligence" },
                { "name": "Insight", score: "Wisdom" },
                { "name": "Intimidate", score: "Charisma" },
                { "name": "Nature", score: "Wisdom" },
                { "name": "Perception", score: "Wisdom" },
                { "name": "Religion", score: "Intelligence" },
                { "name": "Stealth", score: "Dexterity" },
                { "name": "Streetwise", score: "Charisma" },
                { "name": "Thievery", score: "Dexterity" }
            ];

            $scope.init = function () {
                if ($routeParams.characterId != null) {
                    $http.post('/getCharacter', {'id': $routeParams.characterId}).success(function (characterData) {
                        $scope.activeCharacter = characterData;
                    });
                } else {
                    $scope.resetCharacter();
                }
                $http.post('/getRaces').success(function (data) {
                    $scope.races = data;
                    $scope.currentRace = $scope.races[0].name;
                });
                $http.post('/getClasses').success(function (data) {
                    $scope.classes = data;
                    $scope.currentClass = $scope.classes[0].name;
                })
            }
            $scope.pickRace = function (race) {
                raceSelection($scope.activeCharacter, race);
                $scope.currentTab = 'cc.classes.html';
            }
            $scope.pickBuild = function (build, selectedClass) {
                classSelection($scope.activeCharacter, build, selectedClass);
            }
            $scope.getNextRace = function (index) {
                if (index >= $scope.races.length) {
                    index = 0;
                } else if (index == -1) {
                    index = $scope.races.length - 1;
                }
                var newValue = $scope.races[index].name;
                $scope.currentRace = newValue;
            }
            $scope.getNextClass = function (index) {
                if (index >= $scope.classes.length) {
                    index = 0;
                } else if (index == -1) {
                    index = $scope.classes.length - 1;
                }
                var newValue = $scope.classes[index].name;
                $scope.currentClass = newValue;
            }
            $scope.goToRace = function (race) {
                $scope.currentRace = race;
            }
            $scope.goToClass = function (className) {
                $scope.currentClass = className;
            }
            $scope.getAbilityScore = function (abilityScore) {
                return getAbilityScore(abilityScore);
            }
            $scope.getAbilityModifier = function (scoreName) {
                return getAbilityModifier(scoreName);
            }
            $scope.getLeveLModifier = function () {
                return Math.floor($scope.activeCharacter.level / 2);
            }
            $scope.getBloodied = function () {
                return Math.floor($scope.activeCharacter.hp / 2);
            }
            $scope.getSurgeValue = function () {
                return Math.floor($scope.activeCharacter.hp / 4);
            }
            $scope.saveCharacter = function () {
                console.log($scope.activeCharacter);
                $http.post('/saveCharacterTemplate', $scope.activeCharacter).success(function (data) {
                    alert("Successfully saved character.");
                    $location.path('/characterCreate/' + $routeParams.userId + "/" + data._id);
                });
            }
            $scope.resetCharacter = function () {
                $scope.activeCharacter = {
                    userId: $routeParams.userId,
                    name: "New Character",
                    level: 1,
                    hp: 0,
                    healingSurges: 0,
                    abilityScores: [
                        { name: "Strength", base: 0, race: 0, class: 0 },
                        { name: "Constitution", base: 0, race: 0, class: 0 },
                        { name: "Dexterity", base: 0, race: 0, class: 0 },
                        { name: "Intelligence", base: 0, race: 0, class: 0 },
                        { name: "Wisdom", base: 0, race: 0, class: 0 },
                        { name: "Charisma", base: 0, race: 0, class: 0 }
                    ],
                    defenses: {
                        "Fortitude": 0,
                        "Reflex": 0,
                        "Will": 0
                    },
                    powers: [ ],
                    skills: [ ],
                    feats: [ ]
                }
                if ($routeParams.characterId) {
                    $scope.activeCharacter._id = $routeParams.characterId;
                }
                $scope.currentTab = 'cc.races.html';
            }
            $scope.goToCharacterSelect = function () {
                $location.path('/characters/' + $routeParams.userId);
            }
            $scope.isSkillTrained = function (skill) {
                for (var i in $scope.activeCharacter.skills) {
                    if (skill.name == $scope.activeCharacter.skills[i].name) {
                        return $scope.activeCharacter.skills[i].trained == 5;
                    }
                }
            }
            $scope.getSkillAbilityMod = function (skill) {
                for (var i in $scope.activeCharacter.abilityScores) {
                    if (skill.score == $scope.activeCharacter.abilityScores[i].name) {
                        return getAbilityModifier($scope.activeCharacter.abilityScores[i]) + $scope.getLeveLModifier();
                    }
                }
            }
            $scope.getSkillMiscBonus = function (skill) {
                for (var i in $scope.activeCharacter.skills) {
                    if (skill.name == $scope.activeCharacter.skills[i].name) {
                        return $scope.activeCharacter.skills[i].race;
                    }
                }
                return 0;
            }
            $scope.getFortitudeModifier = function () {
                return Math.max(getAbilityModifier($scope.activeCharacter.abilityScores[0]), getAbilityModifier($scope.activeCharacter.abilityScores[1]));
            }
            $scope.getReflexModifier = function () {
                return Math.max(getAbilityModifier($scope.activeCharacter.abilityScores[2]), getAbilityModifier($scope.activeCharacter.abilityScores[3]));
            }
            $scope.getWillModifier = function () {
                return Math.max(getAbilityModifier($scope.activeCharacter.abilityScores[4]), getAbilityModifier($scope.activeCharacter.abilityScores[5]));
            }
        }
    ]
);