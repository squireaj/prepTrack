'use strict';
var app = angular.module('prepTrack');
app.service('newObjectService', function($http, $state){

	this.createNewItem = function(item){
		return $http({
			method: 'POST',
			url: "http://localhost:9000/api/objects",
			data: item
		}).then(function(res){
			return res
		}, function(err){
			console.log(err)
		})
	}

	this.addItemToLocation = function(data, locationId){
		console.log(data)
		return $http({
			method: 'POST',
			url:"http://localhost:9000/api/locations/" + locationId,
			data: data
		}).then(function(response){
			return response
		}, function(err){
			console.log(err)
		})
	}
});