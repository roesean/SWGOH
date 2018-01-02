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
  this.skills = [];
  this.gearNeeded = [];
  this.gearEquipped = [];
  this.gearMaster = {};
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

var CharacterGear = function(name, mkLevel, imgUrl, quantity) {
  this.name = name;
  this.mkLevel = mkLevel;
  this.imgUrl = imgUrl;
  this.quantity = quantity;
}

var CharScrape = function(id, url) {
  this.id = id;
  this.url = url;
}

// MODS
var Mod = function(name, level, pips, imgUrl, modSlot, modSet, primary) {
  this.name = name;
  this.level = level;
  this.pips = pips;
  this.imgUrl = imgUrl;
  this.modSlot = modSlot;
  this.modSet = modSet;
  this.primary = primary;
  this.secondaries = [];
}

var ModStat = function(value, label) {
  this.value = value;
  this.label = label;
}

// Ships
var Ship = function() {

}

// Profile
var Profile = function(allyCode, arenaBattlesWon, arenaRank, characters, characters6, characters7, charactersGalacticPower, collectionScore, galacticPower, galacticWarBattlesWon, gearIX, gearVIII, gearX, gearXI, gearXII, guild, guildCurrencyEarned, guildUrl, joined, level, pVEBattlesWon, pVEHardBattlesWon, raidsWon, shipBattlesWon, shipsGalacticPower, userId, username) {
  this.allyCode = allyCode;
  this.arenaBattlesWon = arenaBattlesWon;
  this.arenaRank = arenaRank;
  this.characters = characters;
  this.characters6 = characters6;
  this.characters7 = characters7;
  this.charactersGalacticPower = charactersGalacticPower;
  this.collectionScore = collectionScore;
  this.galacticPower = galacticPower;
  this.galacticWarBattlesWon = galacticWarBattlesWon;
  this.gearIX = gearIX;
  this.gearVIII = gearVIII;
  this.gearX = gearX;
  this.gearXI = gearXI;
  this.gearXII = gearXII;
  this.guild = guild;
  this.guildCurrencyEarned = guildCurrencyEarned;
  this.guildUrl = guildUrl;
  this.joined = joined;
  this.level = level;
  this.pVEBattlesWon = pVEBattlesWon;
  this.pVEHardBattlesWon = pVEHardBattlesWon;
  this.raidsWon = raidsWon;
  this.shipBattlesWon = shipBattlesWon;
  this.shipsGalacticPower = shipsGalacticPower;
  this.userId = userId;
  this.username = username;
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
  Profile
}
