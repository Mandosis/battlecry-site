"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var config = require('../modules/config');
var views = require('./routes/views');

var app = express();

// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', views);

// Start the server
var server = app.listen(process.env.PORT || config.port, () => {
  // Get the port number the server is currently running on.
  let port = server.address().port;
  console.log('Listening on port ' + port + '. Press ctrl + c to stop');
});
