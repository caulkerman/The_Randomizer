var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');


// Controllers
var RandomCtrl = require('./api/controllers/ServerController');

// Express
var app = express();

// Express Middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

// Endpoints
app.post('/api/subject-items-Lists', RandomCtrl.create);
app.get('/api/subject-items-Lists', RandomCtrl.read);
app.put('/api/subject-items-Lists/:id', RandomCtrl.normalItemsUpdate);
app.put('/api/raffle-subject-Lists/:id', RandomCtrl.raffleItemsUpdate);
//The below PUT function only if I want the raffleNormalItems array updated.  
//I would still have to create the funtion in the setItUpService to create the API.
// app.put("/api//:id", RandomCtrl.raffleNormalItemsUpdate);
app.delete('/api/subject-items-Lists/:id', RandomCtrl.delete);



// Connections
var port = 9898;
// var mongoUri = 'mongodb://localhost:27017/the-randomizer';
var mLabsPassword = require("./api/mLabsPassword/mLabsPassword")
var mongoUri = mLabsPassword.password;
mongoose.set('debug', true);
mongoose.connect(mongoUri, {
	useMongoClient: true
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {  ////event listener
  console.log('connected to mongoDB at: ', mongoUri);
});

app.listen(port, function() {
  console.log('listening on port: ', port);
});