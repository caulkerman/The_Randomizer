var mongoose = require('mongoose');

var RandomSchema = mongoose.Schema ({
  name: { type: String },
  items: {type: Array }
  });

var collectionName = "the-randomizer";
module.exports = mongoose.model("the-randomizer", RandomSchema, collectionName);


