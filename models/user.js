'use strict';

var bcrypt = require('bcrypt');
var thinky = require('../modules/thinky');

var SALT_WORK_FACTOR = 10;
var type = thinky.type;


var User = thinky.createModel("User", {
  username: type.string(),
  password: type.string()
});

// Encrypt password on save
User.pre('save', (next) => {
  let user = this;

  if (user.isModified('password')) {
    return next();
  }

  // Create salt for hash
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(player.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      // Replace clear text with hashed password
      player.password = hash;

      next();
    });
  });
});

module.exports = User;
