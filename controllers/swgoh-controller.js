const axios = require('axios');
const fs = require('fs');
const { User } = require('../models/user');
const { Character, CharacterPrimary, CharacterGeneral, CharacterOffense, CharacterDefense, CharacterSkill, CharacterGear, CharScrape, Mod, ModStat, Ship, Profile } = require('../constructors/constructors')
const cheerioAdv = require('cheerio-advanced-selectors')
const cheerio = cheerioAdv.wrap(require('cheerio'))
const characterUrlJson = require('../static/characterUrls.json')
// const shipUrls = require('../static/shipUrls.json')

var ships = []
var characters = []

function collection(req, res) {
  var userName = req.query.username

  User.find().where('userName').equals(userName)
  .exec(function(err, users) {
    if (err) {
      res.status(500).json({errorMessage: `Could not perform task because: ${err}`});
    }
    else {

      var threeDays = 72 * 60 * 60 * 1000; // ms
      // var threeDays = 1000; // Test for remove
      if(users.length > 0 && ((new Date) - users[0].createdAt < threeDays)) {
        res.json(users[0]);
      }
      else {

        // If there was a user with that username - remove him first before re-adding to DB
        if(users.length > 0) {
          User.findByIdAndRemove(users[0]._id, function(err, user) {
            if(err) {
              res.status(500).json({errorMessage: `Could not perform delete because: ${err}`});
            } else if (!user) {
              res.status(404).json({errorMessage: `No user was found at id: ${users[0]._id}`})
            }
          })
        }

        // Scraping
        var urlNames = []
        axios.get('https://swgoh.gg/u/' + userName + '/collection/')
          .then(function (response) {
            const $ = cheerio.load(response.data)
            var characterList = $('.collection-char:not(.collection-char-missing)')

            for(var i = 0; i < characterList.length; i++){
              var link = $(characterList[i]).find('.char-portrait-full-link').attr('href').split('/')
              urlNames.push(new CharScrape(link[4], link[5]));
            }
            console.log(urlNames);
            console.log(urlNames.length);

            for (var i = 0; i < urlNames.length; i++) {
              characterParser(userName, urlNames[i].id, urlNames[i].url)
            }

            setTimeout(function() {
              var newUser = new User({
                userName: userName,
                characters: characters,
                ships: [],
                profile: [],
                guild: []
              })
              newUser.save(function(err, user) {
                if(err) {
                  res.status(500).json({errorMessage: `There was an error with our DB: ${err}`});
                }
                else {
                  res.json(user)
                }
              })
            }, 10000)
          })
          .catch(function(error) {
            console.log('=====================');
            console.log('        ERROR        ');
            console.log('=====================');
            console.log(error);
          })

      }
    };
  })
}

