function getAbilityScore(abilityScore) {
    return abilityScore.base + abilityScore.race + abilityScore.class;
}

function getAbilityModifier(abilityScore) {
    var score = getAbilityScore(abilityScore);
    var startingModifier = -5;
    return Math.floor(startingModifier + (score / 2));
}