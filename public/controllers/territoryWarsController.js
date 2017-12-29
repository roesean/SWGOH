'use strict';
app.controller("territoryWarsController", function($scope, $state, $stateParams, userService, collectionService, localStorageService) {

  var charIndex = null;
  var dragStart = null
  $scope.collection = []

  $scope.showTeamInput = false;

  // Grabbing collection of user from npm package
  $scope.getHeroCollection = function() {
    // Setting current user in LocalStorage
    localStorageService.set('userData', { username: $scope.currentUser })

    collectionService.getHeroCollection($scope.currentUser)
      .then(function(response) {
        $scope.collection = response.data;
        console.log($scope.collection);
      },
      function(error) {
        console.log(error);
      })
  }

  if(userService.getCurrentUser() == null) {
    $scope.currentUser = "";
    console.log($scope.currentUser);
  }
  else {
    $scope.currentUser = userService.getCurrentUser();
    $scope.getHeroCollection();
    console.log($scope.currentUser);
  }

  // Initializing 5 teams to start
  $scope.teams = collectionService.getTeams();

  // Adding a new team
  $scope.addTeam = function() {
    console.log($scope.team);
    collectionService.addTeam($scope.team)
    $scope.showTeamInput = false;
    $scope.team.name = "";
  }

  $scope.removeTeam = function(team) {
    console.log(team)
    var teamIndex = $scope.teams.indexOf(team);
    for (var i = 0; i < team.characters.length; i++) {
      $scope.collection.push(team.characters[i]);
    }

    $scope.teams.splice(teamIndex, 1)

    console.log($scope.teams);
  }

  // Used to display Galactic Power as %
  $scope.percent = function(min, max) {
    return Math.round((min / max) * 100)
  }

  // Checking for the source array and setting it's name to 'dragStart'
  // Finding which index the character (data) is at within the source array

  $scope.onDragStart = function(event, data) {

    dragStart = event.target.parentNode.dataset.dropzone

    if(event.target.dataset.ngRepeat.includes("collection")) {
      charIndex = $scope.collection.indexOf(data);
    }
    else {
      for (var i = 0; i < $scope.teams.length; i++) {
        if($scope.teams[i].name == dragStart) {
          charIndex = $scope.teams[i].characters.indexOf(data)
        }
      }
    }
  }

  $scope.onDragEnd = function(event, data) {
    // console.log("DRAG END");
  }

  // Animation should go here.
  $scope.onDragEnter = function(event, data) {
    console.log("DRAG ENTER");
  }

  // Animation of the 'Target' Drop Zone (array) should go here.
  $scope.onDragOver = function(event, data) {
    // console.log("DRAG OVER");
  }

  // Animation of the 'Target' Drop Zone (array) should go here.
  $scope.onDragLeave = function(event, data) {
    console.log("DRAG LEAVE");
  }

  // Checking to see if the team is full.  5 characters max.
  $scope.dropAccept = function(event, data) {
    for (var i = 0; i < $scope.teams.length; i++) {
      if($scope.teams[i].name == event.target.dataset.dropzone) {
        if($scope.teams[i].characters.length == 5) {
          return false;
        }
        else {
          return true
        }
      }
    }

  }

  // Adding the character (data) to the 'Target Array'
  // Removing the character (data) from the 'Source Array'
  $scope.onDrop = function(event, data) {

    // ADDING TO AN ARRAY
    // Checking if dropzone is user's collection
    if(event.target.dataset.dropzone == "collection") {
      $scope.collection.push(data)
    }

    // Checking which team belongs to the current drop zone.
    for (var i = 0; i < $scope.teams.length; i++) {
      if($scope.teams[i].name == event.target.dataset.dropzone) {
        $scope.teams[i].characters.push(data)
      }
    }

    // REMOVING FROM AN ARRAY
    // Checking if the 'Source Array' was the collection
    if(dragStart == "collection") {
      $scope.collection.splice(charIndex, 1);
      return;
    }

    // Checking which team belongs to the 'Source Array'
    for (var i = 0; i < $scope.teams.length; i++) {
      if($scope.teams[i].name == dragStart) {
        $scope.teams[i].characters.splice(charIndex, 1);
      }
    }
  }

})
