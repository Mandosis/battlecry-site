var router = require('express').Router();
var request = require('request');
var passport = require('passport');
var multer = require('multer');
var config = require('../../modules/config');
var upload = multer({ dest: '../public/uploads' });

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

/*******************************************************************************
                            Get Global Stats
*******************************************************************************/
router.get('/community/stats', function(req, res) {
  // Set options for api request
  var options = {
    url: 'http://' + config.api + '/v1/players',

    // Set a header for the api auth token
    headers: {
      'x-access-token': config.token
    }
  }

  // Get all players from the api
  request.get(options, function(error, response, body) {
    // Convert the body to an object
    body = JSON.parse(body);

    // Get list of players from the body
    var players = body.data;

    // Create object to hold stats
    var stats = {
      players: body.data.length,
      kills: 0,
      deaths: 0,
      won: 0,
      lost: 0,
      captures: 0,
      gamesPlayed: 0
    };

    // Add up the stats from all players
    for(var it = 0; it < players.length; it++) {
      stats.kills += players[it].stats.overall.kills;
      stats.deaths += players[it].stats.overall.deaths;
      stats.won += players[it].stats.overall.won;
      stats.lost += players[it].stats.overall.lost;
      stats.captures += players[it].stats.conquest.captures;
      stats.gamesPlayed += players[it].stats.overall.gamesPlayed;
    }

    res.status(200).json({
      success: true,
      message: 'Stats calculated.',
      data: stats
    });
  });
});

/*******************************************************************************
                                  Get Stats
*******************************************************************************/
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
      results.data.conquest.kd = results.data.conquest.kills / results.data.overall.deaths;
      results.data.teamDeathMatch.kd = results.data.teamDeathMatch.kills / results.data.teamDeathMatch.deaths;
      results.data.freeForAll.kd = results.data.freeForAll.kills / results.data.freeForAll.deaths;

      // Round K/D
      results.data.overall.kd = Number(results.data.overall.kd.toFixed(1));
      results.data.conquest.kd = Number(results.data.conquest.kd.toFixed(1));
      results.data.teamDeathMatch.kd = Number(results.data.teamDeathMatch.kd.toFixed(1));
      results.data.freeForAll.kd = Number(results.data.freeForAll.kd.toFixed(1));

      // Send just the data
      res.send(results.data);
    } else if(!error && response.statusCode == 404) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  })
});

/*******************************************************************************
                                Edit Profile
*******************************************************************************/
router.post('/profile', upload.single('avatar'), function(req, res) {
  if (req.isAuthenticated()) {

    // Need to check what forms have been changed. set form key manually
    // if username is changed
    //  options.form = { username: req.body.username, etc... }

    // Set options for post
    var options = {
      url: 'http://' + config.api + '/v1/players/' + req.user.username,
      headers: {
        'x-access-token': config.token
      },
      form: {
        id: id,
      }
    };

    request.post()
  }
});

/*******************************************************************************
                                  Sign in
*******************************************************************************/

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
    var user = {
      username: req.user.username,
      picture: req.user.picture,
      joined: req.user.joined
    }
    res.status(200).json({
      success: true,
      user: user
    });
  } else {
    res.status(200).json({
      success: false
    });
  }
});

/*******************************************************************************
                                  Logout
*******************************************************************************/
router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  console.log('Logout route hit');
  console.log(req.user);

  res.status(200).json({
    success: true,
    message: 'User logged out.'
  })
});

/*******************************************************************************
                                  Register
*******************************************************************************/
router.post('/register', function(req, res) {
  console.log(req.body);
  if(req.isAuthenticated()) {
    res.status(401).json({
      success: false,
      message: 'Already signed in!'
    });
  } else {
    console.log('Comparing passwords');
    // Compare passwords
    console.log(req.body.password, req.body.passwordConfirm);
    if (req.body.password == req.body.passwordConfirm) {
      console.log('Passwords the same!');

      // Set options for post request
      var options = {
        url: 'http://' + config.api + '/v1/players/',
        headers: {
          'x-access-token': config.token
        },
        form: {
          username: req.body.username,
          password: req.body.password
        }
      };

      request.post(options, function(error, response, body) {
        console.log(body);

        if(!error && response.statusCode < 300) {
          // Convert body to object
          body = JSON.parse(body);

          res.status(response.statusCode).json(results.data);
        } else if(!error && response.statusCode >= 400 && response.statusCode < 500) {
          res.status(response.statusCode).json(body);
        } else {
          res.status(response.statusCode).json(body);
        }

      });


    } else {
      console.log('Passwords not the same');
      res.status(500).json({
        success: false,
        message: 'Password comparison failed'
      });
    }

  }
});

/*******************************************************************************
                                Edit Password
*******************************************************************************/
router.post('/profile/edit/password', function(req, res) {
  var passwordOld = req.body.passwordOld
  var passwordNew = req.body.passwordNew;
  var passwordConfirm = req.body.passwordConfirm;

});

/*******************************************************************************
                                  Search
*******************************************************************************/
router.get('/community/search/:username', function(req, res) {
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
      res.sendStatus(200);
    } else if(!error && response.statusCode == 404) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = router;
