dungeonButlerModule.factory('classSelection', ['$window', function (activeCharacter, build, selectedClass) {


    function setClassBuildSkills(activeCharacter, build) {
        for (var j = activeCharacter.skills.length - 1; j >= 0; j--) {
            var skill = activeCharacter.skills[j];
            skill.trained = 0;
            if (skill.trained + skill.race == 0) {
                activeCharacter.skills.splice(j, 1);
            }
        }
        for (var i in build.skills) {
            var classSkill = build.skills[i];
            var hasSkill = false;
            for (var j in activeCharacter.skills) {
                var skill = activeCharacter.skills[j];
                if (classSkill.name == skill.name) {
                    skill.trained = 5;
                    hasSkill = true;
                }
            }
            if (!hasSkill) {
                activeCharacter.skills.push({name: classSkill.name, race: 0, trained: 5});
            }
        }
    }
    function setClassBuildAbilityScores(activeCharacter, build, selectedClass, hp) {
        var hp = selectedClass.hitPoints.base;
        var healingSurges = selectedClass.healingSurge.base;
        for (var i in build.abilityScores) {
            var classAbility = build.abilityScores[i];
            for (var j in activeCharacter.abilityScores) {
                var ability = activeCharacter.abilityScores[j];
                if (classAbility.name == ability.name) {
                    ability.class = classAbility.score;
                    if (selectedClass.hitPoints.score == ability.name) {
                        hp += getAbilityScore(ability);
                    }
                    if (selectedClass.healingSurge.modifier == ability.name) {
                        healingSurges += getAbilityModifier(ability);
                    }
                }
            }
        }
        activeCharacter.hp = hp;
        activeCharacter.healingSurges = healingSurges;
    }
    function setClassBuildPowers(activeCharacter, build) {
        for(var i = activeCharacter.powers.length - 1; i >= 0; i--) {
            if (activeCharacter.powers[i].type !== 'Class') {
                activeCharacter.powers.splice(i, 1);
            }
        }
        for (var i in build.powers) {
            var power = build.powers[i];
            activeCharacter.powers.push({ name: power.name });
        }
    }

    return(function(activeCharacter, build, selectedClass) {

        activeCharacter.class = selectedClass.name;
        setClassBuildSkills(activeCharacter, build);
        setClassBuildAbilityScores(activeCharacter, build, selectedClass);
        setClassBuildPowers(activeCharacter, build);
        activeCharacter.feats = build.feats;
        console.log(selectedClass);
        for (i in selectedClass.defenseBonus) {
            var defense = selectedClass.defenseBonus[i];
            activeCharacter.defenses[defense.name] = defense.bonus;
        }
    })
}]);
