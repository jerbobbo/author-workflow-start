app.controller('LoginCtrl', function($scope, $state, AuthFactory) {
	$scope.submitLogin = function() {
		return AuthFactory.login($scope.user)
		.then(function(response) {
			//console.log('response from login: ', response);
			if(response.status === 200)
				$state.go('stories');
		});
	};
});
