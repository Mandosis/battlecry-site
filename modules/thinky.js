var config = require('./config');

// Configure thinky
var thinky = require('thinky')({
  host: config.database.host,
  port: config.database.port,
  db: config.database.db
});

module.exports = thinky;
