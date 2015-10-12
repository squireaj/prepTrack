'use strict';
var app = angular.module('prepTrack');
app.controller('NewLocationCtrl', function($scope, $state, newLocation, newObjectService, newLocationService, user
	){
	$scope.locationTitle = newLocation.locationTitle
	$scope.createNewItem = function(item){
		console.log("ran")
		newObjectService.createNewItem(item, newLocation._id).then(function(data){
			console.log(data)
		})
	};
	$scope.toLocation = function(){
		$state.go('dash', {userId: user._id});
	};

	$scope.deleteLocation = function(location_id){
		newLocationService.deleteLocation(user._id, location_id).then(function(res){
			console.log(res);
		})
	}
});