var app = angular.module("the_randomizer", ["ui.router"])

	app.config(function($stateProvider, $urlRouterProvider) {
  
  // For any unmatched url, redirect to /landing-page
  $urlRouterProvider.otherwise("/landing-page");
  
  $stateProvider
    
    .state('landing-page', {
      url: "/landing-page",
      templateUrl: "components/landing-page/landing-page.html",
      controller: "landingPageController"
    })
    
    .state('setItUp', {
      url: "/set-it-up-and-play",
      templateUrl: "components/set-it-up/setItUp.html",
      controller: "setItUpController"
	  })

    // .state("some", {
    //   url: "/some",
    //   templateUrl:"components/set-it-up/some.html",
    //   controller: "someController"
    // })

    .state("infinity-go", {
      url: "/infinity-style-randomizer",
      templateUrl: "components/randomizer-go/infinity-go.html",
      controller: "infinityGoController"
    })

    .state("raffle-go", {
      url: "/raffle-style-randomizer",
      templateUrl: "components/randomizer-go/raffle-go.html",
      controller: "raffleGoController"
    })








});

