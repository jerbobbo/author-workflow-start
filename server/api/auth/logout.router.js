'use strict';

var router = require('express').Router();

//var HttpError = require('../../utils/HttpError');

// router.get('/', function(req, res, next) {
// 	res.send('You got to the login route');
// });

router.put('/', function(req, res, next) {

    req.session.destroy(function(err) {
        res.send(err);
    });

    res.sendStatus(401);

});

module.exports = router;
