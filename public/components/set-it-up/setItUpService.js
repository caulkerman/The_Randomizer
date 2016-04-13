app.service("setItUpService", ["$http", "$q", function($http, $q) {


var storedCategory;
var categoryObject = {};
var trueOrFalseObject = {}


//makeACategoryObject function takes the categoryName parameter from 
//setItUpController and assigns the properties to the categoryObject 
//object already defined at page load.
this.makeACategoryObject = function(categoryName) {
	categoryObject.name = categoryName;
	categoryObject.items = [];
};



//postCategoryObject function posts the categoryObject object to the database.
this.postCategoryObject = function() {
	var deferred = $q.defer();
	$http({
		method: "POST",
		url: '/api/subject-items-Lists',
		data: categoryObject
	}).then(function(response) {
		deferred.resolve(response);
		// console.log("response in the service = ", response);
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
		// console.log("GET response in service = ", response);
		deferred.resolve(response);
	});
	return deferred.promise;
};



//The addAnItem serves to PUT new items onto the categoryObject during update.  
//This function is also used in the app whenever an update is needed.
this.addAnItem = function(itemName, id) {
	console.warn("In service, the item ", itemName);
	var deferred = $q.defer();
	$http({
		method: "PUT",
		url: '/api/subject-items-Lists/' + id,
		data: itemName
	}).then(function(response) {
		// console.log("In service, items updated", response)
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
		// console.log("deleted inside the service", response);
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



this.trueOrFalse = function(param1, param2) {
	trueOrFalseObject._param1 = param1,
	trueOrFalseObject._param2 = param2
	console.log("trueOrFalse object in service ", trueOrFalseObject)
}

this.returnTrueOrFalseObject = function() {
	return trueOrFalseObject;
}



// this.infinity = function(infinityBoolean) {

// }











}]);