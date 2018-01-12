(function() {
	"use strict"
	var $inject = ["$scope", "$log", "theService", "$state", "$stateParams"];
	function infinityGoControllerCB($scope, $log, theService, $state, $stateParams) {

		
			//  CONTROLLER CODE HERE  //

		

		var id = $stateParams.id;
		console.log("the id, does it stay after refresh: ", id);

		//The categoriesShow function is a button that takes the user back to the categories page.
		$scope.categoriesShow = function() {
			$state.go("setItUp");
		};



		$scope.getStoredCategoryInService = function() {
			theService.getTheCategoryFromDBbyId(id).then(function(response) {
				var categoryNames = response.data;
				console.log("categoryNames: ", categoryNames);
				$scope._id = categoryNames._id;
				$scope.infinityItems = categoryNames.items.infinityItems;
				$scope.raffleItems = categoryNames.items.raffleItems;
				$scope.categoryNameInfinity = categoryNames.name;  //the items array of objects containing itemName and itemShow.
			});
		};
		$scope.getStoredCategoryInService();

		//The addAnItem function takes the input data and adds it to the items array.  
		//The altered array is then sent to the database to be updated with the object's ._id.
		$scope.addAnItem = function(itemName) {
			console.log("itemName: ", itemName, "$scope._id: ", $scope._id);
			if ($scope.categoryItem === "" || $scope.categoryItem === undefined) {
				$log.error("You must enter into the input box");
				return;
			}
			else {
			$scope.infinityItems.unshift(itemName);
			console.log("the infinityItems array: ", $scope.infinityItems);
			theService.updateInfinityItemsArray($scope.infinityItems, $scope._id).then(function(response) {
			});
			$scope.raffleItems.unshift(itemName);
			theService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {
			});
			$scope.categoryItem = "";
			$scope.getStoredCategoryInService();
			}
		};



		//Obviously to splice out the particular item in the items array and get the 
		//object updated in the database.
		$scope.deleteItem = function(index) {
			$scope.infinityItems.splice(index, 1);
			theService.updateInfinityItemsArray($scope.infinityItems, $scope._id).then(function(response) {
			});
			$scope.raffleItems.splice(index, 1);
			theService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {
			});
			$scope.getStoredCategoryInService();
		};



		//The infinity_randomize function makes the magic for the Infinity Randomizer.
		$scope.infinity_randomize = function() {
			var itemsLength = $scope.infinityItems.length;
			var randomNumber = Math.floor(Math.random() * itemsLength);
			$scope.finalRandomItem = $scope.infinityItems[randomNumber];
			$log.info("RANDOMIZING!!!!");
		};
		
		$scope.goToRaffle = function() {
			$state.go("raffle-go", {id: id});
		};
	

		////End of Controller Code\\\\\
	}
	infinityGoControllerCB.$inject = $inject;
	app.controller("infinityGoController", infinityGoControllerCB);
})();





