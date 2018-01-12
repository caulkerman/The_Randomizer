"use strict"
const app = angular.module("the_randomizer", ["ui.router", 'mp.autoFocus'])

	app.config(function($stateProvider, $urlRouterProvider) {
  
  // For any unmatched url, redirect to /landing-page
  $urlRouterProvider.otherwise("/local-set-it-up");
  
  $stateProvider
    
    .state("local-set-it-up", {
      url: "/local-set-it-up",
      templateUrl: "components/localRandomizer/localSet-it-up/localSet_it_up_template.html",
      controller: "localSetItUpController"
    })
    
    .state('setItUp', {
      url: "/set-it-up-and-play",
      templateUrl: "components/set-it-up/category.html",
      controller: "categoryController"
	  })

    .state("infinity-go", {
      url: "/infinity-style-randomizer/:id",
      templateUrl: "components/randomizer-go/infinity-go.html",
      controller: "infinityGoController"
    })

    .state("raffle-go", {
      url: "/raffle-style-randomizer/:id",
      templateUrl: "components/randomizer-go/raffle-go.html",
      controller: "raffleGoController"
    })

    .state("local-randomizer", {
      url: "/local-randomizer/:value/:id",
      templateUrl: "components/localRandomizer/localRandomizer-go/localRandomizer_template.html",
      controller: "localRandomizerController"
    })








});

