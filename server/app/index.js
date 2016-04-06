'use strict';

var app = require('express')();
var path = require('path');

app.use(require('./session.middleware'));

app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.use('/login', require('../api/auth/login.router'));
app.use('/logout', require('../api/auth/logout.router'));
app.use('/auth/me', require('../api/auth/me.router'));

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));



module.exports = app;
