(() => {
	"use strict";
	const $inject = ["$scope", "$log", "localService", "$state", "$stateParams"];
	function localRandomizerControllerCB($scope, $log, localService, $state, $stateParams) {
		////Begin Controller Code\\\\\

		$scope.value = $stateParams.value;
		console.log("value: ", typeof($stateParams.value), $scope.value);
		const id = $stateParams.id;
		// $scope.raffleItems = [];
		// $scope.infinityItems = [];
		let infinityItems;
		let raffleItems;
		$scope.showInfinity;
		$scope.showRaffle;
		// console.log("The trueOrFalseObject: ", localService.returnTrueOrFalseObject());		


		$scope.categoriesShow = () => {
			$state.go("local-set-it-up");
		};


		$scope.getCategories = () => {
			$scope.categories = localService.getCategories()
				for (let i = 0; i < $scope.categories.length; i++) {
					if ($scope.categories[i]._id === id) {
						$scope.theCategory = $scope.categories[i];
						$scope.infinityItems = $scope.theCategory.items.infinityItems;
						$scope.raffleItems = $scope.theCategory.items.raffleItems;
						console.log("$scope.theCategory: ", $scope.theCategory);
					};
				};
		};
		$scope.getCategories();

		$scope.addAnItem = categoryItem => {
			console.log("the categoryItem: ", categoryItem);
			if (categoryItem) {
				$scope.raffleItems.unshift(categoryItem);
				$scope.infinityItems.unshift(categoryItem);
				localService.saveToLocalStorage($scope.categories).then((response) => {
					$scope.getCategories();
					$scope.categoryItem = "";
				});
			}	
		}


		$scope.deleteItem = index => {
			$scope.raffleItems.splice(index, 1);
			$scope.theCategory.items.infinityItems.splice(index, 1);
			localService.saveToLocalStorage($scope.categories).then((response) => {
				$scope.getCategories();
			});
		};


		$scope.raffleRandomize = () => {
			var itemsLength = $scope.raffleItems.length;
			var randomNumber = Math.floor(Math.random() * itemsLength);
			$scope.finalRandomItem = $scope.raffleItems[randomNumber];
			$scope.raffleItems.splice([randomNumber], 1);
			localService.saveToLocalStorage($scope.categories).then((response) => {
				$scope.getCategories();
			});
			$log.info("RANDOMIZING!!!!");
		};


		$scope.infinityRandomize = () => {
			let itemsLength = $scope.infinityItems.length;
			let randomNumber = Math.floor(Math.random() * itemsLength);
			$scope.finalRandomItem = $scope.infinityItems[randomNumber];
			$log.info("RANDOMIZING!!!!", $scope.finalRandomItem);
		};


		$scope.raffle_reset = function() {
			for (let i = 0; i = $scope.raffleItems.length; i++) {
				$scope.raffleItems.pop();
			}
			
			let itemsLength = $scope.infinityItems.length;
			for(let i = 0; i < itemsLength; i++) {
					$scope.raffleItems.push($scope.infinityItems[i]);
			}
			localService.saveToLocalStorage($scope.categories).then((response) => {
				$scope.getCategories();
			});
		};


		if($scope.value === "true") {
			$scope.showRaffle = true;
			$scope.showInfinity = false;
		}

		if ($scope.value === "false") {
			$scope.showRaffle = false;
			$scope.showInfinity = true;
		}

		$scope.goToRaffle = () => {
			let raffleTrue = true;
			let infinityFalse = false;
			localService.trueOrFalse(raffleTrue, infinityFalse);
			$scope.value = "false";
			
			$scope.showRaffle = false;
			$scope.showInfinity = true;
		}
		$scope.goToInfinity = () => {
			let raffleFalse = false;
			let infinityTrue = true;
			localService.trueOrFalse(raffleFalse, infinityTrue);
			$scope.value = "true";

			$scope.showRaffle = true;
			$scope.showInfinity = false;
		}

		$scope.randomize = () => {
			if ($scope.value === "true") {
				$scope.infinityRandomize()
			}
			if ($scope.value === "false") {
				$scope.raffleRandomize()
			}
		}
		


		////End Controller Code\\\\\\  	
	}
	localRandomizerControllerCB.$inject = $inject;
	app.controller("localRandomizerController", localRandomizerControllerCB);
})();