'use strict';
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

  _teams.push(new Team(teamId++, "Meta"));
  _teams.push(new Team(teamId++, "Sith"));
  _teams.push(new Team(teamId++, "Resistance"));
  _teams.push(new Team(teamId++, "Empire"));
  _teams.push(new Team(teamId++, "Jedi"));

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
