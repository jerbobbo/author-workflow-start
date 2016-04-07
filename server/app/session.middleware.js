'use strict';

var router = require('express').Router();
var session = require('express-session');
var passport = require('passport');
var User = require('../api/users/user.model');


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
        User.findOne({ 'google.id' : profile.id }, function (err, user) {
            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err) return done(err);
            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, pass along that user
            } else {
                // if there is no user found with that google id, create them
                var newUser = new User();
                // set all of the Google information in our user model
                newUser.google.id = profile.id; // set the users google id
                newUser.google.token = token; // we will save the token that google provides to the user
                newUser.google.name = profile.displayName; // look at the passport user profile to see how names are returned
                newUser.google.email = profile.emails[0].value; // Google can return multiple emails so we'll take the first
                // don't forget to include the user's email, name, and photo
                newUser.email = newUser.google.email; // required field
                newUser.name = newUser.google.name; // nice to have
                newUser.photo = profile.photos[0].value; // nice to have
                // save our user to the database
                newUser.save(function (err) {
                    if (err) done(err);
                    // if successful, pass along the new user
                    else done(null, newUser);
                });
            }
        });

    })
);

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    console.log('id in deserializeUser function: ', id);
    User.findById(id, done);
});

module.exports = router;
