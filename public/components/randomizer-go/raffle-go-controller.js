(function() {
	var $inject = ["$scope", "$log", "$state", "$stateParams", "theService"];
	function raffleGoControllerCB($scope, $log, $state, $stateParams, theService) {


			// ADD CONTROLLER JAVASCRIPT HERE //



		//The categoriesShow function is a button that takes the user back to the categories page.
		$scope.categoriesShow = function() {
			$state.go("setItUp");
		}



		//The getStoredCategoryInService function calls to the service to retrieve the specific 
		//category object saved there, the specific object is not retrieved from the database 
		//but from the service.  If the user refreshes the page all $scope variables are 
		//undefined so I send the user back to the category page so the category data can be 
		//sent through the service again and the page not get stuck in error mode because the ._id
		//or name property is undefined.  

		//One way, perhaps, that I could have avoided this is to send the properties
		//of the categories object through to another controller via routing in app.js using 
		//$stateParams by adding the category properties to the $stateParams.  Although I get 
		//an error in the console, and I have to re-rout back to the categories page, I want 
		//the entire object intact.
		$scope.getStoredCategoryInService = function() {
			var categoryNames = theService.sendStoredCategoryInService();
			if (categoryNames === undefined) {
				$log.warn("This page cannot be refreshed, RETURNING TO CATEGORIES PAGE")
				$state.go("setItUp");
			}
			
			$scope.categoryNameRaffle = categoryNames.name;
			console.log("The Names object from service ", $scope.categoryNameRaffle);
			$scope._id = categoryNames._id
			$scope.normalItems = categoryNames.items.normalItems;
			$scope.raffleItems = categoryNames.items.raffleItems;
		}
		$scope.getStoredCategoryInService();



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
			
			$scope.normalItems.unshift(itemsObject);
			$scope.raffleItems.unshift(itemsObject);
			
			theService.addAnItem($scope.normalItems, $scope._id).then(function(response) {
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
			
			$scope.normalItems.splice(index, 1);
			theService.addAnItem($scope.normalItems, $scope._id).then(function(response) {
			});

			$scope.raffleItems.splice(index, 1);
			theService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {

			});
			$scope.getStoredCategoryInService();
		}


		
		//The raffle_randomize function uses Math.random and a for loop to choose an item name at random
		//from the raffleItems array.  As the array is changed the change is updated in the database.
		$scope.raffle_randomize = function() {
			
			var itemsLength = $scope.raffleItems.length;
			var randomNumber = Math.floor(Math.random() * itemsLength);
			for (var i = 0; i < itemsLength; i++) {
				if (i === randomNumber) {
					$scope.finalRandomItem = $scope.raffleItems[i];
					$scope.raffleItems.splice(i, 1);
					theService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {
					});
				}
			}
			$log.info("RANDOMIZING!!!!");
		};


		

		//The raffle_reset function pops out every item from the raffleItems array. 
		$scope.raffle_reset = function() {
			for (var i = 0; i = $scope.raffleItems.length; i++) {
				$scope.raffleItems.pop();
			}
			
			var itemsLength = $scope.normalItems.length;
			for(var i = 0; i < itemsLength; i++) {
					$scope.raffleItems.push($scope.normalItems[i]);
			};
			
			theService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {
			});
		};

	
		$scope.goToInfinity = function() {
			$state.go("infinity-go");
		}



	}
	raffleGoControllerCB.$inject = $inject;
	app.controller("raffleGoController", raffleGoControllerCB);
})();
