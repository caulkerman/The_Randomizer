(function() {
	var $inject = ["$scope", "$log", "$timeout", "$state"];
	function landingPageControllerCB($scope, $log, $timeout, $state) {

		/////ADD JAVASCRIPT BELOW///////

//The purpose of the landing page is to introduce the user to the app for 4 seconds, almost like the app is loading. 

		
		$scope.test = "hey there";
		$scope.landing_page_timeout = function() {
			$log.info("landing_page_timeout function has fired");
			$timeout(function() {
				$state.go("setItUp");
			}, 3000);
		}
		$scope.landing_page_timeout();


	}
	landingPageControllerCB.$inject = $inject;
	app.controller("landingPageController", landingPageControllerCB);


})();