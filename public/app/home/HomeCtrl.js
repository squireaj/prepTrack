'use strict';
var app = angular.module('prepTrack');
app.controller('HomeCtrl', function($scope, $state, newLocationService, userService
	){
	$scope.isuser = false;
	$scope.location = {};

	$scope.register = function(name, email, password){
		userService.signUp(name, email, password).then(function(res){
			console.log(res);
			$scope.logIn(email, password)
		})
	}

	$scope.logIn = function(email, password){
		userService.login(email, password).then(function(res){
			$scope.user = res.data;
			$scope.isuser = true
		}, function(err){
			console.log("You were not logged in - " + err)
		})
	};
	$scope.createNewLocation = function(location){
		newLocationService.createNewLocation(location).then(function(data){
			newLocationService.addLocationToUser($scope.user._id, data._id);
			$state.go('newLocation', {locationId: data._id});
			$scope.location.locationTitle = "";
		});
	};

	$scope.changeLocation = function(){
		$state.go('newLocation')
	};

	$scope.toDash = function(){
		$state.go('dash', {userId: $scope.user._id});
	}

});			