function characterParser(username, characterId, characterUri) {
  axios.get('https://swgoh.gg/u/' + username + '/collection/' + characterId + '/' + characterUri + '/')
    .then(function(response) {
      var $ = cheerio.load(response.data)

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
      var mods = $('.statmod.pc-statmod');
      var gearNeeded = $('.pc-needed-gear');
      var equippedGear = $('.pc-slot-obtained');

      // BASE
      var name$ = $('.pc-char-overview-name').text();
      var urlName$ = $('.pc-char-overview-name').attr('href').substr(11).replace(/[/]/g, '');
      var imgUrl$ = $(".char-portrait-full-img").attr('src');
      var description$ = null;
      var gearLevel$ = $('.pc-gear div.pc-heading').text();

      // // PRIMARY
      var power$ = parseInt($(base).find('.pc-stat-value').eq(0).text());
      var statPower$ = parseInt($(base).find('.pc-stat-value').eq(1).text());
      var strength$ = parseInt($(primaryAttributes).find('.pc-stat-value').eq(0).text());
      var agility$ = parseInt($(primaryAttributes).find('.pc-stat-value').eq(1).text());
      var intelligence$ = parseInt($(primaryAttributes).find('.pc-stat-value').eq(2).text());
      var strengthMod$ = parseFloat($(primaryAttributes).find('.pc-stat-value').eq(3).text());
      var agilityMod$ = parseFloat($(primaryAttributes).find('.pc-stat-value').eq(4).text());
      var intelligenceMod$ = parseFloat($(primaryAttributes).find('.pc-stat-value').eq(5).text());

      // GENERAL
      var health$ = parseInt($(general).find('.pc-stat-value').eq(0).text());
      var protection$ = parseInt($(general).find('.pc-stat-value').eq(1).text());
      var speed$ = parseInt($(general).find('.pc-stat-value').eq(2).text());
      var criticalDamage$ = parseInt($(general).find('.pc-stat-value').eq(3).text());
      var potency$ = parseFloat($(general).find('.pc-stat-value').eq(4).text());
      var tenacity$ = parseFloat($(general).find('.pc-stat-value').eq(5).text());
      var healthSteal$ = parseFloat($(general).find('.pc-stat-value').eq(6).text());

      // OFFENSIVE
      var physicalDamage$ = parseInt($(physicalOffense).find('.pc-stat-value').eq(0).text());
      var physicalCriticalChance$ = parseFloat($(physicalOffense).find('.pc-stat-value').eq(1).text());
      var armorPenetration$ = parseInt($(physicalOffense).find('.pc-stat-value').eq(2).text());
      var physicalAccuracy$ = parseFloat($(physicalOffense).find('.pc-stat-value').eq(3).text());
      var specialDamage$ = parseInt($(specialOffense).find('.pc-stat-value').eq(0).text());
      var specialCriticalChance$ = parseFloat($(specialOffense).find('.pc-stat-value').eq(1).text());
      var resistancePenetration$ = parseFloat($(specialOffense).find('.pc-stat-value').eq(2).text());
      var specialAccuracy$ = parseFloat($(specialOffense).find('.pc-stat-value').eq(3).text());

      // DEFENSIVE
      var armor$ = parseFloat($(physicalSurvivability).find('.pc-stat-value').eq(0).text());
      var dodgeChance$ = parseFloat($(physicalSurvivability).find('.pc-stat-value').eq(1).text());
      var physicalCriticalAvoidance$ = parseFloat($(physicalSurvivability).find('.pc-stat-value').eq(2).text());
      var resistance$ = parseFloat($(specialSurvivability).find('.pc-stat-value').eq(0).text());
      var deflectionChance$ = parseFloat($(specialSurvivability).find('.pc-stat-value').eq(1).text());
      var specialCriticalAvoidance$ = parseFloat($(specialSurvivability).find('.pc-stat-value').eq(2).text());

      // TOON CREATION
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

      // SKILLS
      for (var i = 0; i < skills.length; i++) {
        toon.skills.push(new CharacterSkill(
          $(skills[i]).find('.pc-skill-name').text(), // name
          null,
          null,
          null,
          $(skills[i]).find('.char-ability-img').attr('src'), // imgUrl
          $(skills[i]).find('.pc-skill-levels-pip').length, // maxLevel
          $(skills[i]).find('.pc-skill-levels-pip-active').length // currentLevel
        ))
      }

      // FACTIONS
      for (var i = 0; i < factions.length; i++) {
        toon.factions.push($(factions[i]).text());
      };

      // ABILITY CLASSES
      for (var i = 0; i < abilityClasses.length; i++) {
        toon.abilityClasses.push($(abilityClasses[i]).text());
      };

      // GEAR NEEDED
      for (var i = 0; i < gearNeeded.length; i++) {
        toon.gearNeeded.push(new CharacterGear(
          $(gearNeeded[i]).find('.gear-icon-img').attr('alt'), // name
          $(gearNeeded[i]).find('.gear-icon-mk-level').text(), // MK lvl
          $(gearNeeded[i]).find('.gear-icon-img').attr('src'), // imgURL
          parseInt($(gearNeeded[i]).find('.pc-needed-gear-count').text()) // quantity
        ))
      }

      // GEAR EQUIPPED
      for (var i = 0; i < equippedGear.length; i++) {
        toon.gearEquipped.push(new CharacterGear(
          $(equippedGear[i]).find('.gear-icon-img').attr('alt'), // name
          $(equippedGear[i]).find('.gear-icon-mk-level').text(), // mkLevel
          $(equippedGear[i]).find('.gear-icon-img').attr('src'), // imgUrl
          1 // quantity
        ))
      }

      // MODS
      for (var i = 0; i < mods.length; i++) {
        var modStats = $(mods[i]).find('.statmod-stat')
        var modtype = $(mods[i]).find('.statmod-img').eq(0).attr('alt').split(" ")

        toon.mods.push(new Mod(
          $(mods[i]).find('.statmod-img').eq(0).attr('alt'), // name
          $(mods[i]).find('.statmod-level').eq(0).text(), // level
          $(mods[i]).find('.statmod-pip').length / 2, // pips
          $(mods[i]).find('.statmod-img').eq(0).attr('src'), // imgUrl
          $(mods[i]).attr('class').split(' ')[3].split('-')[2], // modSlot
          modtype.splice(2, (modtype.length - 3)).join(" "), // modType
          new ModStat( // primary
            $(modStats[0]).find('.statmod-stat-value').text(),
            $(modStats[0]).find('.statmod-stat-label').text()
          )
        ))

        for (var j = 1; j < modStats.length; j++) {
          toon.mods[i].secondaries.push(new ModStat(
            $(modStats[j]).find('.statmod-stat-value').text(),
            $(modStats[j]).find('.statmod-stat-label').text()
          ))
        }
      }

      characters.push(toon);

    })
    .catch(function(error) {
      console.log('=====================');
      console.log('        ERROR        ');
      console.log('=====================');
      console.log(error);
    })
}

function ships(req, res) {

}

function shipParser(username, shipId, shipUrl) {

}

function profile(req, res) {
  // var userName = req.query.username
  var userName = 'blasmorian'

  axios.get('https://swgoh.gg/u/' + userName + '/')
    .then(function(response) {
      var $ = cheerio.load(response.data)


    })
    .catch(function(error) {
      console.log('=====================');
      console.log('        ERROR        ');
      console.log('=====================');
      console.log(error);
    })


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


}

function guild(req, res) {

}


module.exports = { collection, ships, profile, guild }
