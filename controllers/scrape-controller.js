const axios = require('axios');
const { Character, Ability } = require('../constructors/constructors')
var cheerio = require('cheerio')
var cheerioAdv = require('cheerio-advanced-selectors')

cheerio = cheerioAdv.wrap(cheerio)

function characterList(req, res) {
  axios.get('https://swgoh.gg/')
    .then(function (response) {

      const $ = cheerio.load(response.data)
      var characterList = $('.media-heading h5');
      var urlNames = []

      for(var i = 0; i < characterList.length; i++){
        urlNames.push($(characterList[i]).text()
                                         .toLowerCase()
                                         .replace(/[()"']/g, '')
                                         .replace(/( - )/g, '-')
                                         .replace(/[" "]/g, '-'))
      }

      res.json(urlNames)
    })
    .catch(function (error) {
      console.log(error);
    });
}

function character(req, res) {
  axios.get('https://swgoh.gg/characters/aayla-secura/')
    .then(function(response) {
      const $ = cheerio.load(response.data)

      // SETUP
      var primary = $('.content-container-primary-aside .media-body:eq(0) .pull-right')
      var offensive = $('.content-container-primary-aside .media-body:eq(1) .pull-right')
      var defensive = $('.content-container-primary-aside .media-body:eq(2) .pull-right')

      var abilities = $('.content-container-primary li.media.list-group-item.p-0 .char-detail-info')
      var factions = $('.content-container-aside .panel-body:eq(1) a')
      var abilityClasses = $('.content-container-aside .panel-body:eq(1) a')

      var primaryMods = $('.content-container-primary-aside .media-body:eq(0)').text()
      primaryMods = primaryMods.match(/\(([^)]+)\)/g)
      for (var i = 0; i < primaryMods.length; i++) {
        primaryMods[i] = primaryMods[i].substr(1, primaryMods[i].length - 2)
      }

      // BASE
      const name$ = $('.content-container-aside .panel-title a').text()
      const urlName$ = $('.content-container-aside .panel-title a').attr('href').substr(11)
      const description$ = $('.content-container-aside .panel-body p').text();

      // PRIMARY
      const strengthMod$ = primaryMods[0];
      const agilityMod$ = primaryMods[1];
      const intelligenceMod$ = primaryMods[2];
      const power$ = parseInt($(primary[0]).text());
      const strength$ = parseInt($(primary[1]).text());
      const agility$ = parseInt($(primary[2]).text());
      const intelligence$ = parseInt($(primary[3]).text());

      // OFFENSIVE
      const speed$ = parseInt($(offensive[0]).text());
      const physicalDamage$ = parseInt($(offensive[1]).text());
      const physicalCriticalRating$ = parseInt($(offensive[2]).text());
      const specialDamage$ = parseInt($(offensive[3]).text());
      const specialCriticalDamage$ = parseInt($(offensive[4]).text());
      const armorPenetration$ = parseInt($(offensive[5]).text());
      const resistancePenetration$ = parseInt($(offensive[6]).text());
      const potency$ = parseInt($(offensive[7]).text());

      // DEFENSIVE
      const health$ = parseInt($(defensive[0]).text());
      const armor$ = parseInt($(defensive[1]).text());
      const resistance$ = parseInt($(defensive[2]).text());
      const tenacity$ = parseInt($(defensive[3]).text());
      const healthSteal$ = parseInt($(defensive[4]).text());
      const protection$ = parseInt($(defensive[5]).text().replace(",", ""));

      var toon = new Character(name$, urlName$, description$, power$, strengthMod$, agilityMod$, intelligenceMod$, strength$, agility$, intelligence$, speed$, physicalDamage$, physicalCriticalRating$, specialDamage$, specialCriticalDamage$, armorPenetration$, resistancePenetration$, potency$, health$, armor$, resistance$, tenacity$, healthSteal$, protection$)

      // ABILITIES
      var abilityName = abilities.children('div.media-heading').children("h5")
      var abilityDescription = abilities.children('p:not([class])')

      for (var i = 0; i < abilities.length; i++) {
        var nameA$ = $(abilityName[i]).text().replace(/\r?\n|\r/g, '')
        var descriptionA$ = $(abilityDescription[i]).text().replace(/\r?\n|\r/g, '')
        toon.abilities.push(new Ability(nameA$, descriptionA$))
      }

      // FACTIONS
      for (var i = 0; i < factions.length; i++) {
        toon.factions.push($(factions[i]).text());
      };

      // ABILITY CLASSES
      for (var i = 0; i < abilityClasses.length; i++) {
        toon.abilityClasses.push($(abilityClasses[i]).text());
      };

      res.json(toon);

    })
    .catch(function(error) {
      console.log("=====================");
      console.log("        ERROR        ");
      console.log("=====================");
      console.log(error);
    })

}

module.exports = { characterList, character }
