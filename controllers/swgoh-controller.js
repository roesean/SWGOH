const axios = require('axios');
const fs = require('fs');
const { Character, CharacterPrimary, CharacterGeneral, CharacterOffense, CharacterDefense, CharacterSkill, CharacterGear, CharScrape, Mod, ModStat, Ship, User } = require('../constructors/constructors')
const cheerioAdv = require('cheerio-advanced-selectors')
const cheerio = cheerioAdv.wrap(require('cheerio'))
const characterUrlJson = require("../static/characterUrls.json")
// const shipUrls = require('../static/shipUrls.json')

var characters = []
var ships = []

function characters(req, res) {
  // axios.get('https://swgoh.gg/characters/' + req.query.username)
  axios.get('https://swgoh.gg/u/blasmorian/collection/238/commander-luke-skywalker/')
    .then(function(response) {
      const $ = cheerio.load(response.data)

      // SETUP
      var base = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[0];
      var primaryAttributes = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[1];
      var general = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[2];
      var physicalOffense = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[3];
      var physicalSurvivability = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[4];
      var specialOffense = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[5];
      var specialSurvivability = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[6];

      var skills = $('.pc-skill');
      var factions = $('.pc-char-overview a');
      var abilityClasses = $('.panel.panel-default.m-b-sm:eq(1) a');
      var mods = null;
      var gearNeeded = $('.pc-needed-gear');
      var currentGear = null;

      // BASE
      var name$ = $('.pc-char-overview-name').text();
      var urlName$ = $('.pc-char-overview-name').attr('href').substr(11).replace(/[/]/g, "");
      var imgUrl$ = $(".char-portrait-full-img").attr('src');
      var description$ = null;
      var gearLevel$ = $('.pc-gear div.pc-heading').text();

      // PRIMARY
      var power$ = parseInt($(base).find('.pc-stat-value:eq(0)').text());
      var statPower$ = parseInt($(base).find('.pc-stat-value:eq(1)').text());
      var strength$ = parseInt($(primaryAttributes).find('.pc-stat-value:eq(0)').text());
      var agility$ = parseInt($(primaryAttributes).find('.pc-stat-value:eq(1)').text());
      var intelligence$ = parseInt($(primaryAttributes).find('.pc-stat-value:eq(2)').text());
      var strengthMod$ = parseFloat($(primaryAttributes).find('.pc-stat-value:eq(3)').text());
      var agilityMod$ = parseFloat($(primaryAttributes).find('.pc-stat-value:eq(4)').text());
      var intelligenceMod$ = parseFloat($(primaryAttributes).find('.pc-stat-value:eq(5)').text());

      // GENERAL
      var health$ = parseInt($(general).find('.pc-stat-value:eq(0)').text());
      var protection$ = parseInt($(general).find('.pc-stat-value:eq(1)').text());
      var speed$ = parseInt($(general).find('.pc-stat-value:eq(2)').text());
      var criticalDamage$ = parseInt($(general).find('.pc-stat-value:eq(3)').text());
      var potency$ = parseFloat($(general).find('.pc-stat-value:eq(4)').text());
      var tenacity$ = parseFloat($(general).find('.pc-stat-value:eq(5)').text());
      var healthSteal$ = parseFloat($(general).find('.pc-stat-value:eq(6)').text());

      // OFFENSIVE
      var physicalDamage$ = parseInt($(physicalOffense).find('.pc-stat-value:eq(0)').text());
      var physicalCriticalChance$ = parseFloat($(physicalOffense).find('.pc-stat-value:eq(1)').text());
      var armorPenetration$ = parseInt($(physicalOffense).find('.pc-stat-value:eq(2)').text());
      var physicalAccuracy$ = parseFloat($(physicalOffense).find('.pc-stat-value:eq(3)').text());
      var specialDamage$ = parseInt($(specialOffense).find('.pc-stat-value:eq(0)').text());
      var specialCriticalChance$ = parseFloat($(specialOffense).find('.pc-stat-value:eq(1)').text());
      var resistancePenetration$ = parseFloat($(specialOffense).find('.pc-stat-value:eq(2)').text());
      var specialAccuracy$ = parseFloat($(specialOffense).find('.pc-stat-value:eq(3)').text());

      // DEFENSIVE
      var armor$ = parseFloat($(physicalSurvivability).find('.pc-stat-value:eq(0)').text());
      var dodgeChance$ = parseFloat($(physicalSurvivability).find('.pc-stat-value:eq(1)').text());
      var physicalCriticalAvoidance$ = parseFloat($(physicalSurvivability).find('.pc-stat-value:eq(2)').text());
      var resistance$ = parseFloat($(specialSurvivability).find('.pc-stat-value:eq(0)').text());
      var deflectionChance$ = parseFloat($(specialSurvivability).find('.pc-stat-value:eq(1)').text());
      var specialCriticalAvoidance$ = parseFloat($(specialSurvivability).find('.pc-stat-value:eq(2)').text());

      var toon = new Character(
        name$,
        urlName$,
        imgUrl$,
        description$,
        gearLevel$,
        new CharacterPrimary(power$, statPower$, strength$, agility$, intelligence$, strengthMod$, agilityMod$, intelligenceMod$),
        new CharacterGeneral(health$, protection$, speed$, criticalDamage$, potency$, tenacity$, healthSteal$),
        new CharacterOffense(physicalDamage$, physicalCriticalChance$, armorPenetration$, physicalAccuracy$, specialDamage$, null, specialCriticalChance$, resistancePenetration$, specialAccuracy$, null),
        new CharacterDefense(armor$, dodgeChance$, physicalCriticalAvoidance$, resistance$, deflectionChance$, specialCriticalAvoidance$)
      );

      ///////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////// PICKUP FROM HERE ////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////

      // SKILLS
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
        toon.abilities.push(new CharacterSkill(nameA$, descriptionA$, type$, coolDown$, imgUrl$))
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
