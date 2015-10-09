'use strict';
var app = angular.module('prepTrack');
app.service('userService', function($http, $state){
	this.getUser = function(){
		return $http({
			method: 'GET',
			url: "http://localhost:9000/api/getUser"
		}).then(function(res){
			return res
		})
	};
	this.signUp = function(name, email, password){
		console.log(name, email, password)
		return $http({
			method: 'POST',
			url: "http://localhost:9000/api/users",
			data: {
				name: name,
				email: email,
				password: password
			}
		}).then(function(res){
			return res
		}, function(err){
			console.log("signUp error" + err)
		})
	};
	this.login = function(email, password){
		return $http({
			method: 'POST',
			url: "http://localhost:9000/api/users/auth",
			data: {
				email: email,
				password: password
			} 
		}).then(function(res){
			return res
		}, function(err){
			console.log("login Error" + err)
		})
	};
	this.logOut = function(){
		return $http({
			method: 'POST',
			url: "http://localhost:9000/api/auth/logout",
		}).then(function(res){
			return res.data
		}, function(err){
			console.log("logOut Error" + err)
		})
	};
	this.newLocation = function(newLocation){
		return $http({
			method: 'POST',
			url: "http://localhost:9000/api/users/me/locations",
			data: {
				locationTitle: newLocation.locationTitle, 
				userId: this.userId
			}
		}).then(function(res){
			return res.data
		}, function(err){
			console.log("Cannot add location" + err)
		})
	}
});







