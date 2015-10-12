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
          },
          user: function(userService){
            return userService.getUser().then(function(res){
              return res
             })
          }
        }
      })
      .state('dash', {
        url: '/dash/:userId',
        templateUrl: 'app/dash/dash.html',
        controller: 'DashCtrl',
        resolve: {
          userLocations: function(dashService, $stateParams){
            return dashService.getUserLocations($stateParams.userId);
          },
          user: function(userService){
            return userService.getUser().then(function(res){
              return res
             })
          }
        }
      })
	});
})();

