var router = require('express').Router();
var User = require('../users/user.model');

router.get('/', function(req, res, next) {
  var _user;
  User.findById(req.body.id)
  .then(function(result) {
    if (!result) {
      return User.create({
        email: req.body.email,
        google: req.body.google,
        _id: req.body.id
      })
      .then(function(user) {
        _user = user;
      });
    }
    else _user = result;
    req.session.userId = _user._id;
    req.status(200).send(_user);
  });
});


module.exports = router;
