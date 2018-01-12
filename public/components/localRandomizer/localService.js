(() => {
	"use strict";
	const $inject = ["$q"];
	function localServiceCB($q) {

	///Begin Service Code\\\\
	

	let storedCategory;
	let trueOrFalseObject = {};
	let categories = [];


//This function is set up so that if the local storage is empty, thus returning null, the function will quit 
//and not throw an error stopping the app.  If it is null then do nothing, otherwise if something comes back
//then assign it to categories and return it.
	this.getCategories = () => {
		// let deferred = $q.defer();
		let retrievedData = localStorage.getItem("categories");
		if (retrievedData === null) {
			console.error("The response from Local Storage came back null");
			return
		} else {
		categories = JSON.parse(retrievedData);
		return categories;
		// deferred.resolve(categories);
		// return deferred.promise;
		}
	};

	this.addACategory = (categoryName) => {
		let _id = this.createCustomId();
		function Category(name) {
			this.name = name;
			this.items = {};
			this.items.raffleItems = [];
			this.items.infinityItems = [];
			this._id = _id;
		};
		let categoryObject = new Category(categoryName);
		categories.push(categoryObject);
		this.saveToLocalStorage();//had to make sure this function call was above the function below
	};

	this.saveToLocalStorage = (catFromController) => {
		let deferred = $q.defer();
		console.log("Saving categories to localStorage", categories);
		localStorage.setItem("categories", JSON.stringify(categories));
		let retrievedData = localStorage.getItem("categories");
		categories = JSON.parse(retrievedData);
		deferred.resolve(categories);
		return deferred.promise;
	}

	//The storeCategoryInService function and sendStoredCategoryInService functions take a specific category
	//object and store it in the storedCategory variable defined at the top.  The purpose is to transfer 
	//the object from one controller to another.
	this.storeCategoryInService = category => {
		storedCategory = category;
		// console.log("This is the category from the controller stored in the storedCategory varible. ", storedCategory);
	};
	this.sendStoredCategoryInService = () => {
		return storedCategory;
	};

	//The trueOrFalse and returnTrueOrFalseObject functions save the user's choice of either raffle style
	//or infinity style randomizer and returns it to the controller so they can stay either raffle or infinity
	//as they use the app.
	this.trueOrFalse = (param1, param2) => {
		trueOrFalseObject._param1 = param1;
		trueOrFalseObject._param2 = param2;
	};

	this.returnTrueOrFalseObject = () => {
		return trueOrFalseObject;
	};


	this.deleteCategory = name => {
		let deferred = $q.defer();
		for (let i = 0; i < categories.length; i ++) {
			if (categories[i].name === name) {
				categories.splice([i], 1);
				localStorage.setItem("categories", JSON.stringify(categories));
			}
		}
		let retrievedData = localStorage.getItem("categories");
		categories = JSON.parse(retrievedData);
		deferred.resolve(categories);
		return deferred.promise;
	}


	this.dataBaseToLocal = (publicCategory) => {
		let deferred = $q.defer();
		console.log("the publicCategory: ", publicCategory)
		categories.push(publicCategory);
		localStorage.setItem("categories", JSON.stringify(categories));
		let retrievedData = localStorage.getItem("categories");
		categories = JSON.parse(retrievedData);
		deferred.resolve(categories);
		return deferred.promise;
	}


	this.createCustomId = () => {
	let customId = "E";
	let lettersArray = ["A", "a", "B", "b", "C", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z"];
	let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	for(let i = 0; i < 12; i++) {
		let letter = Math.floor(Math.random() * lettersArray.length);
		let customIdLetter = lettersArray[letter];

		let number = Math.floor(Math.random() * numbersArray.length);
		let customIdNumber = numbersArray[number];

		customId = customId + customIdLetter + customIdNumber;
	}
	return customId;
};





	////End Service Code\\\\\
	
	}
	localServiceCB.$inject = $inject;
	app.service("localService", localServiceCB);


})();