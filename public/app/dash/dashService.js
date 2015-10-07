'use strict';
var app = angular.module('prepTrack');
app.service('dashService', function($http, $state){
	this.getUserLocations = function(userId){
		return $http({
			method: 'GET',
			url: "http://localhost:9000/api/users/" + userId,
		}).then(function(res){
			return res.data.locations
		})
	}
});