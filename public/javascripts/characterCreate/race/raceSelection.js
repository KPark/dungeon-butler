dungeonButlerModule.factory('raceSelection', ['$window', function (activeCharacter, race) {

    function setRaceAbilityScores(activeCharacter, race) {
        var i;
        var ability;
        for (i = 0; i < activeCharacter.abilityScores.length; i++) {
            ability = activeCharacter.abilityScores[i];
            ability.race = 0;
        }
        for (i = 0; i < race.abilityScores.length; i++) {
            var raceAbility = race.abilityScores[i];
            for (var j = 0; j < activeCharacter.abilityScores.length; j++) {
                ability = activeCharacter.abilityScores[j];
                if (raceAbility.name == ability.name) {
                    ability.race = raceAbility.value;
                }
            }
        }
    }

    function setRacePowers(activeCharacter, race) {
        var i;
        for (i = activeCharacter.powers.length - 1; i >= 0; i--) {
            if (activeCharacter.powers[i].type == 'Class') {
                activeCharacter.powers.splice(i, 1);
            }
        }
        for (i = 0; i < race.traits.length; i++) {
            var trait = race.traits[i];
            if (trait.power) {
                activeCharacter.powers.push({ name: trait.power, type: 'Class' });
            }
        }
    }
    function setRaceSkills(activeCharacter, race) {
        var i;
        var j;
        var skill;
        if (activeCharacter.class) {
            for (i = activeCharacter.skills.length - 1; i >= 0; i--) {
                skill = activeCharacter.skills[i];
                skill.race = 0;
                if (skill.race + skill.trained == 0) {
                    activeCharacter.skills.splice(i, 1);
                }
            }
        } else {
            activeCharacter.skills = [];
        }
        for (i = 0; i < race.skillBonus.length; i++) {
            var raceSkill = race.skillBonus[i];
            var hasSkill = false;
            for (j = 0; j < activeCharacter.skills.length; i++) {
                skill = activeCharacter.skills[j];
                if (raceSkill.name == skill.name) {
                    skill.race = raceSkill.bonus;
                    hasSkill = true;
                }
            }
            if (!hasSkill) {
                activeCharacter.skills.push({name: raceSkill.name, race: raceSkill.bonus, trained: 0});
            }
        }
    }
    return(function(activeCharacter, race) {
        activeCharacter.race = race.name;
        setRaceAbilityScores(activeCharacter, race);
        setRacePowers(activeCharacter, race);
        setRaceSkills(activeCharacter, race);
    });
}]);