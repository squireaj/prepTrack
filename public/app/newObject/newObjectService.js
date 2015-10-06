'use strict';
var app = angular.module('prepTrack');
app.service('newObjectService', function($http, $state){
	this.createNewItem = function(data){
		console.log(data)
		return $http({
			method: 'POST',
			url:"http://localhost:9000/api/newlocation",
			data: data
		}).then(function(response){
			return response
		})
	}
});