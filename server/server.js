var express = require('express');

var app = express();

// Set the directory to serve static assets from
app.use(express.static('server/public'));

// Start the server
var server = app.listen(process.env.PORT || 3000, function() {
  // Get the port number the server is currently running on.
  var port = server.address().port;
  console.log('Listening on port ' + port + '. Press ctrl + c to stop');
});
