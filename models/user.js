var thinky = require('../modules/thinky');
var type = thinky.type;

var User = thinky.createModel("User", {
  username: type.string(),
  password: type.string()
});

module.exports = User;
