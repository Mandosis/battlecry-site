var router = require('express').Router();
var path = require('path');
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
router.get('/profile', function(req, res) {
  res.render(path.join(__dirname, '../public/views/partials/profile.jade'));
});

// 404 error page
router.get('/404', function(req, res) {
  res.render(path.join(__dirname, '../public/views/partials/404.jade'));
});

router.get('/*', function(req, res) {
  res.render(path.join(__dirname, '../public/views/partials/404.jade'));
});


module.exports = router;
