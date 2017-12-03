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

function getCollection(req, res) {
  var usersCollection = []
  var username = req.query.username
  console.log("REQ QUERY: ", req.query);

  swgoh.collection(username)
    .then(function(response) {

      for (var i = 0; i < response.length; i++) {
        response[i].type = "character"
        usersCollection.push(response[i]);
      }
      console.log("COLLECTION SWGOH RESPONSE COMPLETE ");
    })

  swgoh.ship(username)
    .then(function(response) {
      for (var i = 0; i < response.length; i++) {
        response[i].type = "ship"
        usersCollection.push(response[i]);
      }
      console.log("SHIP SWGOH RESPONSE COMPLETE ");
    })

  setTimeout(function() {
    res.json({results: usersCollection})
  }, 2000)

}

function getProfile(req, res) {
  var username = req.query.username

  swgoh.profile(username)
    .then(function(response) {
      console.log("PROFILE SWGOH RESPONSE COMPLETE");
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
  getCollection: getCollection,
  getGuild: getGuild
}
