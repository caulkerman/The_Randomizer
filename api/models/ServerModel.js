var mongoose = require('mongoose');

var RandomSchema = mongoose.Schema ({
  
  	name: { type: String },
  	items: { 
  		infinityItems: { type: Array },
 		raffleItems: { type: Array } 
 	}	
  
  });


var collectionName = "the-randomizer";
module.exports = mongoose.model("the-randomizer", RandomSchema, collectionName);


