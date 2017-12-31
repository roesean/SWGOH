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
      var base = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[0]
      var primaryAttributes = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[1]
      var general = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[2]
      var physicalOffense = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[3]
      var physicalSurvivability = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[4]
      var specialOffense = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[5]
      var specialSurvivability = $('.content-container-primary-aside .list-group.media-list.media-list-stream li')[6]

      var skills = $('.pc-skill')
      var factions = $('.pc-char-overview a')
      var abilityClasses = $('.panel.panel-default.m-b-sm:eq(1) a')
      var mods = ;
      var gearNeeded = $('.pc-needed-gear');
      var currentGear = ;

      // BASE
      const name$ = $('.pc-char-overview-name').text()
      const urlName$ = $('.pc-char-overview-name').attr('href').substr(11)
      const imgUrl$ = $(".char-portrait-full-img").attr('src');
      const description$ = null;
      const gearLevel$ = $('.pc-gear div.pc-heading').text();

      // PRIMARY
      const power$ = parseInt($(base).find('.pc-stat-value:eq(0)').text());
      const statPower$ = parseInt($(base).find('.pc-stat-value:eq(1)').text());
      const strength$ = parseInt($(primaryAttributes).find('.pc-stat-value:eq(0)').text());
      const agility$ = parseInt($(primaryAttributes).find('.pc-stat-value:eq(1)').text());
      const intelligence$ = parseInt($(primaryAttributes).find('.pc-stat-value:eq(2)').text());
      const strengthMod$ = parseFloat($(primaryAttributes).find('.pc-stat-value:eq(3)').text());
      const agilityMod$ = parseFloat($(primaryAttributes).find('.pc-stat-value:eq(4)').text());
      const intelligenceMod$ = parseFloat($(primaryAttributes).find('.pc-stat-value:eq(5)').text());

      // GENERAL
      const health$ = parseInt($(general).find('.pc-stat-value:eq(0)').text());
      const protection$ = parseInt($(general).find('.pc-stat-value:eq(1)').text());
      const speed$ = parseInt($(general).find('.pc-stat-value:eq(2)').text());
      const criticalDamage$ = parseInt($(general).find('.pc-stat-value:eq(3)').text());
      const potency$ = parseFloat($(general).find('.pc-stat-value:eq(4)').text());
      const tenacity$ = parseFloat($(general).find('.pc-stat-value:eq(5)').text());
      const healthSteal$ = parseFloat($(general).find('.pc-stat-value:eq(6)').text());

      // OFFENSIVE
      const physicalDamage$ = parseInt($(physicalOffense).find('.pc-stat-value:eq(0)').text());
      const physicalCriticalChance$ = parseFloat($(physicalOffense).find('.pc-stat-value:eq(1)').text());
      const armorPenetration$ = parseInt($(physicalOffense).find('.pc-stat-value:eq(2)').text());
      const physicalAccuracy$ = parseFloat($(physicalOffense).find('.pc-stat-value:eq(3)').text());
      const specialDamage$ = parseInt($(specialOffense).find('.pc-stat-value:eq(0)').text());
      const specialCriticalChance$ = parseFloat($(specialOffense).find('.pc-stat-value:eq(1)').text());
      const resistancePenetration$ = parseFloat($(specialOffense).find('.pc-stat-value:eq(2)').text());
      const specialAccuracy$ = parseFloat($(specialOffense).find('.pc-stat-value:eq(3)').text());

      // DEFENSIVE
      const armor$ = parseFloat($(physicalSurvivability).find('.pc-stat-value:eq(0)').text());
      const dodgeChance$ = parseFloat($(physicalSurvivability).find('.pc-stat-value:eq(1)').text());
      const physicalCriticalAvoidance$ = parseFloat($(physicalSurvivability).find('.pc-stat-value:eq(2)').text());
      const resistance$ = parseFloat($(specialSurvivability).find('.pc-stat-value:eq(0)').text());
      const deflectionChance$ = parseFloat($(specialSurvivability).find('.pc-stat-value:eq(1)').text());
      const specialCriticalAvoidance$ = parseFloat($(specialSurvivability).find('.pc-stat-value:eq(2)').text());

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
      )

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
