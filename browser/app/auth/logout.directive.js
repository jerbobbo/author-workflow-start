app.directive('logout', function() {
	return {
		restrict: 'A',
		controller: function($scope, AuthFactory, $state) {
			$scope.logout = function(){
				return AuthFactory.logout()
				.then($state.go('login'));
			};
			$scope.userLoggedIn = function() {
				return (AuthFactory.getCurrentUser());
			};
		}
	};
});
