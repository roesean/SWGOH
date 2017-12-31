// Character
var Character = function(name, urlName, imgUrl, description, gearLevel, primary, general, offense, defense) {
  this.name = name;
  this.urlName = urlName;
  this.imgUrl = imgUrl;
  this.description = description;
  this.gearLevel = gearLevel;
  this.primary = primary;
  this.general = general;
  this.offense = offense;
  this.defense = defense;
  this.factions = [];
  this.abilityClasses = [];
  this.abilities = [];
  this.gearNeeded = [];
  this.gearEquipped = [];
  this.mods = [];
}

var CharacterPrimary = function(power, statPower, strength, agility, intelligence, strengthMod, agilityMod, intelligenceMod) {
  this.power = power;
  this.statPower = statPower;
  this.strength = strength;
  this.agility = agility;
  this.intelligence = intelligence;
  this.strengthMod = strengthMod;
  this.agilityMod = agilityMod;
  this.intelligenceMod = intelligenceMod;
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

var CharacterOffense = function(physicalDamage, physicalCriticalChance, armorPenetration, physicalAccuracy, specialDamage, specialCriticalDamage, specialCriticalChance, resistancePenetration, specialAccuracy, physicalCriticalRating) {
  this.physicalDamage = physicalDamage;
  this.physicalCriticalChance = physicalCriticalChance;
  this.armorPenetration = armorPenetration;
  this.physicalAccuracy = physicalAccuracy;
  this.specialDamage = specialDamage;
  this.specialCriticalDamage = specialCriticalDamage;
  this.specialCriticalChance = specialCriticalChance;
  this.resistancePenetration = resistancePenetration;
  this.specialAccuracy = specialAccuracy;
  this.physicalCriticalRating = physicalCriticalRating;
}

var CharacterDefense = function(armor, dodgeChance, physicalCriticalAvoidance, resistance, deflectionChance, specialCriticalAvoidance) {
  this.armor = armor;
  this.dodgeChance = dodgeChance;
  this.physicalCriticalAvoidance = physicalCriticalAvoidance;
  this.resistance = resistance;
  this.deflectionChance = deflectionChance;
  this.specialCriticalAvoidance = specialCriticalAvoidance;
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

var CharacterGear = function(name, mkLevel, imgUrl, cost, requiredLevel) {
  this.name = name;
  this.mkLevel = mkLevel;
  this.imgUrl = imgUrl;
  this.cost = cost;
  this.requiredLevel = requiredLevel;
  this.stats = [];
}

var CharScrape = function(id, url) {
  this.id = id;
  this.url = url;
}

// MODS
var Mod = function(name, level, pips, imgUrl, modSlot, modType, primary) {
  this.name = name;
  this.level = level;
  this.pips = pips;
  this.imgUrl = imgUrl;
  this.modSlot = modSlot;
  this.modType = modType;
  this.primary = primary;
  this.secondaries = []];
}

var ModStat = function(value, label) {
  this.value = value;
  this.label = label;
}

// Ships
var Ship = function() {

}

// Profile
var User = function() {

}

module.exports = {
  Character,
  CharacterPrimary,
  CharacterGeneral,
  CharacterOffense,
  CharacterDefense,
  CharacterSkill,
  CharacterGear,
  CharScrape,
  Mod,
  ModStat,
  Ship,
  User
}
