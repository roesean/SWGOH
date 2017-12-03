var app = angular.module("SWGOH", ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "./views/home.html",
      controller: "homeController"
    })
    .state("characters", {
      url: "/characters",
      templateUrl: "./views/characters.html",
      controller: "characterController"
    })
    .state("ships", {
      url: "/ships",
      templateUrl: "./views/ships.html",
      controller: "shipController"
    })
    .state("teams", {
      url: "/teams",
      templateUrl: "./views/teams.html",
      controller: "teamController"
    })
})
