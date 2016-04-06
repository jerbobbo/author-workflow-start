'use strict';

var router = require('express').Router();
var session = require('express-session');
var passport = require('passport');

router.use(session({
    // this mandatory configuration ensures that session IDs are not predictable
    secret: 'tongiscool', // or whatever you like
    cookie: { maxAge: 60000 }
}));

// place right after the session setup middleware
router.use(function (req, res, next) {
    console.log('session', req.session);
    next();
});

// router.use(function (req, res, next) {
//   if (!req.session.counter) req.session.counter = 0;
//   //console.log('counter', ++req.session.counter);
//   next();
// });

router.use(passport.initialize());
router.use(passport.session());

// Google authentication and login
router.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/', // or wherever
    failureRedirect : '/login' // or wherever
  })
);

// don't forget to install passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
    new GoogleStrategy({
        clientID: "914404375483-ud5cgkos399kqhlaspg4usi54jf1n7rb.apps.googleusercontent.com",
        clientSecret: "QUYE75gD0C3TqsfIwRGabL2U",
        callbackURL: '/auth/google/callback'
    },
    // Google will send back the token and profile
    function (token, refreshToken, profile, done) {
        // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
        console.log('profile from google: ', profile);
    })
);

module.exports = router;
