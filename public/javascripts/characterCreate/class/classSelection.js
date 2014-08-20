dungeonButlerModule.factory('classSelection', ['$window', function (activeCharacter, build, selectedClass) {


    function setClassBuildSkills(activeCharacter, build) {
        var j;
        var i;
        var skill;
        for (j = activeCharacter.skills.length - 1; j >= 0; j--) {
            skill = activeCharacter.skills[j];
            skill.trained = 0;
            if (skill.trained + skill.race == 0) {
                activeCharacter.skills.splice(j, 1);
            }
        }
        for (i = 0; i < build.skills.length; i++) {
            var classSkill = build.skills[i];
            var hasSkill = false;
            for (j = 0; j < activeCharacter.skills.length; j++) {
                skill = activeCharacter.skills[j];
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
    function setClassBuildAbilityScores(activeCharacter, build, selectedClass) {
        var hp = selectedClass.hitPoints.base;
        var healingSurges = selectedClass.healingSurge.base;
        for (var i = 0; i < build.abilityScores.length; i++) {
            var classAbility = build.abilityScores[i];
            for (var j = 0; j < activeCharacter.abilityScores.length; j++) {
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
        var i;
        for(i = activeCharacter.powers.length - 1; i >= 0; i--) {
            if (activeCharacter.powers[i].type !== 'Class') {
                activeCharacter.powers.splice(i, 1);
            }
        }
        for (i = 0; i < build.powers.length; i++) {
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
        for (var i = 0; i < selectedClass.defenseBonus.length; i++) {
            var defense = selectedClass.defenseBonus[i];
            activeCharacter.defenses[defense.name] = defense.bonus;
        }
    })
}]);
