app.service("setItUpService", ["$http", "$q", function($http, $q) {


//makeACategoryObject function creates the properties for the categoryObject object.
var categoryObject = {};



this.makeACategoryObject = function(categoryName) {
	categoryObject.name = categoryName;
	categoryObject.items = [];
}



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
	})
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
	})
	return deferred.promise;
};



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
	})
	return deferred.promise;
};



this.deleteCategory = function(id) {
	var deferred = $q.defer();
	
	$http({
		method: "DELETE",
		url: '/api/subject-items-Lists/' + id,
	}).then(function(response) {
		console.log("deleted inside the service", response);
		

		deferred.resolve(response);
	})
	return deferred.promise;
};


var storedCategory;
this.storeCategoryInService = function(category) {
	storedCategory = category;
	// console.log("storedCategory in service ", storedCategory)
}

this.sendStoredCategoryInService = function() {
	return storedCategory;
}









}]);