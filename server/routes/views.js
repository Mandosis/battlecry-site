var router = require('express').Router();
var path = require('path');
var fs = require('fs');

// App
router.get('/', function(req, res) {
  res.render(path.join(__dirname, '../../views/app.jade'));
});

// Admin
router.get('/admin', function(req, res) {
  res.render(path.join(__dirname, '../../views/admin.jade'));
});


// Partials
router.get('/:view/partial/:partial', function(req, res) {
  // Set path to the partial file
  var partial = path.join(__dirname, '../../views/' + req.params.view + '/partials/' + req.params.partial + '.pug');

  // Check if the file exists
  fs.access(partial, fs.R_OK, function(err) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.render(partial);
    }
  });
});

// Catch-all for client side routing. Keep at the bottom of the file.
router.get('/*', function(req, res) {
  res.render(path.join(__dirname, '../../views/app.jade'));
});

module.exports = router;
