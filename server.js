// This is an express app, so include express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require("./config");
var User = require("./app/models/user");
var Data = require("./app/models/data");





// Make Morgan log all requests
app.use(morgan("dev"));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || config.port;

console.log("Connecting to MongoDB @ " + config.db_url);
mongoose.connect(config.db_url, {useMongoClient: config.use_mongo_client});

app.set('secret', config.secret);


console.log("Setting up routes...");

console.log(" -> User routes");
var userRoutes = require('./app/routes/userRoutes');

console.log(" -> Authentication routes");
var authRoutes = require("./app/routes/authenticationRoutes");

console.log(" -> Data routes");
var dataRoutes = require("./app/routes/dataRoutes");

// Tell the routes about this app
app.use(userRoutes);
app.use(authRoutes);
app.use(dataRoutes);

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


app.listen(port);
console.log("Sensorweb server is up and running, listening on port " + port);
