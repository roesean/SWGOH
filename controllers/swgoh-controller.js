const axios = require('axios');
const fs = require('fs');
const { CharacterPrimary, CharacterGeneral, CharacterOffense, CharacterDefense, Character, CharacterSkill, CharacterGear, CharacterMod, Ship, User } = require('../constructors/constructors')
const characterUrls = require('../static/characterUrls.json')
// const shipUrls = require('../static/shipUrls.json')
const cheerioAdv = require('cheerio-advanced-selectors')
const cheerio = cheerioAdv.wrap(require('cheerio'))

var characters = []
var ships = []

function characters(req, res) {
  axios.get('https://swgoh.gg/characters/' + req.query.username)
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
      var abilityName = abilities.children('div.media-heading').children("h5");
      var abilityDescription = abilities.children('p:not([class])')
      var abilityCoolDown = abilities.children('div.media-heading').children("h5")
      var abilityImgUrl = $("img.char-ability-img")

      for (var i = 0; i < abilities.length; i++) {
        if($(abilityCoolDown[i]).children().length == 0) {
          var coolDown$ = 0;
        }
        else {
          var coolDown$ = parseInt($(abilityCoolDown[i]).children().text().split(" ")[0]);
        }
        var descriptionA$ = $(abilityDescription[i]).text().replace(/\r?\n|\r/g, '');
        var nameA$ = $(abilityName[i]).children().remove().end().text().replace(/\r?\n|\r/g, '').replace(" ", '');
        var type$ = $($(abilities[i]).find('small')[0]).text().split(" · ")[1];
        var imgUrl$ = $(abilityImgUrl[i]).attr('src');
        toon.abilities.push(new Ability(nameA$, descriptionA$, type$, coolDown$, imgUrl$))
      }

      // FACTIONS
      for (var i = 0; i < factions.length; i++) {
        toon.factions.push($(factions[i]).text());
      };

      // ABILITY CLASSES
      for (var i = 0; i < abilityClasses.length; i++) {
        toon.abilityClasses.push($(abilityClasses[i]).text());
      };

      characters.push(toon);
    })
    .catch(function(error) {
      console.log("=====================");
      console.log("        ERROR        ");
      console.log("=====================");
      console.log(error);
    })
}

function ships(req, res) {

}

function profile(req, res) {

}

function guild(req, res) {

}


module.exports = { characters, ships, profile, guild }
