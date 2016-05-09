var router = require('express').Router();
var request = require('request');
var passport = require('passport');
var config = require('../../modules/config');

router.get('/players/:username', function(req, res) {
  var username = req.params.username;

  var options = {
    url: 'http://' + config.api +'/v1/players/' + req.params.username,
    headers: {
      'x-access-token': config.token
    }
  };

  request.get(options, function(error, response, body) {
    if(!error && response.statusCode < 300) {
      var results = JSON.parse(body);
      res.send(results.data);
    } else if(!error && response.statusCode == 404) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  })
});

// Get stats for username
router.get('/players/:username/stats/', function(req, res) {
  var username = req.params.username;

  var options = {
    url: 'http://' + config.api +'/v1/stats/' + req.params.username,
    headers: {
      'x-access-token': config.token
    }
  };

  request.get(options, function(error, response, body) {
    if(!error && response.statusCode < 300) {
      // Convert body to object
      var results = JSON.parse(body);

      // Calculate the K/D ratio
      results.data.overall.kd = results.data.overall.kills / results.data.overall.deaths;

      // Round K/D
      results.data.overall.kd = Number(results.data.overall.kd.toFixed(1));

      // Send just the data
      res.send(results.data);
    } else if(!error && response.statusCode == 404) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  })
});

// Login
router.post('/login', passport.authenticate('local'), function(req, res) {
  // This only gets called if authentication is successful
  res.status(200).json({
    success: true,
    message: 'User authenticated'
  });
});

// Check if user is authorized
router.get('/auth', function(req, res) {
  if(req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } else {
    res.status(200).json({
      success: false
    });
  }
});

// Logout
router.get('/logout', function(req, res) {
  req.logout();
  console.log('Logout route hit');
  res.status(200).json({
    success: true,
    message: 'User logged out.'
  })
})

module.exports = router;
