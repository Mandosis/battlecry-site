var express = require('express');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var morgan = require('morgan');
var router = require('./routes/router');
var config = require('../modules/config');

var app = express();

// Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('server/public'));
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use('/', router);

// Start server
var server = app.listen(config.port, function() {
  // Get the actual port server is running on
  var port = server.address().port;
  console.log('Listening on port', port + '. Press ctrl + c to exit.');
});
