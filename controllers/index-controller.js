const swgoh = require("swgoh").swgoh

// const username= "blasmorian";
// swgoh.profile(username)
//   .then(function (response) {
//     console.log(response);
//
//     return swgoh.guild(p.guildUrl);
//   })
//   .then(function(response) {
//     console.log(response);
//   });
//
// swgoh.collection(username)
// .then(console.log);
//
// swgoh.ship(username)
// .then(console.log);
//
//
// const guild = "/g/232/requiem/"; // or {id:232}
// swgoh.units(guild)
// .then(console.log);
//
// swgoh.mods(username)
// .then(console.log);
//

function getProfile(req, res) {
  var username = req.query.username

  swgoh.profile(username)
    .then(function(response) {
      console.log("PROFILE SWGOH RESPONSE COMPLETE");
      res.json(response)
    })
}

function getHeroCollection(req, res) {
  var username = req.query.username

  swgoh.collection(username)
  .then(function(response) {
    console.log("COLLECTION SWGOH RESPONSE COMPLETE ");
    console.log(response);
    res.json(response)
  })
}

function getShipCollection(req, res) {
  var username = req.query.username

  swgoh.ship(username)
    .then(function(response) {
      console.log("SHIP SWGOH RESPONSE COMPLETE ");
      console.log(response);
      res.json(response)
    })
}

function getGuild(req, res) {
  var username = req.query.username

  swgoh.profile(username)
    .then(function (response) {
      console.log(response);

      return swgoh.guild(response.guildUrl);
    })
    .then(function(response) {
      console.log(response);
      res.json(response)
    });

}

module.exports = {
  getProfile: getProfile,
  getHeroCollection: getHeroCollection,
  getShipCollection: getShipCollection,
  getGuild: getGuild
}
