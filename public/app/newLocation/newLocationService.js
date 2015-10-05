'use strict';
var app = angular.module('prepTrack');
app.service('newLocationService', function($http, $state){

	this.getLocation = function(locationId) {
		console.log(locationId)
		return $http({
			method: 'GET',
			url: "http://localhost:9000/api/getlocation/" + locationId
		}).then(function(response){
			console.log(response)
		})
	};

	this.createNewLocation = function(data){
		return $http({
			method: 'POST',
			url: "http://localhost:9000/api/newlocation",
			data: data
		}).then(function(response){
			return response.data
		});
	};
});