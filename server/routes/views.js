'use strict';

var router = require('express').Router();
var path = require('path');
var fs = require('fs');

// Partials
router.get('/:view/partial/:partial', (req, res) => {
  // Set path to the partial file
  let partial = path.join(__dirname, '../../views/' + req.params.view + '/partials/' + req.params.partial + '.pug');

  // Check if the file exists
  fs.access(partial, fs.R_OK, function(err) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.render(partial);
    }
  });
});

// Admin Page
router.get('/admin', (req, res) => {
  res.render(path.join(__dirname, '../../views/admin/app.pug'));
});

/*************************       KEEP AT BOTTOM       *************************/

// Admin catchall for client side routing
router.get('/admin/*', (req, res) => {
  res.render(path.join(__dirname, '../../views/admin/app.pug'));
});


// App catchall for client side routing
router.get('/*', (req, res) => {
  res.render(path.join(__dirname, '../../views/app/app.pug'));
});

module.exports = router;
