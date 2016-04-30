app.directive("rwClick", function() {
	return {

		restrict: "A",
		controller: function() {
			
			var audio1 = $("#clickSound")[0];

			$(".go_button").on("click", function() {
  				audio1.play();
			});
		}
	}


})