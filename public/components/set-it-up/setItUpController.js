(function() {
	var $inject = ["$scope", "$log", "setItUpService", "$timeout", "$state", "$stateParams"];
	function setItUpControllerCB($scope, $log, setItUpService, $timeout, $state, $stateParams) {

		/////////ADD CONTROLLER JAVASCRIPT BELOW////////
		

		$scope.raffleButton = false;
		$scope.infinityButton = false;
		
		//If you check one the other will uncheck, if you uncheck it will check the other.
		$scope.raffle = function() {
			$scope.raffleButton = true;
			$scope.infinityButton = false;
			console.log("raffleButton ", $scope.raffleButton, "infinityButton ", $scope.infinityButton);
		}

		$scope.infinity = function() {
			$scope.raffleButton = false;
			$scope.infinityButton = true;
			console.log("raffleButton ", $scope.raffleButton, "infinityButton ", $scope.infinityButton);
		}


		

		//The getCategories function calls to the database to retrieve any documents in the collection.
		$scope.getCategories = function() {
			setItUpService.getCategories().then(function(response) {
				console.log("In controller, response from GET functions = ", response);
				if(response.status === 200) {
					$scope.categories = response.data;
				} else {
					$log.error("No response from database");
				}
			});
		};
		$scope.getCategories();

		
		
		//The addACategory function takes the category name from the input box and adds it to the list by sending it 
		//to the service so the category object be created.
		$scope.addACategory = function(categoryName) {
			if ($scope.categoryName === "" || categoryName === undefined) {
				$log.error("You must enter a category name");
				return;
			} 
			else {
				// console.log("category name = ", categoryName);
				setItUpService.makeACategoryObject(categoryName);
				setItUpService.postCategoryObject().then(function(response) {
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
				setItUpService.storeCategoryInService(category);
			}
			sendCategoryToService();
			
			if ($scope.infinityButton === true) {
				$state.go("infinity-go");
			}
			if ($scope.raffleButton === true) {
			$state.go("raffle-go")
			}
		}

		
		//This is a button on the items list pages that takes us back to the category view.
		$scope.categoriesShow = function() { 
			$state.go("setItUp");
		}

		
		//Obviously this button is to delete any unwanted category. 
		//Using the ng-repeat's $index we can take that category's index and send 
		//it off to the database to be deleted.
		$scope.deleteCategory = function(index) {
			var id = $scope.categories[index]._id;
			setItUpService.deleteCategory(id).then(function(response) {
				// console.log("category item deleted");
			})
			$scope.getCategories();
		};





	
	}
	setItUpControllerCB.$inject = $inject;
	app.controller("setItUpController", setItUpControllerCB)
})();
