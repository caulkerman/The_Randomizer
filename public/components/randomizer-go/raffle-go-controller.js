(function() {
	"use strict"
	var $inject = ["$scope", "$log", "$state", "$stateParams", "theService"];
	function raffleGoControllerCB($scope, $log, $state, $stateParams, theService) {


			// ADD CONTROLLER JAVASCRIPT HERE //


		var id = $stateParams.id;//at this point we need to call to the DB to get THE object.


		//The categoriesShow function is a button that takes the user back to the categories page.
		$scope.categoriesShow = function() {
			$state.go("setItUp");
		};




		$scope.getStoredCategoryInService = function() {

			theService.getTheCategoryFromDBbyId(id).then(function(response) {
				
				var categoryNames = response.data;
				console.log(categoryNames);
				$scope.categoryNameRaffle = categoryNames.name;
				$scope._id = categoryNames._id;
				$scope.infinityItems = categoryNames.items.infinityItems;
				$scope.raffleItems = categoryNames.items.raffleItems;
				console.log("raffleItems: ", $scope.raffleItems);
			});
		};
		$scope.getStoredCategoryInService();



		//The addAnItem function takes the input data and adds it to the items array.  
		//The altered array is then sent to the database to be updated with the object's ._id.
		$scope.addAnItem = function(itemName) {
			if ($scope.categoryItem === "" || $scope.categoryItem === undefined) {
				$log.error("You must enter into the input box");
				return;
			}
			else {
			
			$scope.infinityItems.unshift(itemName);
			$scope.raffleItems.unshift(itemName);
			
			theService.updateInfinityItemsArray($scope.infinityItems, $scope._id).then(function(response) {
			});
			
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


		
		//The raffle_randomize function uses Math.random and a for loop to choose an item name at random
		//from the raffleItems array.  As the array is changed the change is updated in the database.
		$scope.raffle_randomize = function() {
			var itemsLength = $scope.raffleItems.length;
			var randomNumber = Math.floor(Math.random() * itemsLength);
			$scope.finalRandomItem = $scope.raffleItems[randomNumber];
			$scope.raffleItems.splice(randomNumber, 1);
			theService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {
			});
			$log.info("RANDOMIZING!!!!");
		};


		

		//The raffle_reset function pops out every item from the raffleItems array. 
		$scope.raffle_reset = function() {
			for (let i = 0; i = $scope.raffleItems.length; i++) {
				$scope.raffleItems.pop();
			}
			
			var itemsLength = $scope.infinityItems.length;
			for(let i = 0; i < itemsLength; i++) {
					$scope.raffleItems.push($scope.infinityItems[i]);
			}
			
			theService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {
			});
		};

	
		$scope.goToInfinity = function() {
			$state.go("infinity-go", {id: id});
		};
	

			//////End of Controller Code\\\\\
	}
	raffleGoControllerCB.$inject = $inject;
	app.controller("raffleGoController", raffleGoControllerCB);
})();
