var app = angular.module("the_randomizer", ["ui.router"])

	app.config(function($stateProvider, $urlRouterProvider) {
  
  // For any unmatched url, redirect to /landing-page
  $urlRouterProvider.otherwise("/landing-page");
  
  $stateProvider
    
    .state('landing-page', {
      url: "/landing-page",
      templateUrl: "components/landing-page/landing-page.html",
      controller: "setItUpController"
    })
    
    .state('setItUp', {
      url: "/set-it-up-and-play",
      templateUrl: "components/set-it-up/setItUp.html",
      controller: "setItUpController"
	})

});

