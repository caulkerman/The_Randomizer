app.directive("rwButtonColors", function() {
	return {
		
		controller: function($scope) {

			///We want the buttons for the randomizers to show a certain color or characteristic 
			//when the user wants either raffle style or infinity style.  We use jQuery to make the
			//changes as each button is clicked to show which type of randomizer is in play.
			$("button#raffleButton").on("click", function() {
				
				$("button#raffleButton")
				.css({"color": "green",
					"font-weight": "900",
					"background-color": "#fff"
				});
				
				$("button#infinityButton")
				.css({"color": "gray",
					"font-weight": "normal",
					"background-color": "tan"
				});
			});		

			

			$("button#infinityButton").on("click", function() {
				
				$("button#infinityButton")
				.css({"color": "green",
					"font-weight": "900",
					"background-color": "#fff"
				});
				
				$("button#raffleButton")
				.css({"color": "gray",
					"font-weight": "normal",
					"background-color": "tan"
				});
			});


			///The if statement methods allow the button colors to persist while 
			//navigating from one category to another.
			
			if ($scope.raffleButton === true) {
				$("button#raffleButton")
				.css({"color": "green",
					"font-weight": "900",
					"background-color": "#fff"
				});
				$("button#infinityButton")
				.css({"color": "gray",
					"font-weight": "normal",
					"background-color": "tan"
				});
			};

			if ($scope.infinityButton === true) {
				$("button#infinityButton")
				.css({"color": "green",
					"font-weight": "900",
					"background-color": "#fff"
				});
				$("button#raffleButton")
				.css({"color": "gray",
					"font-weight": "normal",
					"background-color": "tan"
				});
			};
		
		}
	};
});