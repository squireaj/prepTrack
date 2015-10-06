'use strict';
var app = angular.module('prepTrack');
app.controller('NewLocationCtrl', function($scope, $state, newLocation, newObjectService
	){
	$scope.locationTitle = newLocation.locationTitle
	$scope.createNewItem = function(item){
		console.log("ran")
		newObjectService.createNewItem(item).then(function(data){
			console.log(data)
		})
	}
});