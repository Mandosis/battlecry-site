var router = require('express').Router();
var jade = require('jade');
var path = require('path');

// Serve the app
router.get('/', function(req, res) {
  res.render(path.join(__dirname, '../public/views/app.jade'));
});

// Catch all to serve app
router.get('/*', function(req, res) {
  res.render(path.join(__dirname, '../public/views/app.jade'));
});

module.exports = router;
