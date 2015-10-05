'use strict';
var app = angular.module('prepTrack');
app.controller('HomeCtrl', function($scope, $state, newLocationService
	){
	$scope.location = {}
	$scope.createNewLocation = function(location){
		newLocationService.createNewLocation(location).then(function(data){
			console.log(data)
			$state.go('newLocation', {locationId: data._id});
			$scope.location.locationTitle = "";
		});
	};
	$scope.changeLocation = function(){
		$state.go('newLocation')
	}
});														