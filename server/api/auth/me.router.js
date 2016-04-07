'use strict';

var router = require('express').Router();
var User = require('../users/user.model');

router.get('/', function(req, res, next) {
  var _id;
  if (req.session.passport) _id = req.session.passport.user;
  else _id = req.session.userId;
  User.findById(_id)
  .then(function(result) {
    res.send(result);
  });
});

module.exports = router;
