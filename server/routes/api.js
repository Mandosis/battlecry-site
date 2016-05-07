var router = require('express').Router();
var request = require('request');
var config = require('../../modules/config');

router.get('/players/:username', function(req, res) {
  var username = req.params.username;
  console.log(config.token);

  var options = {
    url: 'http://' + config.api +'/v1/players/' + req.params.username,
    headers: {
      'x-access-token': config.token
    }
  };

  request.get(options, function(error, response, body) {
    if(!error && response.statusCode < 300) {
      res.send(body);
    } else if(!error && response.statusCode == 404) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  })
})

module.exports = router;
