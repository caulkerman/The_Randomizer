(function() {
	var $inject = ["$scope", "$log", "$state", "$stateParams", "setItUpService"];
	function raffleGoControllerCB($scope, $log, $state, $stateParams, setItUpService) {


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
		//is undefined.
		$scope.getStoredCategoryInService = function() {
			var categoryNames = setItUpService.sendStoredCategoryInService();
			if (categoryNames === undefined) {
				$log.warn("This page cannot be refreshed, RETURNING TO CATEGORIES PAGE")
			$state.go("setItUp");
			}
			// console.log("The categoryNames object from service ",categoryNames);
			$scope._id = categoryNames._id
			$scope.normalItems = categoryNames.items.normalItems;
			$scope.raffleItems = categoryNames.items.raffleItems;
			$scope.categoryNameRaffle = categoryNames.name;  //the items array of objects containing itemName and itemShow.
			// console.log("$scope.normalItems ", $scope.normalItems);
			// console.log("$scope.raffleItems ", $scope.raffleItems);
			// console.log("id ", $scope._id);
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
				itemName: itemName,
				// itemShow: true
			};
			$scope.normalItems.unshift(itemsObject);
			setItUpService.addAnItem($scope.normalItems, $scope._id).then(function(response) {
				// console.log("the addAnItem response ", response)
			});
			$scope.categoryItem = "";
			$scope.getStoredCategoryInService();
			}
		};



		//Obviously to splice out the particular item in the items array and get the 
		//object updated in the database.
		$scope.deleteItem = function(index) {
			$scope.normalItems.splice(index, 1);
			setItUpService.addAnItem($scope.normalItems, $scope._id).then(function(response) {
				// console.log("delete Item response ", response);
			})
			$scope.getStoredCategoryInService();
		}


		
		//The raffle_randomize function uses Math.random and a for loop to choose an item name at random.
		//The item name is then  pushed to the raffleItems array as a backup copy while the normalItems
		//array has that chosen item name spliced from it.  Both arrays are sent to the database for updating
		//independently of each other.
		$scope.raffle_randomize = function() {
			
			var itemsLength = $scope.normalItems.length;
			var randomNumber = Math.floor(Math.random() * itemsLength);
			for (var i = 0; i < itemsLength; i++) {
				if (i === randomNumber) {
					$scope.finalRandomItem = $scope.normalItems[i];
					$scope.raffleItems.push($scope.finalRandomItem);
					$scope.normalItems.splice(i, 1);
					setItUpService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {
					});
					setItUpService.addAnItem($scope.normalItems, $scope._id).then(function(response) {
					});
					
					// console.log("the normalItems Array ", $scope.normalItems);
					// console.log("the raffleItems Array ", $scope.raffleItems);
				}
			}
			$log.info("RANDOMIZING!!!!");
		};


		

		//The raffle_reset function uses a for loop and pushes each item name from the raffleItems array
		//back to the normalItems array.  Then another for loop loops over the raffleItems array and deletes
		//each item using the .pop() method.  The arrays are then updated in the database.
		$scope.raffle_reset = function() {
			// debugger
			var itemsLength = $scope.raffleItems.length;
			for(var i = 0; i < itemsLength; i++) {
				$scope.normalItems.push($scope.raffleItems[i]);
			};

			for(var i = 0; i < itemsLength; i++) {
				$scope.raffleItems.pop();
			}
			
			setItUpService.addAnItem($scope.normalItems, $scope._id).then(function(response) {
			});
			setItUpService.updateRaffleItemsArray($scope.raffleItems, $scope._id).then(function(response) {
			});
		};

	







	}
	raffleGoControllerCB.$inject = $inject;
	app.controller("raffleGoController", raffleGoControllerCB);
})();
