var path        = require('path');
var express     = require('express');
var controller  = express.Router();
var passport    = require('passport');
var utils       = require('../utils');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// load our strategies
utils.bootstrap(path.join(__dirname, 'auth')).forEach(function (file) {
  var ctrl = require(path.join(__dirname, 'auth', file));
  controller.stack = controller.stack.concat(ctrl.stack);
});

module.exports = ['/auth', controller];
