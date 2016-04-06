'use strict';

var router = require('express').Router();
var User = require('../users/user.model');

//var HttpError = require('../../utils/HttpError');

// router.get('/', function(req, res, next) {
// 	res.send('You got to the login route');
// });

router.post('/', function(req, res, next) {
	User.findOne({ email: req.body.email, password: req.body.password })
	.then(function(user) {
		if (!user) res.sendStatus(401);
		else {
			req.session.userId = user._id;
			res.sendStatus(200);
		}
		then(null, next);
	});

});

module.exports = router;
