'use strict';
var app = angular.module('prepTrack');
app.controller('NewLocationCtrl', function($scope, $state, newLocation, newObjectService, newLocationService, user
	){
	$scope.locationTitle = newLocation.locationTitle
	$scope.objects = newLocation.objects;
	$scope.createNewItem = function(item){
		newObjectService.createNewItem(item).then(function(data){
			newObjectService.addItemToLocation(data.data, newLocation._id);
			newLocationService.getLocation(newLocation._id).then(function(res){
				$scope.objects = res.objects;
			})
		})
	};
	$scope.toDash = function(){
		$state.go('dash', {userId: user._id});
	};

	$scope.deleteObject = function(objectId){
		console.log("ran")
		newObjectService.removeItemFromLocation(objectId, newLocation._id)
	}

	// $scope.deleteLocation = function(location_id){
	// 	newLocationService.deleteLocation(user._id, location_id).then(function(res){
	// 		console.log(res);
	// 	})
	// };

	
});