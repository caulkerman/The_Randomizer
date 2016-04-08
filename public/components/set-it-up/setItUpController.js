(function() {
	var $inject = ["$scope", "$log", "setItUpService", "$timeout", "$state", "$stateParams"];
	function setItUpControllerCB($scope, $log, setItUpService, $timeout, $state, $stateParams) {

		/////////ADD CONTROLLER JAVASCRIPT BELOW////////

//The purpose of the landing page is to introduce the user to the app for 4 seconds, almost like the app is loading. 
		$scope.landing_page_timeout = function() {
			$log.info("landing_page_timeout function has fired");
			$timeout(function() {
				$state.go("setItUp");
			}, 4000);
		}
		$scope.landing_page_timeout();
		
		$scope.infinityCheckBox = true;//sets the default Randomizer to Infinity mode


		//if you click one the other will unclick, if you unclick it will click the other.
		$scope.raffle = function() {
			if ($scope.raffleCheckBox === false) {
				$scope.infinityCheckBox = true;
			}
			if ($scope.raffleCheckBox === true) {
				$scope.infinityCheckBox = false;
			}
		}

		$scope.infinity = function() {
			if ($scope.infinityCheckBox === true) {
				$scope.raffleCheckBox = false;
			}
			if ($scope.infinityCheckBox === false) {
				$scope.raffleCheckBox = true;
			}
		}


		//After a category object has been created this function is called both at page load and object creation to GET all objects in the collection.
		$scope.getCategories = function() {
			setItUpService.getCategories().then(function(response) {
				console.log("In controller, response from GET functions = ", response);
				if(response.status === 200) {
					$scope.category = response.data;
				} else {
					$log.error("No response from database");
				}
			});
		};
		$scope.getCategories();

		
		//Takes the category name from the input box and sends it to the service so the category object be created.
		$scope.addACategory = function(categoryName) {
			if ($scope.categoryName === "" || categoryName === undefined) {
				$log.error("OR enter a category name");
				return;
			} 
			else {
				console.log("category name = ", categoryName);
				setItUpService.makeACategoryObject(categoryName);
				setItUpService.postCategoryObject().then(function(response) {
				});
			}
			$scope.categoryName = "";
			$scope.getCategories();
		};

		$scope.selectCategory = function(index, name, id, items) {
			$("div#categories").fadeOut(00000001);
			if ($scope.raffleCheckBox === true) {
				$("div#raffle-items").fadeIn(500);
			}
			if ($scope.raffleCheckBox !== true) {
				$("div#infinity-items").fadeIn(500);
			}
			$scope.categoryIndex = index;
			$scope.categoryNameInfinity = name;
			$scope.categoryNameRaffle = name;
			$scope._id = id;
			$scope.categoryItems = items;
			console.log("the name and items of the ng-repeat you just clicked ", name, items);
			$scope.getCategories();
		}

		$scope.categoriesShow = function() {
			$("div#raffle-items, div#infinity-items").hide(0000000001);
			$("div#categories").fadeIn(500);
			
		}

		$scope.addAnItem = function(itemName) {
			if ($scope.categoryItem === "" || $scope.categoryItem === undefined) {
				console.error("You must enter into the input box");
				return;
			}
			else {
			var itemsObject = {
				itemName: itemName,
				itemShow: true
			};
			$scope.categoryItems.push(itemsObject);
			setItUpService.addAnItem($scope.categoryItems, $scope._id).then(function(response) {
				console.log("the addAnItem response ", response)
			});
			$scope.categoryItem = "";
			$scope.getCategories();
			}
		};

		$scope.deleteCategory = function(index) {
			var id = $scope.category[index]._id;
			setItUpService.deleteCategory(id).then(function(response) {
				console.log("category item deleted");
			})
			$scope.getCategories();
		}



		
	













	}
	setItUpControllerCB.$inject = $inject;
	app.controller("setItUpController", setItUpControllerCB)
})();
