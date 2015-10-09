'use strict';
var app = angular.module('prepTrack');
app.controller('DashCtrl', function($scope, $state, userLocations, user, newLocationService
	){
	$scope.locations = userLocations;
	$scope.user = user;
	$scope.createNewLocation = function(location){
		newLocationService.createNewLocation(location).then(function(data){
			newLocationService.addLocationToUser($scope.user._id, data._id);
			$state.go('newLocation', {locationId: data._id});
			$scope.location.locationTitle = "";
		});
	};
});