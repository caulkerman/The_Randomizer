(function() {
	"use strict";
	var $inject = ["$scope", "$log", "theService", "$state", "$stateParams", "localService"];
	function setItUpControllerCB($scope, $log, theService, $state, $stateParams, localService) {

		/////////ADD CONTROLLER JAVASCRIPT BELOW////////
		

		
		//Using the 3 functions below allows the user to set whether it's raffle or infinity style 
		//and that choice will persist as the user goes back and forth between the categories 
		//and the items.  The choice is saved in the service and called automatically when the categories
		//page is called again.

		//However, just for a simple user convinience I have decided to set the
		//infinityButton to true by default so the user can click into a category immediately.

		$scope.infinityButton = true;


		$scope.raffle = function() {
			// $scope.alert = false;
			var raffleTrue = true;
			var infinityFalse = false;
			
			theService.trueOrFalse(raffleTrue, infinityFalse);
			
			$scope.returnedTrueOrFalse = theService.returnTrueOrFalseObject();
			$scope.raffleButton = $scope.returnedTrueOrFalse._param1;
			$scope.infinityButton = $scope.returnedTrueOrFalse._param2;
		};
		$scope.infinity = function() {
			// $scope.alert = false;
			var raffleFalse = false;
			var infinityTrue = true;
			
			theService.trueOrFalse(raffleFalse, infinityTrue);
			
			$scope.returnedTrueOrFalse = theService.returnTrueOrFalseObject();
			$scope.raffleButton = $scope.returnedTrueOrFalse._param1;
			$scope.infinityButton = $scope.returnedTrueOrFalse._param2;
			// console.log("raffleButton false ", $scope.raffleButton, "infinityButton true ", $scope.infinityButton);
		};
		$scope.automaticRestoreTheTrueOrFalse = function() {
			$scope.returnedTrueOrFalse = theService.returnTrueOrFalseObject();
			
			if ($scope.returnedTrueOrFalse._param1 === true) {
				$scope.raffleButton = $scope.returnedTrueOrFalse._param1;
				$scope.infinityButton = $scope.returnedTrueOrFalse._param2;
			}
			
			if ($scope.returnedTrueOrFalse._param1 === false) {
				$scope.raffleButton = $scope.returnedTrueOrFalse._param1;
				$scope.infinityButton = $scope.returnedTrueOrFalse._param2;
			}
		};
		
		$scope.automaticRestoreTheTrueOrFalse();

		

		//The getCategories function calls to the database to retrieve any documents in the collection.
		$scope.getCategories = function() {
			theService.getCategories().then(function(response) {
				if(response.status === 200) {
					$scope.categories = response.data;
					console.log($scope.categories);
				} else {
					$log.error("No response from database");
					alart("Oops.  It looks like we're not connected to the FREE Mlab MongoDB database.  That's OK, you will still be able to play with the app, it's just that your data won't be saved after this session is over.");
					$state.go("local-set-it-up")
				}
			});
		};
		$scope.getCategories();

		(() => {
			$scope.localCategories = localService.getCategories();
		})();


		
		
		//The addACategory function takes the category name from the input box and adds it to the list by sending it 
		//to the service so the category object be created.
		$scope.addACategory = function(categoryName) {
			if ($scope.categoryName === "" || categoryName === undefined) {
				$log.error("You must enter a category name");
				return;
			} 
			else {
				theService.postCategoryObject(categoryName).then(function(response) {
				});
			}
			$scope.categoryName = "";
			$scope.getCategories();
		};


		

		// The user clicks on one of the categories and fires this function.  
		// This function splits the $scope.category object up into the different properties and 
		//reassigns them to new $scope properties to be used elsewhere at convinience.  
		// The entire category object is also passed through as an argument so that it can be sent 
		// to service and then sent to the infinity-go-controller.
		$scope.selectCategory = function(index, name, id, items, category) {
			$scope.categoryIndex = index;
			$scope.categoryNameInfinity = name;
			$scope.categoryNameRaffle = name;
			$scope._id = id;
			$scope.categoryItems = items;
			$scope.category = category;
			
			function sendCategoryToService() {
				theService.storeCategoryInService(category);
			}
			sendCategoryToService();
			
			if ($scope.infinityButton === undefined && $scope.raffleButton === undefined) {
				// $scope.alert = true;
			}
			if ($scope.infinityButton === true) {
				$state.go("infinity-go", {id: $scope.category._id});
			}
			if ($scope.raffleButton === true) {
			$state.go("raffle-go", {id: $scope.category._id});
			}
		};



		$scope.deleteOK = function() {
			$scope.deleteWarning = false;
			$scope.reallyDeleteIt();
		};

		$scope.deleteNO = function() {
			$scope.deleteWarning = false;
			return;
		};

		
		//Obviously this button is to delete any unwanted category. 
		//Using the ng-repeat's $index we can take that category's index and send 
		//it off to the database to be deleted.
		$scope.deleteCategory = function(index) {
			$scope.deleteWarning = true;
			var id = $scope.categories[index]._id;
			
			$scope.reallyDeleteIt = function() {
				theService.deleteCategory(id).then(function(response) {
					$scope.categories = response.data;
				});
				$scope.getCategories();
			};
		};


		$scope.goToLocal = function() {
			// alert("going to local");
			$state.go("local-set-it-up");
		}
		

		$scope.downloadCategory = (id) => {
			for (let i = 0; i < $scope.categories.length; i++) {
				if ($scope.categories[i]._id === id) {
					localService.dataBaseToLocal($scope.categories[i]).then((response) => {
						$state.go("local-set-it-up");
					})
				};
			};
		}







	}
	setItUpControllerCB.$inject = $inject;
	app.controller("categoryController", setItUpControllerCB);
})();
