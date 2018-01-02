var app = angular.module("SWGOH", ['ui.router', 'filearts.dragDrop', "LocalStorageModule"])

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('app', {
			abstract: true,
			url: '',
			templateUrl: './views/app-container.html'
		})

    .state("app.home", {
      url: "/",
      templateUrl: "./views/home.html",
      controller: "homeController"
    })

    .state("app.territoryWars", {
      url: "/territory-wars",
      templateUrl: "./views/territory-wars.html",
      controller: "territoryWarsController"
    })

    .state("app.about", {
      url: "/about",
      templateUrl: "./views/about.html",
      controller: "homeController"
    })

})
