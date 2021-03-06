'use strict';
var app = angular.module('prepTrack');
app.service('newLocationService', function($http, $state){

	this.getLocation = function(locationId) {
		return $http({
			method: 'GET',
			url: "http://localhost:9000/api/getlocation/" + locationId
		}).then(function(response){
			return response.data
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

	this.addLocationToUser = function(userId, locationId){
		console.log(userId, locationId)
		return $http({
			method: 'POST',
			url: "http://localhost:9000/api/users/" + userId + "/locations/" + locationId
		})
	};

	this.deleteLocation = function(userId, locationId){
		console.log(userId, locationId)
		return $http({
			method: 'DELETE',
			url: "http://localhost:9000/api/deletelocation/" + userId + "/location/" + locationId
		})
	};
});












