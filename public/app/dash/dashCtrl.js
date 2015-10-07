'use strict';
var app = angular.module('prepTrack');
app.controller('DashCtrl', function($scope, $state, userLocations
	){
	console.log(userLocations)
	$scope.locations = userLocations[0].locationTitle
});