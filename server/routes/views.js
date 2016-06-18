'use strict';

var router = require('express').Router();
var path = require('path');
var fs = require('fs');

// Partials
router.get('/:view/partial/:partial', (req, res) => {
  // Set path to the partial file
  let partial = path.join(__dirname, '../../src/' + req.params.view + '/views/partials/' + req.params.partial + '.pug');

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
  res.render(path.join(__dirname, '../../src/admin/views/app.pug'));
});

/*************************       KEEP AT BOTTOM       *************************/

// Admin catchall for client side routing
router.get('/admin/*', (req, res) => {
  res.render(path.join(__dirname, '../../src/admin/views/app.pug'));
});


// App catchall for client side routing
router.get('/*', (req, res) => {
  res.render(path.join(__dirname, '../../src/client/views/app.pug'));
});

module.exports = router;
