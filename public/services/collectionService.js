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

  this.getHeroCollection = function(username) {
    return $http.get("./hero/?username=" + username)
  }

  this.getShipCollection = function(username) {
    return $http.get("./ship/?username=" + username)
  }

  this.getTeams = function() {
    console.log(_teams);
    return _teams
  }

  this.addTeam = function(team) {
    _teams.unshift(new Team(teamId++, team.name))
  }

})
