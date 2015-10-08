'use strict';
var app = angular.module('prepTrack');
app.controller('DashCtrl', function($scope, $state, userLocations, user
	){
	console.log(userLocations)
	$scope.locations = userLocations;
	$scope.user = user;
});