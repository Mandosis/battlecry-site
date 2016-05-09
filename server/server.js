var express = require('express');
var session = require('express-session');
var request = require('request');
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
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000, secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
},
function(req, username, password, done) {

  // Options for request
  var options = {
    url: 'http://' + config.api + '/v1/auth/site',
    method: 'POST',
    headers: {
      'x-access-token': config.token
    },
    form: {
      username: username,
      password: password
    }
  };


  // Send user info to api for authentication results
  request.post(options, function(error, response, body) {
    // Convert string to an object
    body = JSON.parse(body);

    // Check if passwords matched
    if(body.success) {
      done(null, body.data);
    } else {
      done(null, false);
    }
  });
}));

passport.serializeUser(function(user, done){
  console.log('Hit serializeUser');
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log('Hit deserializeUser');

  // Options for request
  var options = {
    url: 'http://' + config.api + '/v1/auth/site/deserialize',
    method: 'POST',
    headers: {
      'x-access-token': config.token
    },
    form: {
      id: id,
    }
  };

  // Send user info to api for authentication results
  request.post(options, function(error, response, body) {
    // Convert string to an object
    body = JSON.parse(body);

    // Check if passwords matched
    if(body.success) {
      done(null, body.data);
    } else {
      done(body.message);
    }
  });
});

// Router
app.use('/', router);

// Start server
var server = app.listen(config.port, function() {
  // Get the actual port server is running on
  var port = server.address().port;
  console.log('Listening on port', port + '. Press ctrl + c to exit.');
});
