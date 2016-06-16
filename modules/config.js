var fs = require('fs');

// Read the configuration file
var file = fs.readFileSync('../config.json');

// Parse file contents to JSON
var config = JSON.parse(configFile);

module.exports = config;
