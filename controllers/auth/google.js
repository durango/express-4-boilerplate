var express         = require('express');
var controller      = express.Router();
var models          = require('../../models');
var config          = require('../../config.json');
var passport        = require('passport');
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;

function googleStrategy() {
  return new GoogleStrategy({
    clientID:     config.google.id,
    clientSecret: config.google.secret,
    callbackURL:  config.google.callbackUrl
  }, buildGoogleProfile);

  function buildGoogleProfile(accessToken, refreshToken, profile, done) {
    models.User.findOrCreate({
      email: profile.emails[0].value
    }).complete(createPassport)

    function createPassport(err, user) {
      if (err) return done(err);

      models.UserPassport.findOrCreate({
        method: 'google',
        token: profile.id
      }).complete(associatePassport);

      function associatePassport(err, passport) {
        if (err) return done(err);
        user.addUserPassport(passport).complete(updateUser);
      }

      function updateUser(err) {
        if (err) return done(err);

        user.updateAttributes({
          first_name: profile.name.givenName,
          last_name: profile.name.familyName
        }).complete(done);
      }
    }
  }
}

// middleware for google strategy
controller.use(function (req, res, next) {
  passport.use(googleStrategy());
  next();
});

controller
  .route('/google')
  .get(passport.authenticate('google', {
    scope: ['email']
  }));

controller
  .route('/google/callback')
  .get(passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/'
  }));

module.exports = controller;
