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
          newLocation: function($route, newLocationService){
            console.log('GETTING IT')
              return newLocationService.getLocation($route.current.params.locationId);
          }
        }
      })
	});
})();

