'use strict';

var router = require('express').Router();
var User = require('../users/user.model');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId)
  .then(function(result) {
    res.send(result);
  });
});

module.exports = router;
