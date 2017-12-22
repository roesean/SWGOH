app.service("collectionService", function($http) {

  var _teams = [];
  var teamId = 0;

  var Team = function(id, name) {
    this.id = id;
    this.name = name;
    this.characters = [];
    this.galacticPower = function() {
      var gp = 0;
      for (var i = 0; i < this.characters.length; i++) {
        gp += this.characters[i].galacticPower
      }
      return gp
    }
  }

  _teams.unshift(new Team(teamId++, "Team 4"));
  _teams.unshift(new Team(teamId++, "Team 3"));
  _teams.unshift(new Team(teamId++, "Team 2"));
  _teams.unshift(new Team(teamId++, "Team 1"));

  this.getCollection = function(username, cb) {
    $http.get("./collection/?username=" + username)
      .then(function(response) {
        console.log(response.data.results);
        cb(response.data.results)
      },
      function(error) {
        var _collection = []
        cb(_collection)
        console.log(error);
      })
  }

  this.getTeams = function() {
    console.log(_teams);
    return _teams
  }

  this.addTeam = function(team) {
    _teams.unshift(new Team(teamId++, team.name))
  }

})
