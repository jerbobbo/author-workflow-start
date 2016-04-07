'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, AuthFactory) {
	$scope.story = story;
	$scope.users = users;
	$scope.$watch('story', function () {
		$scope.story.save();
	}, true);
	$scope.userHasRights = function() {
		var currentUser = AuthFactory.getCurrentUser();
		if (!currentUser) return false;
		return (currentUser === story.author || currentUser.isAdmin);
	};

});
