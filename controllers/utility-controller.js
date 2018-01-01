const axios = require('axios');
const fs = require('fs');
const { Character, CharacterPrimary, CharacterGeneral, CharacterOffense, CharacterDefense, CharacterSkill, CharacterGear, CharScrape, Mod, ModStat, Ship, User } = require('../constructors/constructors')
const cheerioAdv = require('cheerio-advanced-selectors')
const cheerio = cheerioAdv.wrap(require('cheerio'))
const characterUrlJson = require("../static/characterUrls.json")
// const shipUrls = require('../static/shipUrls.json')

var characters = []
var ships = []

// Grab Master Character URL List
function characterUrlList(req, res) {
  // Scrape top player for all character links
  axios.get('https://swgoh.gg/u/%C3%ADn%20dragons%20blood/collection/')
    .then(function (response) {
      const $ = cheerio.load(response.data)
      var characterList = $('.char-portrait-full-link')
      var urlNames = []

      for(var i = 0; i < characterList.length; i++){
        var link = characterList[i].attribs.href.split("/")
        urlNames.push(new CharScrape(link[4], link[5]));
      }

      var characterUrls = JSON.stringify(urlNames);
      fs.writeFile('./static/characterUrls.json', characterUrls, 'utf8');

    })
    .catch(function (error) {
      console.log(error);
    });
}

// Grab Master Character List and Stats
function characterMaster(req, res) {
  for (var i = 0; i < characterUrlJson.length; i++) {
    characterParser(characterUrlJson[i].url);
  }

  setTimeout(function() {
    var charactersDoc = JSON.stringify(characters);
    fs.writeFile("./static/characterMaster.json", charactersDoc, 'utf8');
  }, 7000)
}

// Parse out one character at a time
function characterParser(charName) {
  axios.get('https://swgoh.gg/characters/' + charName)
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
      const imgUrl$ = $(".panel-profile-img").attr('src')
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

      var toon = new Character(
        name$,
        urlName$,
        imgUrl$,
        description$,
        null,
        new CharacterPrimary(power$, null, strength$, agility$, intelligence$, strengthMod$, agilityMod$, intelligenceMod$),
        new CharacterGeneral(health$, protection$, speed$, null, potency$, tenacity$, healthSteal$),
        new CharacterOffense(physicalDamage$, null, armorPenetration$, null, specialDamage$, specialCriticalDamage$, null, resistancePenetration$, null, physicalCriticalRating$),
        new CharacterDefense(armor$, null, null, resistance$, null, null)
      )

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
        toon.abilities.push(new CharacterSkill(nameA$, descriptionA$, type$, coolDown$, imgUrl$, null, null))
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

// Grab Master Ship URL List
function shipUrlList(req, res) {

}

// Grab Master Ship List and Stats
function shipMaster(req, res) {

}

// Parse out one ship at a time
function shipParser(req, res) {

}

module.exports = { characterUrlList, characterMaster, shipUrlList, shipMaster }
