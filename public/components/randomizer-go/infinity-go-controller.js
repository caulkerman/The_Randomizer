(function() {
	var $inject = ["$scope", "$log", "theService", "$state", "$stateParams"];
	function infinityGoControllerCB($scope, $log, theService, $state, $stateParams) {

		
			//  CONTROLLER CODE HERE  //

		
		//The categoriesShow function is a button that takes the user back to the categories page.
		$scope.categoriesShow = function() {
			$state.go("setItUp");
		}



		//The getStoredCategoryInService function calls to the service to retrieve the specific 
		//category object saved there, the specific object is not retrieved from the database 
		//but from the service.  If the user refreshes the page all $scope variables are 
		//undefined so I send the user back to the category page so the category data can be 
		//sent through the service again and the page not get stuck in error mode because the ._id 
		//is undefined.
		$scope.getStoredCategoryFromService = function() {
			var categoryNames = theService.sendStoredCategoryInService();
			if (categoryNames === undefined) {
				$log.warn("This page cannot be refreshed, RETURNING TO CATEGORIES PAGE")
				$state.go("setItUp");
			}
			
			$scope._id = categoryNames._id
			$scope.items = categoryNames.items.normalItems;
			$scope.raffleItems = categoryNames.items.raffleItems;
			$scope.categoryNameInfinity = categoryNames.name;  //the items array of objects containing itemName and itemShow.
		}
		$scope.getStoredCategoryFromService();



		//The addAnItem function takes the input data and adds it to the items array.  
		//The altered array is then sent to the database to be updated with the object's ._id.
		$scope.addAnItem = function(itemName) {
			if ($scope.categoryItem === "" || $scope.categoryItem === undefined) {
				$log.error("You must enter into the input box");
				return;
			}
			else {
			var itemsObject = {
				itemName: itemName
			};
			
			$scope.items.unshift(itemsObject);
			theService.addAnItem($scope.items, $scope._id).then(function(response) {
			});
			
			$scope.raffleItems.unshift(itemsObject);
			theService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {
			});
			
			$scope.categoryItem = "";
			$scope.getStoredCategoryFromService();
			}
		};



		//Obviously to splice out the particular item in the items array and get the 
		//object updated in the database.
		$scope.deleteItem = function(index) {
			
			$scope.items.splice(index, 1);
			theService.addAnItem($scope.items, $scope._id).then(function(response) {
			});

			$scope.raffleItems.splice(index, 1);
			theService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {
			});
			
			$scope.getStoredCategoryFromService();
		}



		//The infinity_randomize function makes the magic for the Infinity Randomizer.
		$scope.infinity_randomize = function() {
			var itemsLength = $scope.items.length;
			var randomNumber = Math.floor(Math.random() * itemsLength);
			for (var i = 0; i < itemsLength; i++) {
				if (i === randomNumber) {
					$scope.finalRandomItem = $scope.items[i];
				}
			}
			$log.info("RANDOMIZING!!!!");
		}
		
		$scope.goToRaffle = function() {
			$state.go("raffle-go");
		}


	}
	infinityGoControllerCB.$inject = $inject;
	app.controller("infinityGoController", infinityGoControllerCB)
})();





