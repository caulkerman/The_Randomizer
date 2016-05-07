app.service("theService", ["$http", "$q", function($http, $q) {


var storedCategory;
var categoryObject = {};
var trueOrFalseObject = {}


//postCategoryObject function posts the categoryObject object to the database.
this.postCategoryObject = function(categoryName) {
	categoryObject.name = categoryName;
	categoryObject.items = {};

	var deferred = $q.defer();
	$http({
		method: "POST",
		url: '/api/subject-items-Lists',
		data: categoryObject
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};



//getCategories function calls to the database and gets the categoris from the database.
this.getCategories = function() {
	var deferred = $q.defer();
	$http({
		method: "GET",
		url: '/api/subject-items-Lists'
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};



//The addAnItem serves to PUT new items onto the categoryObject during update.  
//This function is also used in the app whenever an update is needed.
this.addAnItem = function(itemName, id) {
	var deferred = $q.defer();
	$http({
		method: "PUT",
		url: '/api/subject-items-Lists/' + id,
		data: itemName
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};



this.updateRaffleItemsArray = function(itemName, id) {
	var deferred = $q.defer();
	$http({
		method: "PUT",
		url: '/api/raffle-subject-Lists/' + id,
		data: itemName
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};



this.deleteCategory = function(id) {
	var deferred = $q.defer();
	
	$http({
		method: "DELETE",
		url: '/api/subject-items-Lists/' + id,
	}).then(function(response) {
		deferred.resolve(response);
	});
	return deferred.promise;
};



//The storeCategoryInService function and sendStoredCategoryInService functions take a specific category
//object and store it in the storedCategory variable defined at the top.  The purpose is to transfer 
//the object from one controller to another.
this.storeCategoryInService = function(category) {
	storedCategory = category;
};
this.sendStoredCategoryInService = function() {
	return storedCategory;
};



//The trueOrFalse and returnTrueOrFalseObject functions save the user's choice of either raffle style
//or infinity style randomizer and returns it to the controller so they can stay either raffle or infinity
//as they use the app.
this.trueOrFalse = function(param1, param2) {
	trueOrFalseObject._param1 = param1,
	trueOrFalseObject._param2 = param2
}

this.returnTrueOrFalseObject = function() {
	return trueOrFalseObject;
}













}]);