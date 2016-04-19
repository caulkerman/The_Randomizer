// var Random = require("../models/ServerModel");

// module.exports = {

// 	update: function(req, res) {
//     console.log("update function in api controller, req ", req.body);
//     Random.findByIdAndUpdate(req.params.id, {"items.raffleItems": req.body},  { "new": true }, function(err, result) {
//       if (err) return res.status(500).send(err);
//       else res.send(result);
//     });
//     console.log("the res.body ", res.body);
// 	}

// };