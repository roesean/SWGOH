var Character = function(name, urlName, description, power, strengthMod, agilityMod, intelligenceMod, strength, agility, intelligence, speed, physicalDamage, physicalCriticalRating, specialDamage, specialCriticalDamage, armorPenetration, resistancePenetration, potency, health, armor, resistance, tenacity, healthSteal, protection) {
  this.name = name;
  this.urlName = urlName;
  this.description = description;
  this.modifiers = {
    strengthMod: strengthMod,
    agilityMod: agilityMod,
    intelligenceMod: intelligenceMod
  };
  this.primary = {
    power: power,
    strength: strength,
    agility: agility,
    intelligence: intelligence
  };
  this.offensive = {
    speed: speed,
    physicalDamage: physicalDamage,
    physicalCriticalRating: physicalCriticalRating,
    specialDamage: specialDamage,
    specialCriticalDamage: specialCriticalDamage,
    armorPenetration: armorPenetration,
    resistancePenetration: resistancePenetration,
    potency: potency
  };
  this.defensive = {
    health: health,
    armor: armor,
    resistance: resistance,
    tenacity: tenacity,
    healthSteal: healthSteal,
    protection: protection
  };
  this.factions = [];
  this.abilityClasses = [];
  this.abilities = [];
}

var Ability = function(name, description, type, coolDown, imgUrl) {
  this.name = name;
  this.description = description;
  this.type = type;
  this.coolDown = coolDown;
  this.imgUrl = imgUrl;
}

var Gear = function() {

}

var Mod = function() {

}

var Ship = function() {

}

var User = function() {

}

module.exports = { Character, Ability, Gear, Mod, Ship, User }
