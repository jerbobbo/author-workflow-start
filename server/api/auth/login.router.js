'use strict';

var router = require('express').Router();
var User = require('../users/user.model');

//var HttpError = require('../../utils/HttpError');

// router.get('/', function(req, res, next) {
// 	res.send('You got to the login route');
// });


router.post('/', function(req, res, next) {

    User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .then(function (user) {
        if (!user) {
            //res.status(401).send('Unauthorized user');
            res.status(401).send('/error.html');
        } else {
            req.session.userId = user._id;
            res.status(200).send(user);
        }
    })
    .then(null, next);

});

module.exports = router;
