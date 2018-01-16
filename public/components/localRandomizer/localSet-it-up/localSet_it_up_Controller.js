(() => {
	const $inject = ["$scope", "localService", "$log", "$state"];
	function localSetItUpControllerCB($scope, localService, $log, $state) {
		"use strict";

		/////Begin Controller Code\\\\\
		

		//Using the 3 functions below allows the user to set whether it's raffle or infinity style 
		//and that choice will persist as the user goes back and forth between the categories 
		//and the items.  The choice is saved in the service and called automatically when the categories
		//page is called again.

		//However, just for a simple user convinience I have decided to set the
		//infinityButton to true by default so the user can click into a category immediately.

		
		$scope.raffle = () => {
			let raffleTrue = true;
			let infinityFalse = false;

			localService.trueOrFalse(raffleTrue, infinityFalse);
			$scope.returnedTrueOrFalse = localService.returnTrueOrFalseObject();

			$scope.raffleButton = $scope.returnedTrueOrFalse._param1;
			$scope.infinityButton = $scope.returnedTrueOrFalse._param2;
		};

		$scope.infinity = () => {
			let raffleFalse = false;
			let infinityTrue = true;

			localService.trueOrFalse(raffleFalse, infinityTrue);
			$scope.returnedTrueOrFalse = localService.returnTrueOrFalseObject();

			$scope.raffleButton = $scope.returnedTrueOrFalse._param1;
			$scope.infinityButton = $scope.returnedTrueOrFalse._param2;
		};

		$scope.automaticRestoreTheTrueOrFalse = () => {
			$scope.returnedTrueOrFalse = localService.returnTrueOrFalseObject();
			
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

		//This sets the Randomizer to infinity by default if nothing has been manually chosen.
		(() => {
			$scope.returnedTrueOrFalse = localService.returnTrueOrFalseObject();
			if ($scope.returnedTrueOrFalse._param1 === undefined && $scope.returnedTrueOrFalse._param2 === undefined) {
				$scope.infinity();
			}
		})();

		

		//The getCategories function calls to the localStorage to retrieve any documents in the collection.
		// $scope.getCategories = () => {
		// 	localService.getCategories().then((response) => {
		// 		$scope.categories = response;
		// 		console.log("$scope.categories: ", $scope.categories);
		// 	});
		// };
		// $scope.getCategories();
		$scope.getCategories = () => {
			$scope.categories = localService.getCategories();
			if ($scope.categories === undefined || $scope.categories.length < 1) {
				$scope.nothingThere = true;
			}
				
				console.log("$scope.categories: ", $scope.categories);
		};
		$scope.getCategories();
		

		//The addACategory function takes the category name from the input box and adds it to the list by sending it 
		//to the service so the category object be created.
		$scope.addACategory = categoryName => {
			console.log("the addACategory function has fired and this is the category :", categoryName);
			if ($scope.categoryName === "" || categoryName === undefined) {
				$log.error("You must enter a category name");
				return;
			} 
			else {
				// let id = createCustomId();
				localService.addACategory(categoryName);
				console.log("the category name in controller: ", categoryName);
			}
			$scope.categoryName = "";
			$scope.getCategories();
			$scope.nothingThere = false;
		};


		//User clicks on the category name.  This function loops through all of the categories and finds the
		//one that matches the id and sends it to the localService to be stored in a variable there to be used
		//in another controller when the $state.go() sends the user to that next controler
		$scope.selectCategory = (id) => {
			let theChosenCategory ;
			for(let i = 0; i < $scope.categories.length; i++) {
				// if ($scope.categories[i]._id === id) {
				// 	localService.storeCategoryInService($scope.categories[i]);
				// 	}
				}
			if ($scope.infinityButton === true) {
				$state.go("local-randomizer", {value: true, id: id});
			}
			if ($scope.raffleButton === true) {
			$state.go("local-randomizer", {value: false, id: id});
			}
		};



		$scope.deleteOK = () => {
			$scope.deleteWarning = false;
			$scope.reallyDeleteIt();
		};

		$scope.deleteNO = () => {
			$scope.deleteWarning = false;
			return;
		};

		
		//Obviously this button is to delete any unwanted category. 
		//Using the ng-repeat's $index we can take that category's index and send 
		//it off to the database to be deleted.
		$scope.deleteCategory = index => {
			$scope.deleteWarning = true;
			let name = $scope.categories[index].name;
			
			$scope.reallyDeleteIt = () => {
				localService.deleteCategory(name).then(response => {
					console.log("the then function has worked");
					$scope.getCategories();
				})
			};
		};


		$scope.goToGlobal = () => {
			$state.go("setItUp");
		}

		/////End Controller Code\\\\\
	}
	localSetItUpControllerCB.$inject = $inject;
	app.controller("localSetItUpController", localSetItUpControllerCB);
})();
