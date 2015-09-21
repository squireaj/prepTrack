(function(){
'use strict';

var app = angular.module('prepTrack', ['ui.router']);
	app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
          url: '/',
          templateUrl : 'app/main/mainView.html',
          controller  : 'MainCtrl'
      });
	});
})();

