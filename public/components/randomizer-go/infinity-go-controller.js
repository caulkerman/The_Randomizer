(function() {
	var $inject = ["$scope", "$log", "setItUpService", "$state", "$stateParams"];
	function infinityGoControllerCB($scope, $log, setItUpService, $state, $stateParams) {

		
			//  CONTROLLER CODE HERE  //

		// $scope.getCategories = function() {
		// 	setItUpService.getCategories().then(function(response) {
		// 		// console.log("In Infinity Go Controller, response from GET functions = ", response);
		// 		if(response.status === 200) {
		// 			$scope.category = response.data;
		// 		} else {
		// 			$log.error("No response from database");
		// 		}
		// 	});
		// };
		// $scope.getCategories();


	
		$scope.categoriesShow = function() {
			$state.go("setItUp");
		}

		$scope.getStoredCategoryInService = function() {

			var categoryNames = setItUpService.sendStoredCategoryInService();
			if (categoryNames === undefined) {
			$state.go("setItUp");
			}
			$scope._id = categoryNames._id
			$scope.items = categoryNames.items;
			$scope.categoryNameInfinity = categoryNames.name;  //the items array of objects containing itemName and itemShow.
			console.log("$scope.items ", $scope.items);
			console.log("id ", $scope._id);

		
		}
		$scope.getStoredCategoryInService();
		// $scope.getSomething = function() {
		// 	console.log($scope.category.name);
		// }





		$scope.addAnItem = function(itemName) {
			if ($scope.categoryItem === "" || $scope.categoryItem === undefined) {
				$log.error("You must enter into the input box");
				return;
			}
			else {
			var itemsObject = {
				itemName: itemName,
				itemShow: true
			};
			$scope.items.unshift(itemsObject);
			setItUpService.addAnItem($scope.items, $scope._id).then(function(response) {
				// console.log("the addAnItem response ", response)
			});
			$scope.categoryItem = "";
			$scope.getStoredCategoryInService();
			}
		};



		$scope.deleteItem = function(index) {
			$scope.items.splice(index, 1);
			setItUpService.addAnItem($scope.items, $scope._id).then(function(response) {
				console.log("delete Item response ", response);
			})
			$scope.getStoredCategoryInService();
		}



		$scope.infinity_randomize = function() {
			var itemsLength = $scope.items.length;
			var randomNumber = Math.floor(Math.random() * itemsLength);
			for (var i = 0; i < itemsLength; i++) {
				if (i === randomNumber) {
					$scope.finalRandomItem = $scope.items[i];
				}
			}
		}

	





	}
	infinityGoControllerCB.$inject = $inject;
	app.controller("infinityGoController", infinityGoControllerCB)
})();





