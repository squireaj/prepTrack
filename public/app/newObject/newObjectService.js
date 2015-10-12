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

	this.removeItemFromLocation = function(objectId, locationId){
		console.log("also Ran")
		console.log(objectId, locationId)
		return $http({
			method: 'DELETE',
			url: "http://localhost:9000/api/deleteobject/" + objectId + "/" + locationId
		}).then(function(res){
			return res
		}, function(err){
			console.log("could not remove" + err)
		})
	}
});














