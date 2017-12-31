// Character
var CharacterPrimary = function(power, statPower, strength, agility, intelligence, strengthMod, agilityMod, intelligenceMod) {
  power = power;
  statPower = statPower;
  strength = strength;
  agility = agility;
  intelligence = intelligenc;
  strengthMod = strengthMod;
  agilityMod = agilityMod;
  intelligenceMod = intelligenceMod;
}

var CharacterGeneral = function(health, protection, speed, criticalDamage, potency, tenacity, healthSteal) {
  this.health = health;
  this.protection = protection;
  this.speed = speed;
  this.criticalDamage = criticalDamage;
  this.potency = potency;
  this.tenacity = tenacity;
  this.healthSteal = healthSteal;
}

var CharacterOffense = function(physicalDamage, physicalCriticalChance, armorPenetration, physicalAccuracy, specialDamage, specialCriticalChance, resistancePenetration, specialAccuracy) {
  this.physicalDamage = physicalDamage;
  this.physicalCriticalChance = physicalCriticalChance;
  this.armorPenetration = armorPenetration;
  this.physicalAccuracy = physicalAccuracy;
  this.specialDamage = specialDamage;
  this.specialCriticalChance = specialCriticalChance;
  this.resistancePenetration = resistancePenetration;
  this.specialAccuracy = specialAccuracy;
}

var CharacterDefense = function(armor, dodgeChance, physicalCriticalAvoidance, resistance, deflectionChance, specialCriticalAvoidance) {
  this.armor = armor;
  this.dodgeChance = dodgeChance;
  this.physicalCriticalAvoidance = physicalCriticalAvoidance;
  this.resistance = resistance;
  this.deflectionChance = deflectionChance;
  this.specialCriticalAvoidance = specialCriticalAvoidance;
}

var Character = function(name, urlName, primary, general, offense, defense) {
  this.name = name;
  this.urlName = urlName;
  this.primary = primary;
  this.offense = offense;
  this.defense = defense;
  this.factions = [];
  this.abilityClasses = [];
  this.abilities = [];
  this.gearNeeded = [];
  this.mods = [];
}

var CharacterSkill = function(name, description, type, coolDown, imgUrl, maxLevel, currentLevel) {
  this.name = name;
  this.description = description;
  this.type = type;
  this.coolDown = coolDown;
  this.imgUrl = imgUrl;
  this.maxLevel = maxLevel;
  this.currentLevel = currentLevel;
}

var CharacterGear = function() {

}

var CharScrape = function(id, url) {
  this.id = id;
  this.url = url;
}

var CharacterMod = function() {

}

// Ships
var Ship = function() {

}

// Profile
var User = function() {

}

module.exports = {
  CharacterPrimary,
  CharacterGeneral,
  CharacterOffense,
  CharacterDefense,
  Character,
  CharacterSkill,
  CharacterGear,
  CharScrape,
  CharacterMod,
  Ship,
  User
}
