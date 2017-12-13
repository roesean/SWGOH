var app = angular.module("SWGOH", ['ui.router', 'filearts.dragDrop'])

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("characters", {
      url: "/",
      templateUrl: "./views/characters.html",
      controller: "characterController"
    })
    .state("ships", {
      url: "/ships",
      templateUrl: "./views/ships.html",
      controller: "shipController"
    })
})
