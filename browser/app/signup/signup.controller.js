app.controller('SignupCtrl', function($scope, $state, AuthFactory) {
	$scope.submitSignup = function() {
		return AuthFactory.signup($scope.user)
		.then($state.go('stories'));
	};
});