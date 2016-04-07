app.factory('AuthFactory', function($http) {
	var auth = {};
	var _currentUser;

	$http.get('/auth/me')
	.then(function(result) {
		_currentUser = result.data;
	});

	auth.login = function(user) {
		return $http.post('/login', user)
		.then(function(result) {
			_currentUser = result.data;
			return result;
		});
	};

	auth.signup = function(user) {
		return $http.post('/api/users', user)
		.then(function(user) {
			return auth.login(user.data);
		});
	};

	auth.logout = function() {
		_currentUser = null;
		return $http.put('/logout');
	};

	auth.getCurrentUser = function() {
		return _currentUser;
	};

	return auth;
});
