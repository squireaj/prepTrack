(function(){
'use strict';

var app = angular.module('prepTrack', ['ui.router']);
	app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
          url: '/',
          templateUrl : 'app/home/home.html',
          controller  : 'HomeCtrl'
      })
      .state('newLocation',{
        url: '/newLocation/:locationId',
        templateUrl : 'app/newLocation/newLocationView.html',
        controller : 'NewLocationCtrl',
        resolve: {
          newLocation: function(newLocationService, $stateParams){
            return newLocationService.getLocation($stateParams.locationId);
          }
        }
      })
	});
})();

