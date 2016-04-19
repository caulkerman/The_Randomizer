var Random = require('../models/ServerModel'); 

module.exports = {

  create: function(req, res) { 
    console.log("res.body in create function", res.body);
    console.log("req.body in create function", req.body);
    var newRandom = new Random(req.body);//don't need the "new" but we will put it in anyway.
    newRandom.save(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  

  read: function(req, res) {
    Random.find(req.query)
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  

  normalItemsUpdate: function(req, res) {
    console.log("update function in api controller, req ", req.body);
    Random.findByIdAndUpdate(req.params.id, {"items.normalItems": req.body},  { "new": true }, function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
    console.log("the res.body ", res.body);
  },

  

  raffleItemsUpdate: function(req, res) {
    console.log("update function in api controller, req ", req.body);
    Random.findByIdAndUpdate(req.params.id, {"items.raffleItems": req.body},  { "new": true }, function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
    console.log("the res.body ", res.body);
  },

  

  delete: function(req, res) {
    Random.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  }
};
