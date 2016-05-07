var router = require('express').Router();
var index = require('./index');
var partials = require('./partials');
var api = require('./api');

router.use('/app/view', partials);
router.use('/app/v1', api);

// This must be at the bottom! It contains a catchall!
router.use('/', index);

module.exports = router;
