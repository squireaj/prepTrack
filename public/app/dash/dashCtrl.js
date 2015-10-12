'use strict';
var app = angular.module('prepTrack');
app.controller('DashCtrl', function($scope, $state, userLocations, user, newLocationService, dashService
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
	$scope.toLocation = function(location){
		$state.go('newLocation', {locationId: location._id});
	};

	$scope.deleteLocation = function (location_id){
		newLocationService.deleteLocation(user._id, location_id).then(function(res){
			console.log(res.data);
			dashService.getUserLocations(user._id).then(function(res){
				$scope.locations = res
			})
		})
	}
});