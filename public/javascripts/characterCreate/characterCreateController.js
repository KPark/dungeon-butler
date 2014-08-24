dungeonButlerModule.controller('character-create-controller', ['$scope', '$rootScope', '$routeParams', '$http', '$location',
        function ($scope, $rootScope, $routeParams, $http, $location) {
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

            $scope.powers = [];

            $scope.resetCharacter = function () {
                var oldId = null;
                if ($rootScope.activeCharacter) {
                    $rootScope.activeCharacter._id;
                }
                $rootScope.activeCharacter = {
                    userId: $rootScope.loggedInUser,
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
                    defenses: { "Fortitude": 0, "Reflex": 0, "Will": 0 },
                    powers: [ ],
                    skills: [ ],
                    feats: [ ]
                };
                if (oldId) {
                    $rootScope.activeCharacter._id = oldId;
                }
                $rootScope.currentTab = 'cc.races.html';
            };

            $scope.isSkillTrained = function (skill) {
                for (var i = 0; i < $rootScope.activeCharacter.skills.length; i++) {
                    if (skill.name == $rootScope.activeCharacter.skills[i].name) {
                        return $rootScope.activeCharacter.skills[i].trained == 5;
                    }
                }
            };

            $scope.getSkillAbilityMod = function (skill) {
                for (var i = 0; i < $rootScope.activeCharacter.abilityScores.length; i++) {
                    if (skill.score == $rootScope.activeCharacter.abilityScores[i].name) {
                        return $scope.getAbilityModifier($rootScope.activeCharacter.abilityScores[i]) + $scope.getLeveLModifier();
                    }
                }
            };

            $scope.getSkillMiscBonus = function (skill) {
                for (var i = 0; i < $rootScope.activeCharacter.skills.length; i++) {
                    if (skill.name == $rootScope.activeCharacter.skills[i].name) {
                        return $rootScope.activeCharacter.skills[i].race;
                    }
                }
                return 0;
            };

            $scope.goToCharacterSelect = function () {
                $location.path('/characters');
            };

            $scope.getAbilityScore = function (abilityScore) {
                return abilityScore.base + abilityScore.race + abilityScore.class;
            };

            $scope.getAbilityModifier = function (scoreName) {
                var score = $scope.getAbilityScore(scoreName);
                var startingModifier = -5;
                return Math.floor(startingModifier + (score / 2));
            };

            $scope.getLeveLModifier = function () {
                return Math.floor($rootScope.activeCharacter.level / 2);
            };

            $scope.getBloodied = function () {
                return Math.floor($rootScope.activeCharacter.hp / 2);
            };

            $scope.getSurgeValue = function () {
                return Math.floor($scope.activeCharacter.hp / 4);
            };

            $scope.getDefenseModifier = function (score1, score2) {
                return Math.max($scope.getAbilityModifier(score1), $scope.getAbilityModifier(score2));
            };

            $(document).ready(function() {
                if (!$rootScope.currentTab) {
                    $rootScope.currentTab = 'cc.races.html';
                }
                if ($routeParams.characterId != null && $routeParams.characterId != 'undefined') {
                    $http.post('/getCharacter', {'id': $routeParams.characterId}).success(function (characterData) {
                        $rootScope.activeCharacter = characterData;
                    });
                } else {
                    $scope.resetCharacter();
                }
            });

            $scope.saveCharacter = function () {
                console.log($rootScope.activeCharacter);
                $http.post('/saveCharacterTemplate', $rootScope.activeCharacter).success(function (data) {
                    alert("Successfully saved character.");
                    $location.path('/characterCreate/' + data._id);
                }).error(function () {
                    alert("An unexpected error occurred... Need better error handling, but talk to Matt.");
                });
            };

            $scope.getSummary = function () {
                var powers = [];
                for (var i = 0; i < $rootScope.activeCharacter.powers.length; i++) {
                    powers.push($rootScope.activeCharacter.powers[i].name);
                }
                $http.post('/getPowers', powers).success(function (powers) {
                    $scope.powers = powers;
                    console.log($scope.powers);
                    $scope.currentTab = 'cc.summary.html';
                });
            }
        }
    ]
);