var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var request = require('request');

// Homepage
router.get('/home', function(req, res) {
  res.render(path.join(__dirname, '../public/views/partials/home.jade'));
});

// Login
router.get('/login', function(req, res) {
  res.render(path.join(__dirname, '../public/views/partials/login.jade'));
});

// Profile
router.get('/profile/:username', function(req, res) {

  // Object to store user information
  var user =  {
    authorized: false,
  }

  // Check if user is authenticated
  if (req.isAuthenticated()) {
    console.log(req.user);
    var user = req.user;

    // Check permissions of logged in user
    if (req.user.username == req.params.username) {
      user.authorized = true;
    } else if (req.user.developer == true || req.user.admin == true) {
      user.authorized = true;
    }
  }
  res.render(path.join(__dirname, '../public/views/partials/profile.jade'), user);
});

// Community
router.get('/community', function(req, res) {
  res.render(path.join(__dirname, '../public/views/partials/community.jade'))
})

// 404 error page
router.get('/404', function(req, res) {
  res.render(path.join(__dirname, '../public/views/partials/404.jade'));
});

router.get('/*', function(req, res) {
  res.render(path.join(__dirname, '../public/views/partials/404.jade'));
});


module.exports = router;
