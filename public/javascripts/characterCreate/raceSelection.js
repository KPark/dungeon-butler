dungeonButlerModule.factory('raceSelection', ['$window', function (activeCharacter, race) {

    function setRaceAbilityScores(activeCharacter, race) {
        for (var i in activeCharacter.abilityScores) {
            var ability = activeCharacter.abilityScores[i];
            ability.race = 0;
        }
        for (var i in race.abilityScores) {
            var raceAbility = race.abilityScores[i];
            for (var j in activeCharacter.abilityScores) {
                var ability = activeCharacter.abilityScores[j];
                if (raceAbility.name == ability.name) {
                    ability.race = raceAbility.value;
                }
            }
        }
    }
    function setRacePowers(activeCharacter, race) {
        for(var i = activeCharacter.powers.length - 1; i >= 0; i--) {
            if (activeCharacter.powers[i].type == 'Class') {
                activeCharacter.powers.splice(i, 1);
            }
        }
        for (var i in race.traits) {
            var trait = race.traits[i];
            if (trait.power) {
                activeCharacter.powers.push({ name: trait.power, type: 'Class' });
            }
        }
    }
    function setRaceSkills(activeCharacter, race) {
        if (activeCharacter.class) {
            for (var i in activeCharacter.skills) {
                var skill = activeCharacter.skills[i];
                skill.race = 0;
                if (skill.race + skill.trained == 0) {
                    activeCharacter.skills.splice(i, 1);
                }
            }
        } else {
            activeCharacter.skills = [];
        }
        for (var i in race.skillBonus) {
            var raceSkill = race.skillBonus[i];
            var hasSkill = false;
            for (var j in activeCharacter.skills) {
                var skill = activeCharacter.skills[j];
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
    })
}])