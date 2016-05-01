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
					// "width": "64%",
					"background-color": "#79b913"
				});
				
				$("button#infinityButton")
				
				.css({"color": "#EEEEEE",
					"font-size": ".6em",
					"padding": "4px 10px 0 10px",
					"background-color": "#5b8a0f"
				});		
			});
			

			$("button#infinityButton").on("click", function() {
				
				$("button#infinityButton")
				.css({"color": "#FFFFFF",
					"font-size": "1em",
					"padding": "0 10px 4px 10px",
					"background-color": "#79b913"
				});
				
				$("button#raffleButton")
				
				.css({"color": "#EEEEEE",
					"font-size": ".6em",
					// "padding": "4px 10px 0 10px",
					"background-color": "#5b8a0f"
				});
			});


			///The if statement methods allow the button colors to persist while 
			//navigating from one category to another.
			
			if ($scope.raffleButton === true) {
				$("button#raffleButton")
				.css({"color": "#FFFFFF",
					"font-size": "1em",
					// "width": "64%",
					"background-color": "#79b913"
				});
				
				$("button#infinityButton")
				.css({"color": "#EEEEEE",
					"font-size": ".6em",
					"padding": "4px 10px 0 10px",
					"background-color": "#5b8a0f"
				});
			};

			if ($scope.infinityButton === true) {
				$("button#infinityButton")
				.css({"color": "#FFFFFF",
					"font-size": "1em",
					"padding": "0 10px 4px 10px",
					"background-color": "#79b913"
				});
				
				$("button#raffleButton")
				.css({"color": "#EEEEEE",
					"font-size": ".6em",
					// "width": "34%",
					"background-color": "#5b8a0f"
				});
			};
		
		}
	};
});