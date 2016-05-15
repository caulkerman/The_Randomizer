app.directive("rwButtonColors", function() {
	return {
		
		controller: function($scope) {

			///We want the buttons for the randomizers to show a certain color or characteristic 
			//when the user wants either raffle style or infinity style.  We use jQuery to make the
			//changes as each button is clicked to show which type of randomizer is in play.
			$("button#raffleButton").on("click", function() {
				
				$("button#raffleButton")
				.css({"color": "#FFFFFF",
					"font-size": "1em",
					"background-color": "#003366"
				});
				
				$("button#infinityButton")
				.css({"color": "#333333",
					"font-size": ".8em",
					"padding": "4px 10px 0 10px",
					"background-color": "#FFFFFF"
				});		
			});
			

			$("button#infinityButton").on("click", function() {
				
				$("button#infinityButton")
				.css({"color": "#FFFFFF",
					"font-size": "1em",
					"padding": "0 10px 4px 10px",
					"background-color": "#003366"
				});
				
				$("button#raffleButton")
				
				.css({"color": "#333333",
					"font-size": ".8em",
					"background-color": "#FFFFFF"
				});
			});


			///The if statement methods allow the button colors to persist while 
			//navigating from one category to another.
			
			if ($scope.raffleButton === true) {
				$("button#raffleButton")
				.css({"color": "#FFFFFF",
					"font-size": "1em",
					"background-color": "#003366"
				});
				
				$("button#infinityButton")
				.css({"color": "#333333",
					"font-size": ".8em",
					"padding": "4px 10px 0 10px",
					"background-color": "#FFFFFF"
				});
			};

			if ($scope.infinityButton === true) {
				$("button#infinityButton")
				.css({"color": "#FFFFFF",
					"font-size": "1em",
					"padding": "0 10px 4px 10px",
					"background-color": "#003366"
				});
				
				$("button#raffleButton")
				.css({"color": "#333333",
					"font-size": ".8em",
					"background-color": "#FFFFFF"
				});
			};
		
		}
	};
});