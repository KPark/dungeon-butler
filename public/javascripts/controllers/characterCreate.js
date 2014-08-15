dungeonButlerControllers.controller('character-create-controller', ['$scope', '$routeParams', '$rootScope', '$http', '$location', '$cookies',
        function ($scope, $routeParams, $rootScope, $http, $location, $cookies) {
            $scope.characterTemplates = [];
            $scope.races = [];
            $scope.classes = [];
            $scope.activeCharacter = {};
            $scope.currentTab = 'cc.races.html';
            $scope.currentRace = 'Dragonborn';
            $scope.currentClass = 'Paladin';

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
                $scope.activeCharacter.race = race.name;
                setRaceAbilityScores(race);
                setRacePowers(race);
                setRaceSkills(race);
                $scope.currentTab = 'cc.classes.html';
            }
            $scope.pickBuild = function (build, selectedClass) {
                var hp = selectedClass.hitPoints.base;
                $scope.activeCharacter.class = $scope.currentClass;
                setClassBuildSkills(build);
                hp = setClassBuildAbilityScores(build, selectedClass, hp);
                setClassBuildPowers(build);
                $scope.activeCharacter.feats = [{ name: build.feat }];
                $scope.activeCharacter.hp = hp;
            }
            $scope.getNextRace = function (index) {
                var newValue = $scope.races[index].name;
                $scope.currentRace = newValue;
            }
            $scope.getNextClass = function (index) {
                var newValue = $scope.classes[index].name;
                $scope.currentClass = newValue;
            }
            $scope.getAbilityScore = function (abilityScore) {
                return abilityScore.base + abilityScore.race + abilityScore.class;
            }
            $scope.getAbilityModifier = function (scoreName) {
                var score = $scope.getAbilityScore(scoreName);
                var startingModifier = -5;
                return Math.floor(startingModifier + (score / 2));
            }
            $scope.saveCharacter = function () {
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
                    abilityScores: [
                        { name: "Strength", base: 0, race: 0, class: 0 },
                        { name: "Constitution", base: 0, race: 0, class: 0 },
                        { name: "Dexterity", base: 0, race: 0, class: 0 },
                        { name: "Intelligence", base: 0, race: 0, class: 0 },
                        { name: "Wisdom", base: 0, race: 0, class: 0 },
                        { name: "Charisma", base: 0, race: 0, class: 0 }
                    ],
                    powers: [ ],
                    skills: [ ],
                    feats: [ ]
                }
                $scope.currentTab = 'cc.races.html';
            }
            $scope.goToCharacterSelect = function () {
                $location.path('/characters/' + $routeParams.userId);
            }

            function setRaceAbilityScores(race) {
                for (var i in $scope.activeCharacter.abilityScores) {
                    var ability = $scope.activeCharacter.abilityScores[i];
                    ability.race = 0;
                }
                for (var i in race.abilityScores) {
                    var raceAbility = race.abilityScores[i];
                    for (var j in $scope.activeCharacter.abilityScores) {
                        var ability = $scope.activeCharacter.abilityScores[j];
                        if (raceAbility.name == ability.name) {
                            ability.race = raceAbility.value;
                        }
                    }
                }
            }
            function setRacePowers(race) {
                for(var i = $scope.activeCharacter.powers.length - 1; i >= 0; i--) {
                    if ($scope.activeCharacter.powers[i].type == 'Class') {
                        $scope.activeCharacter.powers.splice(i, 1);
                    }
                }
                for (var i in race.traits) {
                    var trait = race.traits[i];
                    if (trait.power) {
                        $scope.activeCharacter.powers.push({ name: trait.power, type: 'Class' });
                    }
                }
            }
            function setRaceSkills(race) {
                if ($scope.activeCharacter.class) {
                    for (var i in $scope.activeCharacter.skills) {
                        var skill = $scope.activeCharacter.skills[i];
                        skill.race = 0;
                        if (skill.race + skill.trained == 0) {
                            $scope.activeCharacter.skills.splice(i, 1);
                        }
                    }
                } else {
                    $scope.activeCharacter.skills = [];
                }
                for (var i in race.skillBonus) {
                    var raceSkill = race.skillBonus[i];
                    var hasSkill = false;
                    for (var j in $scope.activeCharacter.skills) {
                        var skill = $scope.activeCharacter.skills[j];
                        if (raceSkill.name == skill.name) {
                            skill.race = raceSkill.bonus;
                            hasSkill = true;
                        }
                    }
                    if (!hasSkill) {
                        $scope.activeCharacter.skills.push({name: raceSkill.name, race: raceSkill.bonus, trained: 0});
                    }
                }
            }
            function setClassBuildSkills(build) {
                for (var j = $scope.activeCharacter.skills.length - 1; j >= 0; j--) {
                    var skill = $scope.activeCharacter.skills[j];
                    skill.trained = 0;
                    if (skill.trained + skill.race == 0) {
                        $scope.activeCharacter.skills.splice(j, 1);
                    }
                }
                for (var i in build.skills) {
                    var classSkill = build.skills[i];
                    var hasSkill = false;
                    for (var j in $scope.activeCharacter.skills) {
                        var skill = $scope.activeCharacter.skills[j];
                        if (classSkill.name == skill.name) {
                            skill.trained = 5;
                            hasSkill = true;
                        }
                    }
                    if (!hasSkill) {
                        $scope.activeCharacter.skills.push({name: classSkill.name, race: 0, trained: 5});
                    }
                }
            }
            function setClassBuildAbilityScores(build, selectedClass, hp) {
                for (var i in build.abilityScores) {
                    var classAbility = build.abilityScores[i];
                    for (var j in $scope.activeCharacter.abilityScores) {
                        var ability = $scope.activeCharacter.abilityScores[j];
                        if (classAbility.name == ability.name) {
                            ability.class = classAbility.score;
                            if (selectedClass.hitPoints.score == ability.name) {
                                hp += $scope.getAbilityScore(ability);
                            }
                        }
                    }
                }
                return hp;
            }
            function setClassBuildPowers(build) {
                for(var i = $scope.activeCharacter.powers.length - 1; i >= 0; i--) {
                    if ($scope.activeCharacter.powers[i].type !== 'Class') {
                        $scope.activeCharacter.powers.splice(i, 1);
                    }
                }
                for (var i in build.powers) {
                    var power = build.powers[i];
                    $scope.activeCharacter.powers.push({ name: power.name });
                }
            }
        }
    ]
);