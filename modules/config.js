var fs = require('fs');
var path = require('path');

// Read the configuration file
var file = fs.readFileSync(path.join(__dirname, '../config.json'));

// Parse file contents to JSON
var config = JSON.parse(file);

module.exports = config;
