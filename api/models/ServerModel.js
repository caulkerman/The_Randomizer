var mongoose = require('mongoose');

// var items = {
// 	normalItems: { type: Array },
// 	raffleItems: { type: Array }
// }

var RandomSchema = mongoose.Schema ({
  
  	name: { type: String },
  	items: { 
  		normalItems: { type: Array },
  		// raffleNormalItems: { type: Array },
 		raffleItems: { type: Array } 
 	}	
  
  });

var collectionName = "the-randomizer";
module.exports = mongoose.model("the-randomizer", RandomSchema, collectionName);


